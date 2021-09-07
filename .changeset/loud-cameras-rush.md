---
'@hashicorp/react-callouts': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-callouts/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, you can pass `className="g-callouts` to retain existing overrides.
