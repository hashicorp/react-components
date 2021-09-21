# @hashicorp/react-docs-page

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
