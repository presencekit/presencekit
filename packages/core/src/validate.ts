import type { LinkEntry, PresenceConfig } from "./types.js";

function isLinkEntry(value: unknown): value is LinkEntry {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return typeof v["url"] === "string";
}

function validatePlatformValue(platform: string, value: unknown): void {
  if (typeof value === "string") return;

  if (isLinkEntry(value)) return;

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!isLinkEntry(item)) {
        throw new Error(
          `presencekit: invalid links.json — '${platform}' array contains an entry that is not a valid LinkEntry { url, label?, id? }`,
        );
      }
    }
    return;
  }

  throw new Error(
    `presencekit: invalid links.json — '${platform}' must be a string or LinkEntry { url, label?, id? }`,
  );
}

/**
 * Validates that a parsed JSON value matches the `PresenceConfig` schema.
 *
 * Unknown platform keys (not in the built-in registry) pass through as custom
 * platforms — only the shape of each value is checked.
 *
 * @param json - The raw parsed JSON value from a `links.json` response.
 * @returns A validated `PresenceConfig`.
 * @throws When the root is not a plain object, or any platform value has an invalid shape.
 *
 * @example
 * ```ts
 * const config = validate(await res.json());
 * ```
 */
export function validate(json: unknown): PresenceConfig {
  if (typeof json !== "object" || json === null || Array.isArray(json)) {
    throw new Error("presencekit: invalid links.json — root must be a JSON object");
  }

  const config = json as Record<string, unknown>;

  for (const [platform, value] of Object.entries(config)) {
    validatePlatformValue(platform, value);
  }

  return config as PresenceConfig;
}
