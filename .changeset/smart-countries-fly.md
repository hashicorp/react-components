---
'@hashicorp/react-logo-grid': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-logo-grid` imports.
  - No longer renders a `g-logo-grid` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
- 🔨 Replaces Tippy with ReachUI Dialog
  - This changes the behavior of the dialog somewhat, but not in a breaking way.
- 🔨 Accessibility improvements
  - grid items with dialog tooltips now render as focus-able `button` elements
  - tooltip a11y is now improved, with features such as focus lock and auto-focusing of the close button when the dialog is opened, thanks to ReachUI
- 🔨 Converts to Typescript
