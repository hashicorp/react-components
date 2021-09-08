# @hashicorp/react-call-to-action

## 4.0.0

### Major Changes

- [#301](https://github.com/hashicorp/react-components/pull/301) [`a1dc710`](https://github.com/hashicorp/react-components/commit/a1dc710957d4025ae2e93089751ffb0348639cb3) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-call-to-action/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, you can pass `className="g-call-to-action` to retain existing overrides.

## 3.1.5

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
