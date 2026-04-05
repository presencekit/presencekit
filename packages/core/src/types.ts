/**
 * A single link entry with a URL and optional metadata.
 */
export type LinkEntry = {
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
export type PlatformConfig = string | LinkEntry | LinkEntry[];

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
export type PresenceConfig = {
  [platform: string]: PlatformConfig;
};

/**
 * A fully resolved link with icon assets ready for rendering.
 */
export type ResolvedLink = {
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
export type FilterOpts = {
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
