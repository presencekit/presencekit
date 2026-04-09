// Re-export all of core so React users never need to install @presencekit/core directly
export * from "@presencekit/core";

// React-specific exports
export type { IconLinkProps } from "./IconLink.js";
export { IconLink } from "./IconLink.js";
export type { FooterLinksProps, RenderStrategy } from "./FooterLinks.js";
export { FooterLinks } from "./FooterLinks.js";
