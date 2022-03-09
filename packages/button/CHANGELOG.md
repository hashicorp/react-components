# @hashicorp/react-button

## 6.2.0

### Minor Changes

- [#521](https://github.com/hashicorp/react-components/pull/521) [`cb0a3eaf`](https://github.com/hashicorp/react-components/commit/cb0a3eaf8fe9be30dc72b1b3e87ad6ed2e2e2b07) Thanks [@rayelder](https://github.com/rayelder)! - Align <Button /> border-radius and height to Figma component

## 6.1.0

### Minor Changes

- [#495](https://github.com/hashicorp/react-components/pull/495) [`cdab7ec`](https://github.com/hashicorp/react-components/commit/cdab7ec618621bbfe6b828bdfbb023bf6f2ef57d) Thanks [@dstaley](https://github.com/dstaley)! - Render all links with `next/link`. Due to edge cases that may arise as a result of performing client-side navigations to redirected pages, it is recommended that you also use the [`use404Redirects`](https://github.com/hashicorp/react-components/tree/main/packages/error-view#use404redirects) hook from `@hashicorp/error-view` in your `_404.jsx` template.

## 6.0.4

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

## 6.0.3

### Patch Changes

- [#397](https://github.com/hashicorp/react-components/pull/397) [`edcaf4f`](https://github.com/hashicorp/react-components/commit/edcaf4f3bf7df33932efae3b7885c908a541ce1a) Thanks [@zchsh](https://github.com/zchsh)! - Fixes a off-by-1px issue where small-size buttons were not the correct height. Targets specific alignment issue in react-subnav.

## 6.0.2

### Patch Changes

- [#335](https://github.com/hashicorp/react-components/pull/335) [`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead) Thanks [@zchsh](https://github.com/zchsh)! - Fixes contrast issue on brand background by using proper brand values.

## 6.0.1

### Patch Changes

- [#345](https://github.com/hashicorp/react-components/pull/345) [`2e4a44a`](https://github.com/hashicorp/react-components/commit/2e4a44a61590fcddf28dd147128d56c058ab4095) Thanks [@BRKalow](https://github.com/BRKalow)! - - Fix tertiary/neutral button to have the expected text color
  - Update hero styles to have dark text when passing `data.backgroundTheme = "light"`

## 6.0.0

### Major Changes

- [#288](https://github.com/hashicorp/react-components/pull/288) [`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9) Thanks [@zchsh](https://github.com/zchsh)! - Converts Button to CSS modules.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-button/style.css` imports.
    - No longer renders a `g-btn` className. Does however accept a `className` prop, so that we can continue to meet override use cases.
  - 🔨 Converts to Typescript
