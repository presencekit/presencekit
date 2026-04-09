import type { FetchOpts, PresenceConfig } from "./types.js";
import { validate } from "./validate.js";

/**
 * Fetches and validates a remote `links.json` file.
 *
 * Uses `force-cache` by default so the file is fetched once at build time and
 * reused on subsequent calls. Pass `cache: 'no-store'` for runtime-fresh data.
 *
 * @param url - The public URL of a `links.json` file.
 * @param opts - Optional fetch configuration.
 * @returns A validated `PresenceConfig`.
 * @throws When the HTTP response is not OK, or when the JSON fails schema validation.
 *
 * @example
 * ```ts
 * const config = await fetchLinks('https://you.github.io/presence/links.json');
 * ```
 */
export async function fetchLinks(url: string, opts?: FetchOpts): Promise<PresenceConfig> {
  const res = await fetch(url, {
    cache: opts?.cache ?? "force-cache",
    headers: opts?.headers,
  });

  if (!res.ok) {
    throw new Error(`presencekit: failed to fetch links from ${url} — ${res.status}`);
  }

  const json: unknown = await res.json();
  return validate(json);
}
