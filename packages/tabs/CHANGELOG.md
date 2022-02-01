# @hashicorp/react-tabs

## 7.1.2

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

## 7.1.1

### Patch Changes

- [#421](https://github.com/hashicorp/react-components/pull/421) [`d1556f4`](https://github.com/hashicorp/react-components/commit/d1556f456ad87b5624b9c25e14a0f8ae324643d0) Thanks [@kendallstrautman](https://github.com/kendallstrautman)! - Adds heap data tracking attribute to tab trigger button.

## 7.1.0

### Minor Changes

- [#384](https://github.com/hashicorp/react-components/pull/384) [`732ff93`](https://github.com/hashicorp/react-components/commit/732ff93b3f9da1da5abe0a9343421e272d26eee9) Thanks [@zchsh](https://github.com/zchsh)! - Add support for theme="dark".

## 7.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 7.0.0

### Major Changes

- [#296](https://github.com/hashicorp/react-components/pull/296) [`c6b7a4d`](https://github.com/hashicorp/react-components/commit/c6b7a4dc80319d92f694773517d822f0566b229a) Thanks [@zchsh](https://github.com/zchsh)! - Converts Tabs to CSS modules.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-tabs/style.css` imports.
  - 🔨 Refactors previous class component implementations to functional components with hooks
  - 🔨 Converts to Typescript
  - 🔨 Replaces Tippy with [reach/tooltip](https://reach.tech/tooltip) and [reach/portal](https://reach.tech/portal).
    - This change was necessary to fully transition the component to CSS modules.
    - reach/tooltip is also [smaller](https://bundlephobia.com/package/@reach/tooltip@0.16.0) than [Tippy.js](https://bundlephobia.com/package/@tippyjs/react@4.2.5)
  - 🔧 move icons to SVG files to match other components
  - 🔧 fix casing on some files and folders
  - 🐛 minor fixes for visual bugs, including overflow issues on smaller viewports
