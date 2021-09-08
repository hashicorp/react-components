# @hashicorp/react-checkbox-input

## 5.0.0

### Major Changes

- [#304](https://github.com/hashicorp/react-components/pull/304) [`58d66d7`](https://github.com/hashicorp/react-components/commit/58d66d724962a4c38716430ac218a0019f275e8f) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-checkbox-input` to retain existing overrides.
