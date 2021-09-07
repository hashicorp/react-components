---
'@hashicorp/react-checkbox-input': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-checkbox-input` to retain existing overrides.
