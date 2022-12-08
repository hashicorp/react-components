# @hashicorp/react-case-study-slider

## 7.0.3

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-featured-slider@5.0.2
  - @hashicorp/react-image@4.0.4

## 7.0.2

### Patch Changes

- [#500](https://github.com/hashicorp/react-components/pull/500) [`b7e0c0e`](https://github.com/hashicorp/react-components/commit/b7e0c0e400419e66ff1d19560afbca6aaa122e4e) Thanks [@jmfury](https://github.com/jmfury)! - Fixes regression on links from a Case Study resource item

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
