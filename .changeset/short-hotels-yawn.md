---
'@hashicorp/react-subnav': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-subnav/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-subnav` to retain existing overrides.
