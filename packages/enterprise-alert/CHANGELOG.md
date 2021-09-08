# @hashicorp/react-enterprise-alert

## 6.0.0

### Major Changes

- [#307](https://github.com/hashicorp/react-components/pull/307) [`4d62eb1`](https://github.com/hashicorp/react-components/commit/4d62eb1f7ab33ccd404e8b04daeda291616e47c3) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-enterprise-alert/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-enterprise-alert` to retain existing overrides.
