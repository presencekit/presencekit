import { describe, it, expect } from "vitest";
import { normalise, createPresence, applyFilter } from "./index.js";

// ---------------------------------------------------------------------------
// normalise()
// ---------------------------------------------------------------------------

describe("normalise()", () => {
  it("string input produces correct ResolvedLink", () => {
    const links = normalise("github", "https://github.com/acme");
    expect(links).toHaveLength(1);
    const [link] = links;
    expect(link!.url).toBe("https://github.com/acme");
    expect(link!.platform).toBe("github");
    expect(link!.label).toBe("GitHub");
    expect(link!.id).toBe("github-github");
    expect(link!.icon.svg).toContain("<svg");
  });

  it("single LinkEntry input", () => {
    const links = normalise("linkedin", { url: "https://linkedin.com/in/acme", label: "Work" });
    expect(links).toHaveLength(1);
    const [link] = links;
    expect(link!.url).toBe("https://linkedin.com/in/acme");
    expect(link!.label).toBe("Work");
    expect(link!.id).toBe("linkedin-work");
  });

  it("LinkEntry[] with labels produces correct IDs", () => {
    const links = normalise("github", [
      { url: "https://github.com/personal", label: "Personal" },
      { url: "https://github.com/work", label: "Work" },
    ]);
    expect(links).toHaveLength(2);
    expect(links[0]!.id).toBe("github-personal");
    expect(links[1]!.id).toBe("github-work");
  });

  it("auto-label generation when label is missing on multi-entry", () => {
    const links = normalise("twitter", [
      { url: "https://x.com/a" },
      { url: "https://x.com/b" },
    ]);
    expect(links[0]!.label).toBe("Twitter 1");
    expect(links[1]!.label).toBe("Twitter 2");
    expect(links[0]!.id).toBe("twitter-twitter-1");
    expect(links[1]!.id).toBe("twitter-twitter-2");
  });

  it("explicit id on LinkEntry is preserved", () => {
    const links = normalise("github", { url: "https://github.com/acme", id: "my-github" });
    expect(links[0]!.id).toBe("my-github");
  });

  it("unknown platform passes through with no icon", () => {
    const links = normalise("mysite", "https://mysite.example.com");
    expect(links[0]!.platform).toBe("mysite");
    expect(links[0]!.icon.svg).toBe("");
    expect(links[0]!.label).toBe("mysite");
  });
});

// ---------------------------------------------------------------------------
// createPresence()
// ---------------------------------------------------------------------------

describe("createPresence()", () => {
  it("returns getLinks() function", () => {
    const p = createPresence({ github: "https://github.com/acme" });
    expect(typeof p.getLinks).toBe("function");
    const links = p.getLinks();
    expect(links).toHaveLength(1);
    expect(links[0]!.platform).toBe("github");
  });

  it("handles multiple platforms", () => {
    const p = createPresence({
      github: "https://github.com/acme",
      twitter: "https://x.com/acme",
    });
    expect(p.getLinks()).toHaveLength(2);
  });

  it("unknown platform key passes through as custom", () => {
    const p = createPresence({ mysite: "https://mysite.example.com" });
    const links = p.getLinks();
    expect(links).toHaveLength(1);
    expect(links[0]!.platform).toBe("mysite");
    expect(links[0]!.icon.svg).toBe("");
  });
});

// ---------------------------------------------------------------------------
// applyFilter()
// ---------------------------------------------------------------------------

describe("applyFilter()", () => {
  const links = [
    { id: "github-github", platform: "github", label: "GitHub", url: "https://github.com/a", icon: { svg: "", png: "" } },
    { id: "twitter-twitter", platform: "twitter", label: "Twitter", url: "https://x.com/a", icon: { svg: "", png: "" } },
    { id: "linkedin-personal", platform: "linkedin", label: "Personal", url: "https://linkedin.com/a", icon: { svg: "", png: "" } },
    { id: "linkedin-work", platform: "linkedin", label: "Work", url: "https://linkedin.com/b", icon: { svg: "", png: "" } },
  ];

  it("empty opts returns all links", () => {
    expect(applyFilter(links)).toHaveLength(4);
    expect(applyFilter(links, {})).toHaveLength(4);
  });

  it("show filter returns only matching platforms", () => {
    const result = applyFilter(links, { show: ["github"] });
    expect(result).toHaveLength(1);
    expect(result[0]!.platform).toBe("github");
  });

  it("show filter works with entry IDs", () => {
    const result = applyFilter(links, { show: ["linkedin-work"] });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("linkedin-work");
  });

  it("show filter matches both platform and ID in same array", () => {
    const result = applyFilter(links, { show: ["github", "linkedin-work"] });
    expect(result).toHaveLength(2);
  });

  it("exclude filter removes matching platforms", () => {
    const result = applyFilter(links, { exclude: ["twitter"] });
    expect(result).toHaveLength(3);
    expect(result.find((l) => l.platform === "twitter")).toBeUndefined();
  });

  it("exclude filter removes by ID", () => {
    const result = applyFilter(links, { exclude: ["linkedin-personal"] });
    expect(result).toHaveLength(3);
    expect(result.find((l) => l.id === "linkedin-personal")).toBeUndefined();
  });

  it("show takes priority over exclude if both passed", () => {
    const result = applyFilter(links, { show: ["github"], exclude: ["github"] });
    expect(result).toHaveLength(1);
    expect(result[0]!.platform).toBe("github");
  });
});
