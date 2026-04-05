import type { FilterOpts, LinkEntry, PlatformConfig, PresenceConfig, ResolvedLink } from "./types.js";
import { PLATFORMS } from "./platforms.js";
import { applyFilter } from "./filter.js";

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
 * Creates a presence instance from a `PresenceConfig`.
 *
 * Unknown platform keys (not in the built-in `PLATFORMS` registry) are treated as
 * custom platforms and pass through without icon enrichment. Their label defaults
 * to the key itself.
 *
 * @param config - The presence configuration object.
 * @returns An object with a `getLinks` method for querying resolved links.
 *
 * @example
 * ```ts
 * const presence = createPresence({
 *   github: "https://github.com/acme",
 *   twitter: [
 *     { url: "https://x.com/acme", label: "Company" },
 *     { url: "https://x.com/acme_dev", label: "Dev" },
 *   ],
 * });
 *
 * const links = presence.getLinks({ show: ["github"] });
 * ```
 */
export function createPresence(config: PresenceConfig): {
  /**
   * Returns resolved links, optionally filtered by platform or entry ID.
   *
   * @param opts - Optional filter options.
   * @returns An array of `ResolvedLink` objects.
   */
  getLinks(opts?: FilterOpts): ResolvedLink[];
} {
  const allLinks: ResolvedLink[] = Object.entries(config).flatMap(
    ([platform, platformConfig]) => normalise(platform, platformConfig),
  );

  return {
    getLinks(opts?: FilterOpts): ResolvedLink[] {
      return applyFilter(allLinks, opts);
    },
  };
}
