import * as React from "react";
import type { ResolvedLink } from "@presencekit/core";
import type { createPresence } from "@presencekit/core";
import { IconLink } from "./IconLink.js";

/**
 * Render strategy for grouping links.
 *
 * - `flat` — render all links as a flat row of `<IconLink />` components (default).
 * - `group-expand` — group by platform, show a count badge, click to expand inline.
 * - `group-popover` — group by platform, hover/click reveals a popover with entries.
 */
export type RenderStrategy = "flat" | "group-expand" | "group-popover";

/**
 * Props for the `FooterLinks` component.
 */
export type FooterLinksProps = {
  /** A presence instance returned by `createPresence()`. */
  presence: ReturnType<typeof createPresence>;
  /** Only render links matching these platform keys or entry IDs. */
  show?: string[];
  /** Remove links matching these platform keys or entry IDs. */
  exclude?: string[];
  /** Custom renderer for each individual link. Overrides `<IconLink />`. */
  renderLink?: (link: ResolvedLink) => React.ReactNode;
  /** How to display links. Defaults to `"flat"`. */
  renderStrategy?: RenderStrategy;
  /** Additional class name applied to the root element. */
  className?: string;
};

/** Groups an array of links by `link.platform`. */
function groupByPlatform(links: ResolvedLink[]): Map<string, ResolvedLink[]> {
  const map = new Map<string, ResolvedLink[]>();
  for (const link of links) {
    const existing = map.get(link.platform);
    if (existing) {
      existing.push(link);
    } else {
      map.set(link.platform, [link]);
    }
  }
  return map;
}

/** Inline styles shared across strategies. */
const ROOT_STYLE: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

// ---------------------------------------------------------------------------
// Flat strategy
// ---------------------------------------------------------------------------

function FlatLinks({
  links,
  renderLink,
}: {
  links: ResolvedLink[];
  renderLink?: (link: ResolvedLink) => React.ReactNode;
}): React.ReactElement {
  return (
    <ul style={ROOT_STYLE}>
      {links.map((link) => (
        <li key={link.id}>
          {renderLink ? renderLink(link) : <IconLink link={link} />}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Group-Expand strategy
// ---------------------------------------------------------------------------

function GroupExpandLinks({
  groups,
  renderLink,
}: {
  groups: Map<string, ResolvedLink[]>;
  renderLink?: (link: ResolvedLink) => React.ReactNode;
}): React.ReactElement {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  function toggle(platform: string): void {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) {
        next.delete(platform);
      } else {
        next.add(platform);
      }
      return next;
    });
  }

  return (
    <ul style={ROOT_STYLE}>
      {Array.from(groups.entries()).map(([platform, links]) => {
        if (links.length === 1) {
          const link = links[0]!;
          return (
            <li key={platform}>
              {renderLink ? renderLink(link) : <IconLink link={link} />}
            </li>
          );
        }
        const isOpen = expanded.has(platform);
        const first = links[0]!;
        return (
          <li key={platform} style={{ position: "relative" }}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`${first.label} (${links.length} accounts)`}
              onClick={() => toggle(platform)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {renderLink ? renderLink(first) : <IconLink link={first} />}
              <span
                style={{
                  fontSize: "0.65rem",
                  background: "#555",
                  color: "#fff",
                  borderRadius: "9999px",
                  padding: "1px 5px",
                  marginLeft: "2px",
                  verticalAlign: "super",
                }}
              >
                {links.length}
              </span>
            </button>
            {isOpen && (
              <ul
                style={{
                  ...ROOT_STYLE,
                  flexDirection: "column",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  zIndex: 10,
                  minWidth: "8rem",
                }}
              >
                {links.map((link) => (
                  <li key={link.id}>
                    {renderLink ? renderLink(link) : <IconLink link={link} />}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Group-Popover strategy
// ---------------------------------------------------------------------------

function GroupPopoverLinks({
  groups,
  renderLink,
}: {
  groups: Map<string, ResolvedLink[]>;
  renderLink?: (link: ResolvedLink) => React.ReactNode;
}): React.ReactElement {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <ul style={ROOT_STYLE}>
      {Array.from(groups.entries()).map(([platform, links]) => {
        if (links.length === 1) {
          const link = links[0]!;
          return (
            <li key={platform}>
              {renderLink ? renderLink(link) : <IconLink link={link} />}
            </li>
          );
        }
        const first = links[0]!;
        const isOpen = open === platform;
        return (
          <li
            key={platform}
            style={{ position: "relative" }}
            onMouseEnter={() => setOpen(platform)}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-label={`${first.label} (${links.length} accounts)`}
              onClick={() => setOpen(isOpen ? null : platform)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {renderLink ? renderLink(first) : <IconLink link={first} />}
              <span
                style={{
                  fontSize: "0.65rem",
                  background: "#555",
                  color: "#fff",
                  borderRadius: "9999px",
                  padding: "1px 5px",
                  marginLeft: "2px",
                  verticalAlign: "super",
                }}
              >
                {links.length}
              </span>
            </button>
            {isOpen && (
              <div
                role="dialog"
                aria-label={`${first.label} accounts`}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  zIndex: 10,
                  minWidth: "8rem",
                }}
              >
                <ul style={{ ...ROOT_STYLE, flexDirection: "column" }}>
                  {links.map((link) => (
                    <li key={link.id}>
                      {renderLink ? renderLink(link) : <IconLink link={link} />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// FooterLinks (main export)
// ---------------------------------------------------------------------------

/**
 * Renders a collection of presence links with configurable layout strategies.
 *
 * @example
 * ```tsx
 * <FooterLinks presence={presence} renderStrategy="flat" show={["github", "twitter"]} />
 * ```
 */
export function FooterLinks({
  presence,
  show,
  exclude,
  renderLink,
  renderStrategy = "flat",
  className,
}: FooterLinksProps): React.ReactElement {
  const links = presence.getLinks({ show, exclude });

  if (renderStrategy === "group-expand" || renderStrategy === "group-popover") {
    const groups = groupByPlatform(links);
    if (renderStrategy === "group-expand") {
      return (
        <nav className={className}>
          <GroupExpandLinks groups={groups} renderLink={renderLink} />
        </nav>
      );
    }
    return (
      <nav className={className}>
        <GroupPopoverLinks groups={groups} renderLink={renderLink} />
      </nav>
    );
  }

  return (
    <nav className={className}>
      <FlatLinks links={links} renderLink={renderLink} />
    </nav>
  );
}
