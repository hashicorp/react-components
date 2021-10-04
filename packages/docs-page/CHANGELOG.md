# @hashicorp/react-docs-page

## 14.3.0

### Minor Changes

- [#354](https://github.com/hashicorp/react-components/pull/354) [`929b9b4`](https://github.com/hashicorp/react-components/commit/929b9b408387c78030e5e570c3fcb9807ce862e0) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - `react-docs-page` now makes api-calls to the mktg-content-workflows' content api

  https://github.com/hashicorp/react-components/pull/360 refactored server code to TypeScript

### Patch Changes

- Updated dependencies [[`9b190b0`](https://github.com/hashicorp/react-components/commit/9b190b0b13beb1045825ee2b1eb560b84215c265)]:
  - @hashicorp/react-docs-sidenav@8.3.0

## 14.2.5

### Patch Changes

- [#362](https://github.com/hashicorp/react-components/pull/362) [`77e5712`](https://github.com/hashicorp/react-components/commit/77e5712336ebe5303ba9cdd0363fd13a7e7cb14f) Thanks [@BRKalow](https://github.com/BRKalow)! - Adjust prop interface to make showVersionSelect, additionalComponents, and showEditPage optional

## 14.2.4

### Patch Changes

- [#353](https://github.com/hashicorp/react-components/pull/353) [`8a83473`](https://github.com/hashicorp/react-components/commit/8a8347301747a36216338ec6c25ebf56db79b9cd) Thanks [@zchsh](https://github.com/zchsh)! - Patches an issue in @hashicorp/platform-docs-mdx related to Tabs styling.

## 14.2.3

### Patch Changes

- [#351](https://github.com/hashicorp/react-components/pull/351) [`a3358e6`](https://github.com/hashicorp/react-components/commit/a3358e665ca2711012697f7138df572e9629699b) Thanks [@BRKalow](https://github.com/BRKalow)! - - Updates @hashicorp/platform-docs-mdx package to one that relies on the latest versions of our components

## 14.2.2

### Patch Changes

- [#348](https://github.com/hashicorp/react-components/pull/348) [`4ac0276`](https://github.com/hashicorp/react-components/commit/4ac0276c28b767272fabe64ef69e2faeb83957f6) Thanks [@BRKalow](https://github.com/BRKalow)! - Adds back @hashicorp/versioned-docs dependency to docs-page as it is still used

## 14.2.1

### Patch Changes

- [#346](https://github.com/hashicorp/react-components/pull/346) [`14f7b1f`](https://github.com/hashicorp/react-components/commit/14f7b1f9818f33d1cbaadafea97a889cb7218dae) Thanks [@BRKalow](https://github.com/BRKalow)! - Update docs-page to depend on @hashicorp/react-version-select instead of @hashicorp/version-select

## 14.2.0

### Minor Changes

- [#342](https://github.com/hashicorp/react-components/pull/342) [`348434e`](https://github.com/hashicorp/react-components/commit/348434ee9490944626f77291082f8130c00a607a) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - feat(version-select): added `removeVersionFromPath` util
  feat(react-docs-page): use new VersionSelect; add test coverage; expose extra prop

### Patch Changes

- Updated dependencies [[`348434e`](https://github.com/hashicorp/react-components/commit/348434ee9490944626f77291082f8130c00a607a)]:
  - @hashicorp/version-select@0.2.0

## 14.1.0

### Minor Changes

- [#337](https://github.com/hashicorp/react-components/pull/337) [`40afe45`](https://github.com/hashicorp/react-components/commit/40afe45a59c8c7d6fcdc097dcf67b382e6b2543b) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - This converts DocsPage to TypeScript. There are no new changes to the component API!

## 14.0.3

### Patch Changes

- [#298](https://github.com/hashicorp/react-components/pull/298) [`4c3e3d1`](https://github.com/hashicorp/react-components/commit/4c3e3d1efdba091f1a38b69b209f581e814f0e57) Thanks [@zchsh](https://github.com/zchsh)! - Converts Search to CSS modules, and makes tweaks in consuming components to account for related changes.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-search/style.css` imports.
    - For `.hit-content`, consumers will need to import `@hashicorp/react-search/hit-content-styles.module.css`, and use `s.root` on their `renderHitContent` container.

- Updated dependencies [[`4c3e3d1`](https://github.com/hashicorp/react-components/commit/4c3e3d1efdba091f1a38b69b209f581e814f0e57)]:
  - @hashicorp/react-docs-sidenav@8.2.5
  - @hashicorp/react-search@6.0.0
