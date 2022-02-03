# @hashicorp/react-vertical-text-block-list

## 7.0.1

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-image@4.0.4

## 7.0.0

### Major Changes

- [#316](https://github.com/hashicorp/react-components/pull/316) [`14b5f2a`](https://github.com/hashicorp/react-components/commit/14b5f2a88112cc7f1cea675be3bc50704030224e) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-vertical-text-block-list/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-vertical-text-block-list` to retain existing overrides.
