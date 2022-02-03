# @hashicorp/react-logo-grid

## 5.0.3

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-button@6.0.4
  - @hashicorp/react-image@4.0.4

## 5.0.2

### Patch Changes

- [#335](https://github.com/hashicorp/react-components/pull/335) [`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead) Thanks [@zchsh](https://github.com/zchsh)! - - ✨ Exports `LogoGridCompany` type to help avoid TypeScript errors in consuming projects.
  - ✨ Exports `LogoGridSize` type to help avoid TypeScript errors in consuming projects.
- Updated dependencies [[`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead)]:
  - @hashicorp/react-button@6.0.2

## 5.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 5.0.0

### Major Changes

- [#309](https://github.com/hashicorp/react-components/pull/309) [`73927a8`](https://github.com/hashicorp/react-components/commit/73927a83a3d76138ca55b84096936aafa96e0d29) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-logo-grid` css imports.
  - No longer renders a `g-logo-grid` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
  - 🔨 Replaces Tippy with ReachUI Popover
    - This changes the behavior of the popover slightly, but not in a breaking way.
  - 🔨 Accessibility improvements
    - grid items with popover tooltips now render as focus-able `button` elements
    - tooltip a11y is now improved, with features such as close-on-focus-outside
  - 🔨 Converts to Typescript

## 4.1.5

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
