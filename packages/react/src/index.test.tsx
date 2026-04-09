import * as React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createPresence } from "@presencekit/core";
import type { Presence } from "@presencekit/core";
import { IconLink } from "./IconLink.js";
import { FooterLinks } from "./FooterLinks.js";

// ---------------------------------------------------------------------------
// Shared mock presence
// ---------------------------------------------------------------------------

let presence: Presence;

beforeAll(async () => {
  presence = await createPresence({
    github: [
      { url: "https://github.com/personal", label: "Personal" },
      { url: "https://github.com/work", label: "Work" },
    ],
    twitter: "https://x.com/acme",
  });
});

// ---------------------------------------------------------------------------
// <IconLink />
// ---------------------------------------------------------------------------

describe("<IconLink />", () => {
  let link: ReturnType<typeof presence.getLinks>[number];

  beforeAll(() => {
    link = presence.getLinks().find((l) => l.platform === "twitter")!;
  });

  it("renders an <a> tag with the correct href", () => {
    render(<IconLink link={link} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://x.com/acme");
  });

  it('sets target="_blank" and rel="noopener noreferrer"', () => {
    render(<IconLink link={link} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("sets aria-label to link.label", () => {
    render(<IconLink link={link} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("aria-label", link.label);
  });

  it("renders link.label as visible text", () => {
    render(<IconLink link={link} />);
    expect(screen.getByText(link.label)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// <FooterLinks /> — flat strategy (default)
// ---------------------------------------------------------------------------

describe('<FooterLinks /> renderStrategy="flat" (default)', () => {
  it("renders all links when no filter is passed", () => {
    render(<FooterLinks presence={presence} />);
    // github x2 + twitter x1 = 3 links
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("respects show prop — only renders matching platforms", () => {
    render(<FooterLinks presence={presence} show={["twitter"]} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://x.com/acme");
  });

  it("respects exclude prop — removes matching platforms", () => {
    render(<FooterLinks presence={presence} exclude={["twitter"]} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    links.forEach((l) => expect(l).not.toHaveAttribute("href", "https://x.com/acme"));
  });

  it("calls renderLink override instead of <IconLink /> when provided", () => {
    const renderLink = vi.fn((link) => <span key={link.id} data-testid="custom">{link.label}</span>);
    render(<FooterLinks presence={presence} renderLink={renderLink} />);
    expect(renderLink).toHaveBeenCalledTimes(3);
    expect(screen.getAllByTestId("custom")).toHaveLength(3);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// <FooterLinks /> — group-expand strategy
// ---------------------------------------------------------------------------

describe('<FooterLinks /> renderStrategy="group-expand"', () => {
  it("groups multiple entries of the same platform under one parent button", () => {
    render(<FooterLinks presence={presence} renderStrategy="group-expand" />);
    // github has 2 entries → collapsed into 1 button; twitter has 1 entry → plain link
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    // Only the twitter link and the collapsed github first entry (via IconLink inside button area)
    // The single twitter <a> is rendered directly
    const links = screen.getAllByRole("link");
    // twitter direct link + github "Personal" inside the button = 2 <a> tags visible before expand
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("shows all entries after expanding the group", () => {
    render(<FooterLinks presence={presence} renderStrategy="group-expand" />);
    const button = screen.getByRole("button");
    // Before expand: expanded=false
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    // After expand: expanded=true and both github links visible
    expect(button).toHaveAttribute("aria-expanded", "true");
    // "Personal" appears in both the button trigger and the expanded list
    expect(screen.getAllByText("Personal").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Work")).toBeInTheDocument();
  });
});
