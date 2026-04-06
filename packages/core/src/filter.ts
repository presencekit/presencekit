import type { FilterOpts, ResolvedLink } from "./types.js";

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
export function applyFilter(links: ResolvedLink[], opts?: FilterOpts): ResolvedLink[] {
  if (!opts) return links;

  if (opts.show) {
    const showSet = new Set(opts.show);
    return links.filter(
      (link) => showSet.has(link.platform) || showSet.has(link.id),
    );
  }

  if (opts.exclude && opts.exclude.length > 0) {
    const excludeSet = new Set(opts.exclude);
    return links.filter(
      (link) => !excludeSet.has(link.platform) && !excludeSet.has(link.id),
    );
  }

  return links;
}
