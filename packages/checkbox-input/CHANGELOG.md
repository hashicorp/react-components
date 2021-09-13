# @hashicorp/react-checkbox-input

## 5.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 5.0.0

### Major Changes

- [#304](https://github.com/hashicorp/react-components/pull/304) [`58d66d7`](https://github.com/hashicorp/react-components/commit/58d66d724962a4c38716430ac218a0019f275e8f) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-checkbox-input` to retain existing overrides.
