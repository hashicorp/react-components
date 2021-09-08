---
'@hashicorp/react-logo-grid': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-logo-grid` css imports.
  - No longer renders a `g-logo-grid` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
- 🔨 Replaces Tippy with ReachUI Popover
  - This changes the behavior of the popover slightly, but not in a breaking way.
- 🔨 Accessibility improvements
  - grid items with popover tooltips now render as focus-able `button` elements
  - tooltip a11y is now improved, with features such as close-on-focus-outside
- 🔨 Converts to Typescript
