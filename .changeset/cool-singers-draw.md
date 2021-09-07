---
'@hashicorp/react-toggle': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - Note: does _not_ support a `className` prop, as this component did not use any overrides previously.
