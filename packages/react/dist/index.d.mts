import * as React from 'react';
import { ResolvedLink, createPresence } from '@presencekit/core';

/**
 * Props for the `IconLink` component.
 */
type IconLinkProps = {
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
declare function IconLink({ link, className }: IconLinkProps): React.ReactElement;

/**
 * Render strategy for grouping links.
 *
 * - `flat` — render all links as a flat row of `<IconLink />` components (default).
 * - `group-expand` — group by platform, show a count badge, click to expand inline.
 * - `group-popover` — group by platform, hover/click reveals a popover with entries.
 */
type RenderStrategy = "flat" | "group-expand" | "group-popover";
/**
 * Props for the `FooterLinks` component.
 */
type FooterLinksProps = {
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
/**
 * Renders a collection of presence links with configurable layout strategies.
 *
 * @example
 * ```tsx
 * <FooterLinks presence={presence} renderStrategy="flat" show={["github", "twitter"]} />
 * ```
 */
declare function FooterLinks({ presence, show, exclude, renderLink, renderStrategy, className, }: FooterLinksProps): React.ReactElement;

export { FooterLinks, type FooterLinksProps, IconLink, type IconLinkProps, type RenderStrategy };
