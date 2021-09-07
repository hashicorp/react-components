---
'@hashicorp/react-vertical-text-block-list': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-vertical-text-block-list/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-vertical-text-block-list` to retain existing overrides.
