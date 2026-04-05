# presencekit

> Manage and render your social/developer presence links in one place.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/presencekit/presencekit/actions/workflows/ci.yml/badge.svg)](https://github.com/presencekit/presencekit/actions/workflows/ci.yml)

---

## Packages

| Package | Description |
|---------|-------------|
| [`@presencekit/core`](./packages/core) | Framework-agnostic presence config & link resolution |
| [`@presencekit/react`](./packages/react) | React components — `<FooterLinks />`, `<IconLink />` |

---

## Install

```bash
# Core only (framework-agnostic)
pnpm add @presencekit/core

# React components
pnpm add @presencekit/core @presencekit/react
```

---

## Quick Start

### Simple

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

### Multi-entry per platform

```ts
const presence = createPresence({
  github: [
    { url: "https://github.com/acme",     label: "Company" },
    { url: "https://github.com/acme-dev", label: "Open Source" },
  ],
  youtube: "https://youtube.com/@acme",
});

const links = presence.getLinks({ show: ["github"] });
```

### React

```tsx
import { createPresence } from "@presencekit/core";
import { FooterLinks } from "@presencekit/react";

const presence = createPresence({
  github: "https://github.com/acme",
  twitter: "https://x.com/acme",
});

export function Footer() {
  return <FooterLinks presence={presence} renderStrategy="flat" />;
}
```

---

## API Reference

### `createPresence(config: PresenceConfig)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `PresenceConfig` | Map of platform keys to URL strings or `LinkEntry` objects |

Returns `{ getLinks(opts?: FilterOpts): ResolvedLink[] }`.

### `getLinks(opts?: FilterOpts)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `opts.show` | `string[]` | Only return links matching these platform keys or entry IDs |
| `opts.exclude` | `string[]` | Remove links matching these platform keys or entry IDs |

`show` takes priority over `exclude` when both are supplied.

### `FilterOpts`

| Field | Type | Description |
|-------|------|-------------|
| `show` | `string[]` | Allowlist of platform keys / IDs |
| `exclude` | `string[]` | Denylist of platform keys / IDs |

---

## `<FooterLinks />` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `presence` | `ReturnType<typeof createPresence>` | — | Required. Presence instance |
| `show` | `string[]` | — | Filter: show only these platforms/IDs |
| `exclude` | `string[]` | — | Filter: hide these platforms/IDs |
| `renderLink` | `(link: ResolvedLink) => ReactNode` | — | Custom link renderer |
| `renderStrategy` | `"flat" \| "group-expand" \| "group-popover"` | `"flat"` | Layout strategy |
| `className` | `string` | — | Class applied to the root `<nav>` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on opening issues, submitting PRs, and using Changesets for versioning.

---

## License

MIT © presencekit contributors
Lib that manages your links
