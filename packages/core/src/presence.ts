import type { FetchOpts, FilterOpts, LinkEntry, PlatformConfig, Presence, PresenceConfig, ResolvedLink } from "./types.js";
import { PLATFORMS } from "./platforms.js";
import { applyFilter } from "./filter.js";
import { fetchLinks } from "./fetch.js";

/**
 * Converts a string or `LinkEntry` label into a URL-safe slug.
 *
 * @param text - The string to slugify.
 * @returns A lowercase, hyphen-separated slug.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");
}

/**
 * Normalises a single platform's `PlatformConfig` into an array of `ResolvedLink`s.
 *
 * Rules:
 * - `string` → single entry, URL = value, label = platform default
 * - `LinkEntry` → single entry
 * - `LinkEntry[]` → multiple entries
 * - `id` auto-generated as `{platform}-{slugify(label)}` when omitted
 * - When no label and only one entry → use platform default label
 * - When no label and multiple entries → use `{platform} {index + 1}`
 *
 * @param platform - The platform key from the config.
 * @param config - The raw config value for this platform.
 * @returns An array of fully resolved links (without icon enrichment).
 */
export function normalise(platform: string, config: PlatformConfig): ResolvedLink[] {
  const meta = PLATFORMS[platform];
  const defaultLabel = meta?.label ?? platform;

  const entries: LinkEntry[] = typeof config === "string"
    ? [{ url: config }]
    : Array.isArray(config)
    ? config
    : [config];

  const isMulti = entries.length > 1;

  return entries.map((entry, index) => {
    const label =
      entry.label ??
      (isMulti ? `${defaultLabel} ${index + 1}` : defaultLabel);

    const id = entry.id ?? `${platform}-${slugify(label)}`;

    return {
      id,
      platform,
      label,
      url: entry.url,
      icon: meta
        ? { svg: meta.svg, png: meta.png }
        : { svg: "", png: "" },
    };
  });
}

/**
 * Creates a presence instance from a remote `links.json` URL (BYOL model).
 *
 * The URL is fetched at call time with `force-cache` by default, making it
 * suitable for build-time invocation in Next.js, Astro, SvelteKit, etc.
 *
 * @param url - Public URL of a hosted `links.json` file.
 * @param opts - Optional fetch configuration.
 * @returns A `Presence` instance with a `getLinks` method.
 *
 * @example
 * ```ts
 * // Next.js App Router server component
 * const presence = await createPresence('https://you.github.io/presence/links.json');
 * ```
 */
export async function createPresence(url: string, opts?: FetchOpts): Promise<Presence>;

/**
 * Creates a presence instance from an inline `PresenceConfig` object.
 *
 * Useful for testing, local development, or simple cases where hosting a
 * remote file is unnecessary. The function is still async for API consistency.
 *
 * @param config - Inline presence configuration.
 * @returns A `Presence` instance with a `getLinks` method.
 *
 * @example
 * ```ts
 * const presence = await createPresence({
 *   github: 'https://github.com/acme',
 *   twitter: 'https://x.com/acme',
 * });
 * ```
 */
export async function createPresence(config: PresenceConfig): Promise<Presence>;

export async function createPresence(
  urlOrConfig: string | PresenceConfig,
  opts?: FetchOpts,
): Promise<Presence> {
  const config: PresenceConfig =
    typeof urlOrConfig === "string"
      ? await fetchLinks(urlOrConfig, opts)
      : urlOrConfig;

  const allLinks: ResolvedLink[] = Object.entries(config).flatMap(
    ([platform, platformConfig]) => normalise(platform, platformConfig),
  );

  return {
    getLinks(opts?: FilterOpts): ResolvedLink[] {
      return applyFilter(allLinks, opts);
    },
  };
}
