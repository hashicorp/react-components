# @hashicorp/react-text-split

## 4.0.0

### Major Changes

- [#313](https://github.com/hashicorp/react-components/pull/313) [`14cf3ad`](https://github.com/hashicorp/react-components/commit/14cf3ad2c8f20adfa1c50971f3646f66537a778b) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-text-split/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-text-split` to retain existing overrides.

## 3.2.5

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
