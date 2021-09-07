---
'@hashicorp/react-enterprise-alert': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-enterprise-alert/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-enterprise-alert` to retain existing overrides.
