# @hashicorp/react-case-study-slider

## 7.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

- Updated dependencies [[`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6)]:
  - @hashicorp/react-featured-slider@5.0.1

## 7.0.0

### Major Changes

- [#303](https://github.com/hashicorp/react-components/pull/303) [`d8f4d4a`](https://github.com/hashicorp/react-components/commit/d8f4d4ae7d8f12f2f8929dd91887bb903b07a66b) Thanks [@zchsh](https://github.com/zchsh)! - - 💥 BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-case-study-slider/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, you can pass `className="g-case-study-slider` to retain existing overrides.
  - 🔨 Refactors to re-use work in `featured-slider`
    - Props interface remains unchanged

### Patch Changes

- Updated dependencies [[`d8f4d4a`](https://github.com/hashicorp/react-components/commit/d8f4d4ae7d8f12f2f8929dd91887bb903b07a66b)]:
  - @hashicorp/react-featured-slider@5.0.0

## 6.1.5

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
