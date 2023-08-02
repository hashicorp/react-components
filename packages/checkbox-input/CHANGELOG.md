# @hashicorp/react-checkbox-input

## 6.0.0

### Major Changes

- [#989](https://github.com/hashicorp/react-components/pull/989) [`1338cdc4`](https://github.com/hashicorp/react-components/commit/1338cdc47b083b04d103b00b26166b357418152a) Thanks [@kendallstrautman](https://github.com/kendallstrautman)! - Remove @reach/auto-id dependency in favor of react's `useId` and update peer dependency `react` version to >=18.x

## 5.0.3

### Patch Changes

- [#699](https://github.com/hashicorp/react-components/pull/699) [`3714aff2`](https://github.com/hashicorp/react-components/commit/3714aff2aa95714162c2f753d4814ad192fd8fcd) Thanks [@dstaley](https://github.com/dstaley)! - Display checkmark when checked is true

## 5.0.2

### Patch Changes

- [#645](https://github.com/hashicorp/react-components/pull/645) [`83382731`](https://github.com/hashicorp/react-components/commit/83382731e5d59541a9006eb7fc17df830690a487) Thanks [@dstaley](https://github.com/dstaley)! - Use @reach/auto-id to generate SSR-safe ids

## 5.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 5.0.0

### Major Changes

- [#304](https://github.com/hashicorp/react-components/pull/304) [`58d66d7`](https://github.com/hashicorp/react-components/commit/58d66d724962a4c38716430ac218a0019f275e8f) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-checkbox-input/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-checkbox-input` to retain existing overrides.
