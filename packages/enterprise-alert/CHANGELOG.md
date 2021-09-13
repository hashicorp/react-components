# @hashicorp/react-enterprise-alert

## 6.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 6.0.0

### Major Changes

- [#307](https://github.com/hashicorp/react-components/pull/307) [`4d62eb1`](https://github.com/hashicorp/react-components/commit/4d62eb1f7ab33ccd404e8b04daeda291616e47c3) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-enterprise-alert/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-enterprise-alert` to retain existing overrides.
