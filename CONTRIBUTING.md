# Contributing to presencekit

Thank you for your interest in contributing!

## Development Setup

```bash
pnpm install
pnpm build
pnpm test
```

## Workflow

1. Fork the repo and create a feature branch.
2. Make your changes with tests.
3. Run `pnpm lint && pnpm test` to verify.
4. Add a changeset: `pnpm changeset`
5. Open a pull request against `main`.

## Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning.
When making a user-facing change, run `pnpm changeset` to describe the change.

## Code Style

- TypeScript strict mode
- Named exports only (no default exports)
- JSDoc on all public APIs
- No external runtime dependencies in `@presencekit/core`
