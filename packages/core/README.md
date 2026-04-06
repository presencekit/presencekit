# @presencekit/core

> Framework-agnostic library for managing and resolving social/developer presence links.

[![npm](https://img.shields.io/npm/v/@presencekit/core)](https://www.npmjs.com/package/@presencekit/core)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Install

```bash
npm install @presencekit/core
# or
pnpm add @presencekit/core
# or
yarn add @presencekit/core
```

---

## Quick Start

```ts
import { createPresence } from "@presencekit/core";

const presence = createPresence({
  github: "https://github.com/acme",
  twitter: "https://x.com/acme",
  linkedin: { url: "https://linkedin.com/in/acme", label: "Connect" },
});

const links = presence.getLinks();
// → ResolvedLink[]
```

---

## API

### `createPresence(config)`

Creates a presence instance from a map of platform keys to link configurations.

```ts
import { createPresence } from "@presencekit/core";

const presence = createPresence({
  github: "https://github.com/acme",           // plain URL string
  twitter: { url: "https://x.com/acme" },      // LinkEntry object
  linkedin: {                                   // LinkEntry with explicit label
    url: "https://linkedin.com/in/acme",
    label: "Connect on LinkedIn",
  },
});
```

**Returns** `{ getLinks(opts?: FilterOpts): ResolvedLink[] }`

---

### `presence.getLinks(opts?)`

Returns the fully resolved links as a `ResolvedLink[]` array.

```ts
// All links
const all = presence.getLinks();

// Only github and linkedin
const filtered = presence.getLinks({ show: ["github", "linkedin"] });

// Everything except twitter
const withoutTwitter = presence.getLinks({ exclude: ["twitter"] });
```

When both `show` and `exclude` are provided, `show` takes priority.

---

### Multiple entries per platform

Pass an array of `LinkEntry` objects to register more than one link for a platform.

```ts
const presence = createPresence({
  github: [
    { url: "https://github.com/acme",     label: "Company" },
    { url: "https://github.com/acme-dev", label: "Open Source" },
  ],
  youtube: "https://youtube.com/@acme",
});

// Filter by auto-generated entry ID
const company = presence.getLinks({ show: ["github-company"] });
```

When labels are not provided on multi-entry arrays, they are auto-generated as `"Platform 1"`, `"Platform 2"`, etc.

---

### Entry IDs

Each resolved link has a unique `id` computed as `"{platform}-{slugified-label}"`, for example:

| Config | `id` |
|--------|------|
| `github: "https://github.com/acme"` | `"github-github"` |
| `github: { url: "...", label: "Personal" }` | `"github-personal"` |
| `github: [{ url: "...", label: "Work" }]` | `"github-work"` |

You can also supply an explicit `id` in a `LinkEntry`:

```ts
const presence = createPresence({
  github: { url: "https://github.com/acme", id: "my-github" },
});

presence.getLinks({ show: ["my-github"] });
```

---

## Types

### `PresenceConfig`

```ts
type PresenceConfig = {
  [platform: string]: string | LinkEntry | LinkEntry[];
};
```

### `LinkEntry`

```ts
type LinkEntry = {
  url: string;
  label?: string; // defaults to the platform label
  id?: string;    // auto-generated when omitted
};
```

### `FilterOpts`

```ts
type FilterOpts = {
  show?: string[];    // allowlist of platform keys or entry IDs
  exclude?: string[]; // denylist of platform keys or entry IDs
};
```

### `ResolvedLink`

```ts
type ResolvedLink = {
  id: string;       // e.g. "github-personal"
  platform: string; // e.g. "github"
  label: string;    // e.g. "Personal"
  url: string;      // e.g. "https://github.com/acme"
  icon: {
    svg: string;    // inline SVG string; empty for unknown platforms
    png: string;    // base64 PNG data URI; empty for unknown platforms
  };
};
```

---

## Supported Platforms

The following platforms are built in and receive automatic icon enrichment:

| Key | Label | Base URL |
|-----|-------|----------|
| `github` | GitHub | github.com |
| `twitter` | Twitter | x.com |
| `linkedin` | LinkedIn | linkedin.com |
| `youtube` | YouTube | youtube.com |
| `medium` | Medium | medium.com |
| `devto` | Dev.to | dev.to |
| `producthunt` | Product Hunt | producthunt.com |
| `quora` | Quora | quora.com |

SVG icons are sourced from [Simple Icons](https://simpleicons.org) (MIT license).

---

## Custom Platforms

Any platform key not in the built-in registry is accepted. Its links are passed through without icon enrichment — `icon.svg` and `icon.png` will be empty strings.

```ts
const presence = createPresence({
  mysite: "https://example.com",
});

const links = presence.getLinks();
// links[0].platform === "mysite"
// links[0].icon.svg === ""
```

---

## Low-level helpers

These utilities are exported for advanced use cases:

```ts
import { normalise, applyFilter, PLATFORMS } from "@presencekit/core";

// Resolve a single platform config to ResolvedLink[]
const links = normalise("github", "https://github.com/acme");

// Filter an existing ResolvedLink array
const visible = applyFilter(links, { show: ["github"] });

// Access the built-in platform registry
console.log(PLATFORMS.github.label); // "GitHub"
```

---

## License

MIT © presencekit contributors
