---
'@hashicorp/react-button': minor
---

Converts Button to CSS modules.

- 💥✨ BREAKING CHANGE: Refactored to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-button/style.css` imports.
  - No longer renders a `g-btn` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
- 🔨 Converts to Typescript
