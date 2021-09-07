---
'@hashicorp/react-case-study-slider': major
---

- 💥 BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-case-study-slider/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, you can pass `className="g-case-study-slider` to retain existing overrides.
- 🔨 Refactors to re-use work in `featured-slider`
  - Props interface remains unchanged
