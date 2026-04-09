# @presencekit/react

> React components for rendering social/developer presence links with icon support.
> Re-exports everything from `@presencekit/core` — one install for React users.

[![npm](https://img.shields.io/npm/v/@presencekit/react)](https://www.npmjs.com/package/@presencekit/react)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Install

```bash
npm install @presencekit/react
# or
pnpm add @presencekit/react
# or
yarn add @presencekit/react
```

**Peer dependencies:** `react >=17` and `react-dom >=17` must already be installed in your project.

> `@presencekit/react` re-exports everything from `@presencekit/core`. You do not need to install core separately.

---

## Quick Start

```tsx
import { createPresence, FooterLinks } from "@presencekit/react";

const presence = createPresence("https://you.github.io/presence/links.json");

export async function Footer() {
  const links = await presence.getLinks();
  return <FooterLinks links={links} />;
}
```

---

## `<FooterLinks />`

The main composite component that renders a `<nav>` containing all (or a filtered subset of) your presence links.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `ResolvedLink[]` | — | **Required.** Array of resolved links from `fetchLinks()` or `presence.getLinks()` |
| `renderStrategy` | `"flat" \| "group-expand" \| "group-popover"` | `"flat"` | Layout strategy (see below) |
| `show` | `string[]` | — | Show only links matching these platform keys or entry IDs |
| `exclude` | `string[]` | — | Hide links matching these platform keys or entry IDs |
| `renderLink` | `(link: ResolvedLink) => ReactNode` | — | Override the default link renderer |
| `className` | `string` | — | CSS class applied to the root `<nav>` element |

---

### Render strategies

#### `"flat"` (default)

Renders all links in a flat horizontal row. Best for footers or nav bars with a small, known set of links.

```tsx
<FooterLinks links={links} renderStrategy="flat" />
```

#### `"group-expand"`

Groups links by platform. Platforms with a single entry render as a plain icon link. Platforms with multiple entries render as a button with a count badge; clicking expands an inline list of all entries.

```tsx
<FooterLinks links={links} renderStrategy="group-expand" />
```

#### `"group-popover"`

Same grouping behaviour as `"group-expand"`, but multi-entry platforms reveal their entries in a floating popover on hover or click. Press `Escape` to dismiss.

```tsx
<FooterLinks links={links} renderStrategy="group-popover" />
```

---

### Filtering links

Use `show` to allowlist specific platforms or entry IDs, and `exclude` to denylist them. When both are supplied, `show` takes priority.

```tsx
// Show only github and twitter
<FooterLinks links={links} show={["github", "twitter"]} />

// Hide the work github entry
<FooterLinks links={links} exclude={["github-work"]} />

// Show only the personal github entry
<FooterLinks links={links} show={["github-personal"]} />
```

---

### Custom link renderer

Supply a `renderLink` function to take full control of how each link is rendered. The function receives a `ResolvedLink` and must return a `ReactNode`.

```tsx
<FooterLinks
  links={links}
  renderLink={(link) => (
    <a
      key={link.id}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-link"
    >
      {link.label}
    </a>
  )}
/>
```

---

## `<IconLink />`

A lower-level component that renders a single `ResolvedLink` as an accessible anchor element with its platform SVG icon.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `link` | `ResolvedLink` | **Required.** A single resolved link |
| `className` | `string` | Optional CSS class on the `<a>` element |

### Example

```tsx
import { fetchLinks, IconLink } from "@presencekit/react";

const links = await fetchLinks("https://you.github.io/presence/links.json");
const githubLink = links.find((l) => l.platform === "github");

export function GithubBadge() {
  return <IconLink link={githubLink} className="badge" />;
}
```

The component renders:
- An `<a>` with `target="_blank" rel="noopener noreferrer"`
- An `aria-label` set to the link's `label`
- The platform SVG icon (inline) when available; falls back to label text only

---

## TypeScript

All components and their props are fully typed. Import type definitions from `@presencekit/react` — no need to import from core directly:

```ts
import type {
  ResolvedLink,
  PresenceConfig,
  LinkEntry,
  FilterOpts,
  FooterLinksProps,
  IconLinkProps,
  RenderStrategy,
} from "@presencekit/react";
```

---

## License

MIT © presencekit contributors
