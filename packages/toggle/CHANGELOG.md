# @hashicorp/react-toggle

## 4.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 4.0.0

### Major Changes

- [#314](https://github.com/hashicorp/react-components/pull/314) [`15f0689`](https://github.com/hashicorp/react-components/commit/15f068946720d4c10ce5385683da18e8ade0088c) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - Note: does _not_ support a `className` prop, as this component did not use any overrides previously.
