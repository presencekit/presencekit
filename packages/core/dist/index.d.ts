/**
 * A single link entry with a URL and optional metadata.
 */
type LinkEntry = {
    /** The URL for this link. */
    url: string;
    /** Human-readable label. Defaults to the platform label when omitted. */
    label?: string;
    /** Explicit ID for this entry. Auto-generated when omitted. */
    id?: string;
};
/**
 * The value accepted per platform key in a `PresenceConfig`.
 * Can be a plain URL string, a single `LinkEntry`, or an array of entries.
 */
type PlatformConfig = string | LinkEntry | LinkEntry[];
/**
 * Top-level configuration object mapping platform keys to their link config.
 *
 * @example
 * ```ts
 * const config: PresenceConfig = {
 *   github: "https://github.com/acme",
 *   twitter: { url: "https://x.com/acme", label: "Follow us" },
 * };
 * ```
 */
type PresenceConfig = {
    [platform: string]: PlatformConfig;
};
/**
 * A fully resolved link with icon assets ready for rendering.
 */
type ResolvedLink = {
    /** Unique identifier for this link entry, e.g. `"github-personal"`. */
    id: string;
    /** The platform key, e.g. `"github"`. */
    platform: string;
    /** Display label, e.g. `"GitHub"`. */
    label: string;
    /** The destination URL. */
    url: string;
    /** Icon assets for this platform. */
    icon: {
        /** Inline SVG string. Empty string for unknown platforms. */
        svg: string;
        /** Base64-encoded PNG data URI. Empty string for unknown platforms. */
        png: string;
    };
};
/**
 * Options for filtering the list of resolved links.
 */
type FilterOpts = {
    /**
     * When set, only links whose `platform` or `id` appears in this list are returned.
     * Takes priority over `exclude` when both are provided.
     */
    show?: string[];
    /**
     * When set, links whose `platform` or `id` appears in this list are removed.
     * Ignored when `show` is also provided.
     */
    exclude?: string[];
};

/**
 * Built-in platform registry used to enrich resolved links with labels and icons.
 */
/** A single record in the platform registry. */
type PlatformMeta = {
    /** Default human-readable label. */
    label: string;
    /** Canonical base URL (without protocol). */
    baseUrl: string;
    /** Simple Icons slug. */
    icon: string;
    /** Inline SVG string for the icon. */
    svg: string;
    /** Base64 PNG data URI fallback. */
    png: string;
};
/**
 * Registry of known social/developer platforms with their metadata and icon assets.
 *
 * SVG paths are sourced from Simple Icons (https://simpleicons.org) — MIT licence.
 */
declare const PLATFORMS: Record<string, PlatformMeta>;

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
declare function normalise(platform: string, config: PlatformConfig): ResolvedLink[];
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
declare function createPresence(config: PresenceConfig): {
    /**
     * Returns resolved links, optionally filtered by platform or entry ID.
     *
     * @param opts - Optional filter options.
     * @returns An array of `ResolvedLink` objects.
     */
    getLinks(opts?: FilterOpts): ResolvedLink[];
};

/**
 * Filters an array of resolved links based on the supplied options.
 *
 * - When `opts.show` is set, only links whose `platform` **or** `id` appears in
 *   the `show` array are returned. `show` takes priority over `exclude`.
 * - When `opts.exclude` is set (and `show` is not), links whose `platform` **or**
 *   `id` appears in the `exclude` array are removed.
 * - When `opts` is empty or undefined, the original array is returned unchanged.
 *
 * @param links - The full list of resolved links to filter.
 * @param opts - Optional filter configuration.
 * @returns The filtered array of `ResolvedLink` objects.
 */
declare function applyFilter(links: ResolvedLink[], opts?: FilterOpts): ResolvedLink[];

export { type FilterOpts, type LinkEntry, PLATFORMS, type PlatformConfig, type PlatformMeta, type PresenceConfig, type ResolvedLink, applyFilter, createPresence, normalise };
