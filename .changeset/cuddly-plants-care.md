---
'@hashicorp/react-search': major
---

Converts Search to CSS modules

- 💥✨ BREAKING CHANGE: Refactored to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-search/style.css` imports.
  - For `.hit-content`, consumers will need to import `@hashicorp/react-search/hit-content-styles.module.css`, and use `s.root` on their `renderHitContent` container.
