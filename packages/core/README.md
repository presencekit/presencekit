# @presencekit/core

> Framework-agnostic library for managing and resolving social/developer presence links.
> Bring Your Own Links — host a `links.json` anywhere, point presencekit at it, and every site stays in sync.

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

> **React users** — install `@presencekit/react` only. It re-exports everything from core; no dual install needed.

---

## BYOL — Bring Your Own Links

Host a `links.json` file at any public URL (GitHub Pages, Gist, Vercel, R2, etc.) and point presencekit at it. Update the JSON once and every site picks it up on the next deploy.

```json
{
  "github": "https://github.com/acme",
  "twitter": "https://x.com/acme",
  "linkedin": { "url": "https://linkedin.com/in/acme", "label": "Connect" }
}
```

---

## Quick Start

### Build-time fetch

Fetch and resolve links at build time (recommended for static sites):

```ts
import { fetchLinks } from "@presencekit/core";

// In your build script / getStaticProps / loader
const links = await fetchLinks("https://you.github.io/presence/links.json");
// → ResolvedLink[]
```

### Runtime fetch with `createPresence`

```ts
import { createPresence } from "@presencekit/core";

const presence = createPresence("https://you.github.io/presence/links.json");

// Fetch and resolve — honours Cache-Control on the JSON response
const links = await presence.getLinks();
// → ResolvedLink[]
```

---

## API

### `fetchLinks(url)`

Fetches and validates the `links.json` at `url`, then resolves it into `ResolvedLink[]`.

```ts
import { fetchLinks } from "@presencekit/core";

const links = await fetchLinks("https://you.github.io/presence/links.json");
```

Throws a descriptive error if the JSON does not match the expected schema.

---

### `createPresence(url)`

Creates a presence instance backed by a remote `links.json` URL.

```ts
import { createPresence } from "@presencekit/core";

const presence = createPresence("https://you.github.io/presence/links.json");
```

**Returns** `{ getLinks(opts?: FilterOpts): Promise<ResolvedLink[]> }`

---

### `presence.getLinks(opts?)`

Fetches the remote config (with `Cache-Control` support) and returns the resolved links.

```ts
// All links
const all = await presence.getLinks();

// Only github and linkedin
const filtered = await presence.getLinks({ show: ["github", "linkedin"] });

// Everything except twitter
const withoutTwitter = await presence.getLinks({ exclude: ["twitter"] });
```

When both `show` and `exclude` are provided, `show` takes priority.

---

### Multiple entries per platform

The hosted `links.json` supports arrays for platforms with more than one link:

```json
{
  "github": [
    { "url": "https://github.com/acme",     "label": "Company" },
    { "url": "https://github.com/acme-dev", "label": "Open Source" }
  ],
  "youtube": "https://youtube.com/@acme"
}
```

Filter by the auto-generated entry ID:

```ts
const company = await presence.getLinks({ show: ["github-company"] });
```

When labels are not provided on multi-entry arrays, they are auto-generated as `"Platform 1"`, `"Platform 2"`, etc.

---

### Entry IDs

Each resolved link has a unique `id` computed as `"{platform}-{slugified-label}"`:

| Config | `id` |
|--------|------|
| `"github": "https://github.com/acme"` | `"github-github"` |
| `"github": { "url": "...", "label": "Personal" }` | `"github-personal"` |
| `"github": [{ "url": "...", "label": "Work" }]` | `"github-work"` |

Supply an explicit `id` in the `links.json` entry to use a stable, custom ID:

```json
{ "github": { "url": "https://github.com/acme", "id": "my-github" } }
```

---

## Schema Validation

The fetched JSON is validated against the `PresenceConfig` schema before resolving. An invalid shape throws a clear, actionable error:

```
PresenceConfig validation error: "twitter" value must be a string, LinkEntry, or LinkEntry[]
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
