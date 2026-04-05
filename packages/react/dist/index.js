"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FooterLinks: () => FooterLinks,
  IconLink: () => IconLink
});
module.exports = __toCommonJS(index_exports);

// src/IconLink.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function IconLink({ link, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "a",
    {
      href: link.url,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": link.label,
      className,
      style: { display: "inline-flex", alignItems: "center", gap: "0.25rem", textDecoration: "none" },
      children: [
        link.icon.svg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            "aria-hidden": "true",
            style: { width: "1.25rem", height: "1.25rem", display: "inline-flex" },
            dangerouslySetInnerHTML: { __html: link.icon.svg }
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: link.label })
      ]
    }
  );
}

// src/FooterLinks.tsx
var React = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
function groupByPlatform(links) {
  const map = /* @__PURE__ */ new Map();
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
var ROOT_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
  listStyle: "none",
  margin: 0,
  padding: 0
};
function FlatLinks({
  links,
  renderLink
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: ROOT_STYLE, children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: renderLink ? renderLink(link) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link }) }, link.id)) });
}
function GroupExpandLinks({
  groups,
  renderLink
}) {
  const [expanded, setExpanded] = React.useState(/* @__PURE__ */ new Set());
  function toggle(platform) {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: ROOT_STYLE, children: Array.from(groups.entries()).map(([platform, links]) => {
    if (links.length === 1) {
      const link = links[0];
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: renderLink ? renderLink(link) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link }) }, platform);
    }
    const isOpen = expanded.has(platform);
    const first = links[0];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { style: { position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          type: "button",
          "aria-expanded": isOpen,
          "aria-label": `${first.label} (${links.length} accounts)`,
          onClick: () => toggle(platform),
          style: { background: "none", border: "none", cursor: "pointer", padding: 0 },
          children: [
            renderLink ? renderLink(first) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link: first }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "span",
              {
                style: {
                  fontSize: "0.65rem",
                  background: "#555",
                  color: "#fff",
                  borderRadius: "9999px",
                  padding: "1px 5px",
                  marginLeft: "2px",
                  verticalAlign: "super"
                },
                children: links.length
              }
            )
          ]
        }
      ),
      isOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "ul",
        {
          style: {
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
            minWidth: "8rem"
          },
          children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: renderLink ? renderLink(link) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link }) }, link.id))
        }
      )
    ] }, platform);
  }) });
}
function GroupPopoverLinks({
  groups,
  renderLink
}) {
  const [open, setOpen] = React.useState(null);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: ROOT_STYLE, children: Array.from(groups.entries()).map(([platform, links]) => {
    if (links.length === 1) {
      const link = links[0];
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: renderLink ? renderLink(link) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link }) }, platform);
    }
    const first = links[0];
    const isOpen = open === platform;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "li",
      {
        style: { position: "relative" },
        onMouseEnter: () => setOpen(platform),
        onMouseLeave: () => setOpen(null),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              type: "button",
              "aria-expanded": isOpen,
              "aria-haspopup": "true",
              "aria-label": `${first.label} (${links.length} accounts)`,
              onClick: () => setOpen(isOpen ? null : platform),
              style: { background: "none", border: "none", cursor: "pointer", padding: 0 },
              children: [
                renderLink ? renderLink(first) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link: first }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "span",
                  {
                    style: {
                      fontSize: "0.65rem",
                      background: "#555",
                      color: "#fff",
                      borderRadius: "9999px",
                      padding: "1px 5px",
                      marginLeft: "2px",
                      verticalAlign: "super"
                    },
                    children: links.length
                  }
                )
              ]
            }
          ),
          isOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              role: "dialog",
              "aria-label": `${first.label} accounts`,
              style: {
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                padding: "0.5rem",
                zIndex: 10,
                minWidth: "8rem"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: { ...ROOT_STYLE, flexDirection: "column" }, children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: renderLink ? renderLink(link) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconLink, { link }) }, link.id)) })
            }
          )
        ]
      },
      platform
    );
  }) });
}
function FooterLinks({
  presence,
  show,
  exclude,
  renderLink,
  renderStrategy = "flat",
  className
}) {
  const links = presence.getLinks({ show, exclude });
  if (renderStrategy === "group-expand" || renderStrategy === "group-popover") {
    const groups = groupByPlatform(links);
    if (renderStrategy === "group-expand") {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GroupExpandLinks, { groups, renderLink }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GroupPopoverLinks, { groups, renderLink }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FlatLinks, { links, renderLink }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FooterLinks,
  IconLink
});
//# sourceMappingURL=index.js.map