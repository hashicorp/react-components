# @hashicorp/react-use-cases

## 5.0.0

### Major Changes

- [#315](https://github.com/hashicorp/react-components/pull/315) [`fcbb786`](https://github.com/hashicorp/react-components/commit/fcbb786bc55e37ee5742e0dd3fc8e08a895cff4e) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-use-cases/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-use-cases` to retain existing overrides.
