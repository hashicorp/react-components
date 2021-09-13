# @hashicorp/react-text-input

## 5.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 5.0.0

### Major Changes

- [#312](https://github.com/hashicorp/react-components/pull/312) [`19744c9`](https://github.com/hashicorp/react-components/commit/19744c9638aa4db1ba98abff284538aede5b1326) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-text-input/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-text-input` to retain existing overrides.

### Minor Changes

- [#299](https://github.com/hashicorp/react-components/pull/299) [`bc36b72`](https://github.com/hashicorp/react-components/commit/bc36b72a74068eeea59359e23d3955fa48043684) Thanks [@zchsh](https://github.com/zchsh)! - - ✨ Adds support for a className prop.
