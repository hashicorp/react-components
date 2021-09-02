---
'@hashicorp/react-hero': major
---

- 💥✨ BREAKING CHANGE: Refactored to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-hero/style.css` imports.
- 💥 No longer renders a `g-hero` className on the root element
  - Now accepts a `className` prop, so that we can continue to meet override use cases.
