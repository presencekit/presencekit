import * as React from "react";
import type { ResolvedLink } from "@presencekit/core";

/**
 * Props for the `IconLink` component.
 */
export type IconLinkProps = {
  /** The resolved link to render. */
  link: ResolvedLink;
  /** Optional class name to apply to the anchor element. */
  className?: string;
};

/**
 * Renders a single presence link as an accessible icon + label anchor.
 *
 * - Opens in a new tab with `rel="noopener noreferrer"`.
 * - Uses the platform SVG icon when available, otherwise shows the label only.
 * - The `aria-label` is always set to `link.label` for screen readers.
 *
 * @param props - `IconLinkProps`
 */
export function IconLink({ link, className }: IconLinkProps): React.ReactElement {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", textDecoration: "none" }}
    >
      {link.icon.svg ? (
        <span
          aria-hidden="true"
          style={{ width: "1.25rem", height: "1.25rem", display: "inline-flex" }}
          dangerouslySetInnerHTML={{ __html: link.icon.svg }}
        />
      ) : null}
      <span>{link.label}</span>
    </a>
  );
}
