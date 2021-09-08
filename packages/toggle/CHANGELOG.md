# @hashicorp/react-toggle

## 4.0.0

### Major Changes

- [#314](https://github.com/hashicorp/react-components/pull/314) [`15f0689`](https://github.com/hashicorp/react-components/commit/15f068946720d4c10ce5385683da18e8ade0088c) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - Note: does _not_ support a `className` prop, as this component did not use any overrides previously.
