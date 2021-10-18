# @hashicorp/react-product-features-list

## 5.0.1

### Patch Changes

- [#356](https://github.com/hashicorp/react-components/pull/356) [`7f76a90`](https://github.com/hashicorp/react-components/commit/7f76a90057aa92fa8483a6b71983e4e7bc1c2f14) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - A11y fix to ensure sequential order of headings h2 -> h3 instead of h2 -> h4

- Updated dependencies [[`edcaf4f`](https://github.com/hashicorp/react-components/commit/edcaf4f3bf7df33932efae3b7885c908a541ce1a)]:
  - @hashicorp/react-button@6.0.3

## 5.0.0

### Major Changes

- [#310](https://github.com/hashicorp/react-components/pull/310) [`0ae01bb`](https://github.com/hashicorp/react-components/commit/0ae01bb0c7c18c20e10bb0a406515771719a76d8) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-product-features-list/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-product-features-list` to retain existing overrides.

## 4.1.5

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
