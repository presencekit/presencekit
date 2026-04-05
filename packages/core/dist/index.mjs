// src/platforms.ts
var TRANSPARENT_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
var PLATFORMS = {
  medium: {
    label: "Medium",
    baseUrl: "medium.com",
    icon: "medium",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Medium</title><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  github: {
    label: "GitHub",
    baseUrl: "github.com",
    icon: "github",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    png: TRANSPARENT_PNG
  },
  linkedin: {
    label: "LinkedIn",
    baseUrl: "linkedin.com",
    icon: "linkedin",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  twitter: {
    label: "Twitter",
    baseUrl: "x.com",
    icon: "twitter",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  quora: {
    label: "Quora",
    baseUrl: "quora.com",
    icon: "quora",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Quora</title><path d="M12.174 0C5.452 0 0 5.281 0 11.997 0 18.72 5.452 24 12.174 24c6.715 0 11.826-5.28 11.826-12.003C24 5.281 18.889 0 12.174 0zm4.857 19.72a7.44 7.44 0 01-2.034-1.765c-.678.147-1.38.22-2.098.22-3.958 0-7.134-2.867-7.134-7.175 0-4.302 3.176-7.176 7.134-7.176 3.965 0 7.134 2.874 7.134 7.176 0 2.195-.835 4.118-2.188 5.452.275.38.604.713.975.985h-.002c.348.258.94.458 1.535.458v1.408c-1.43 0-2.572-.26-3.322-.583zm-2.12-3.56l-.574-.89c.44-.572.708-1.302.708-2.1a3.15 3.15 0 00-3.146-3.152 3.152 3.152 0 00-3.15 3.152 3.151 3.151 0 003.15 3.148c.322 0 .63-.048.924-.133l.88 1.356c.48-.305.892-.686 1.208-1.38z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  devto: {
    label: "Dev.to",
    baseUrl: "dev.to",
    icon: "devto",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>dev.to</title><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  youtube: {
    label: "YouTube",
    baseUrl: "youtube.com",
    icon: "youtube",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    png: TRANSPARENT_PNG
  },
  producthunt: {
    label: "Product Hunt",
    baseUrl: "producthunt.com",
    icon: "producthunt",
    svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Product Hunt</title><path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.8-.805 1.8-1.8s-.805-1.8-1.8-1.8zM12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm1.604 14.4h-3.405V18H7.8V6h5.804c2.319 0 4.2 1.881 4.2 4.2s-1.881 4.2-4.2 4.2z"/></svg>`,
    png: TRANSPARENT_PNG
  }
};

// src/filter.ts
function applyFilter(links, opts) {
  if (!opts) return links;
  if (opts.show && opts.show.length > 0) {
    const showSet = new Set(opts.show);
    return links.filter(
      (link) => showSet.has(link.platform) || showSet.has(link.id)
    );
  }
  if (opts.exclude && opts.exclude.length > 0) {
    const excludeSet = new Set(opts.exclude);
    return links.filter(
      (link) => !excludeSet.has(link.platform) && !excludeSet.has(link.id)
    );
  }
  return links;
}

// src/presence.ts
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-");
}
function normalise(platform, config) {
  const meta = PLATFORMS[platform];
  const defaultLabel = meta?.label ?? platform;
  const entries = typeof config === "string" ? [{ url: config }] : Array.isArray(config) ? config : [config];
  const isMulti = entries.length > 1;
  return entries.map((entry, index) => {
    const label = entry.label ?? (isMulti ? `${defaultLabel} ${index + 1}` : defaultLabel);
    const id = entry.id ?? `${platform}-${slugify(label)}`;
    return {
      id,
      platform,
      label,
      url: entry.url,
      icon: meta ? { svg: meta.svg, png: meta.png } : { svg: "", png: "" }
    };
  });
}
function createPresence(config) {
  const allLinks = Object.entries(config).flatMap(
    ([platform, platformConfig]) => normalise(platform, platformConfig)
  );
  return {
    getLinks(opts) {
      return applyFilter(allLinks, opts);
    }
  };
}
export {
  PLATFORMS,
  applyFilter,
  createPresence,
  normalise
};
//# sourceMappingURL=index.mjs.map