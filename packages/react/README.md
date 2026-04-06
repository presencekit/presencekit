# @presencekit/react

> React components for rendering social/developer presence links with icon support.

[![npm](https://img.shields.io/npm/v/@presencekit/react)](https://www.npmjs.com/package/@presencekit/react)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

## Install

```bash
npm install @presencekit/core @presencekit/react
# or
pnpm add @presencekit/core @presencekit/react
# or
yarn add @presencekit/core @presencekit/react
```

**Peer dependencies:** `react >=17` and `react-dom >=17` must already be installed in your project.

---

## Quick Start

```tsx
import { createPresence } from "@presencekit/core";
import { FooterLinks } from "@presencekit/react";

const presence = createPresence({
  github: "https://github.com/acme",
  twitter: "https://x.com/acme",
  linkedin: "https://linkedin.com/in/acme",
});

export function Footer() {
  return <FooterLinks presence={presence} />;
}
```

---

## `<FooterLinks />`

The main composite component that renders a `<nav>` containing all (or a filtered subset of) your presence links.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `presence` | `ReturnType<typeof createPresence>` | — | **Required.** Presence instance from `createPresence()` |
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
<FooterLinks presence={presence} renderStrategy="flat" />
```

#### `"group-expand"`

Groups links by platform. Platforms with a single entry render as a plain icon link. Platforms with multiple entries render as a button with a count badge; clicking the button expands an inline list of all entries.

```tsx
<FooterLinks presence={presence} renderStrategy="group-expand" />
```

#### `"group-popover"`

Same grouping behaviour as `"group-expand"`, but multi-entry platforms reveal their entries in a floating popover on hover or click. Press `Escape` to dismiss.

```tsx
<FooterLinks presence={presence} renderStrategy="group-popover" />
```

---

### Filtering links

Use `show` to allowlist specific platforms or entry IDs, and `exclude` to denylist them. When both are supplied, `show` takes priority.

```tsx
const presence = createPresence({
  github: [
    { url: "https://github.com/personal", label: "Personal" },
    { url: "https://github.com/work",     label: "Work" },
  ],
  twitter: "https://x.com/acme",
  linkedin: "https://linkedin.com/in/acme",
});

// Show only github and twitter
<FooterLinks presence={presence} show={["github", "twitter"]} />

// Hide the work github entry
<FooterLinks presence={presence} exclude={["github-work"]} />

// Show only the personal github entry
<FooterLinks presence={presence} show={["github-personal"]} />
```

---

### Custom link renderer

Supply a `renderLink` function to take full control of how each link is rendered. The function receives a `ResolvedLink` and must return a `ReactNode`.

```tsx
<FooterLinks
  presence={presence}
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
import { createPresence } from "@presencekit/core";
import { IconLink } from "@presencekit/react";

const presence = createPresence({
  github: "https://github.com/acme",
});

export function GithubBadge() {
  const link = presence.getLinks()[0];
  return <IconLink link={link} className="badge" />;
}
```

The component renders:
- An `<a>` with `target="_blank" rel="noopener noreferrer"`
- An `aria-label` set to the link's `label`
- The platform SVG icon (inline) when available; falls back to label text only

---

## TypeScript

All components and their props are fully typed. Import the type definitions as needed:

```ts
import type { ResolvedLink } from "@presencekit/core";
import type { FooterLinksProps, IconLinkProps, RenderStrategy } from "@presencekit/react";
```

---

## License

MIT © presencekit contributors
