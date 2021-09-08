# @hashicorp/react-vertical-text-block-list

## 7.0.0

### Major Changes

- [#316](https://github.com/hashicorp/react-components/pull/316) [`14b5f2a`](https://github.com/hashicorp/react-components/commit/14b5f2a88112cc7f1cea675be3bc50704030224e) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-vertical-text-block-list/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-vertical-text-block-list` to retain existing overrides.
