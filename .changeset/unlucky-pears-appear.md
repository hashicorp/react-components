---
'@hashicorp/react-hero': major
---

- 💥 BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-hero/style.css` imports.
  - ✨ To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-hero` to retain existing overrides.
- ✨ Hides `progress-bar` from Percy using `@media only percy`
  - This avoids the need for reach-in styles in consuming projects
