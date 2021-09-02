# @hashicorp/react-button

## 6.0.0

### Major Changes

- [#288](https://github.com/hashicorp/react-components/pull/288) [`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9) Thanks [@zchsh](https://github.com/zchsh)! - Converts Button to CSS modules.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-button/style.css` imports.
    - No longer renders a `g-btn` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
  - 🔨 Converts to Typescript
