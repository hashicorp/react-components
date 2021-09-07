---
'@hashicorp/react-featured-slider': major
---

- 💥 BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-featured-slider/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, you can pass `className="g-featured-slider` to retain existing overrides.
- ✨ Adds named `FeaturedSlideInner` export
  - Allows component to be used without external margin
  - Supports reconciling duplicative code in `case-study-slider`
