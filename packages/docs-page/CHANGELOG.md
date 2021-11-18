# @hashicorp/react-docs-page

## 14.7.0

### Minor Changes

- [#424](https://github.com/hashicorp/react-components/pull/424) [`02428a8`](https://github.com/hashicorp/react-components/commit/02428a811c9a2c508a90c9eedd71e89d94a0cf70) Thanks [@zchsh](https://github.com/zchsh)! - Add support for Algolia config, through an optional algoliaConfig prop, which is passed to react-search. This prop can be omitted, or provided with incomplete properties, and react-search will fall back to environment variables.

### Patch Changes

- Updated dependencies [[`02428a8`](https://github.com/hashicorp/react-components/commit/02428a811c9a2c508a90c9eedd71e89d94a0cf70)]:
  - @hashicorp/react-search@6.2.0

## 14.6.1

### Patch Changes

- [#430](https://github.com/hashicorp/react-components/pull/430) [`e4a169f`](https://github.com/hashicorp/react-components/commit/e4a169f7331b8f92c5c9bfdd9b28b1dbdc88f140) Thanks [@BRKalow](https://github.com/BRKalow)! - Update generateStaticPaths so that product is not required

## 14.6.0

### Minor Changes

- [#420](https://github.com/hashicorp/react-components/pull/420) [`523f802`](https://github.com/hashicorp/react-components/commit/523f8024e8bc1d419c09b856af99f49e28c81552) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Throw when getStaticProps errors

## 14.5.0

### Minor Changes

- [#390](https://github.com/hashicorp/react-components/pull/390) [`57e5b21`](https://github.com/hashicorp/react-components/commit/57e5b21aa0b4f62ea0e9a41e0a74fd6ae5f986b6) Thanks [@BRKalow](https://github.com/BRKalow)! - Refactor docs page server-side code to use a new loaders pattern. Updates the existing generateStatic\* functions to use the FileLoader under the hood, while marking them as deprecated.

### Patch Changes

- [#416](https://github.com/hashicorp/react-components/pull/416) [`a6ecd8d`](https://github.com/hashicorp/react-components/commit/a6ecd8df2b0fae08e1d3293f9bee5672ec630820) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - surface warning about missing env vars during development

## 14.4.5

### Patch Changes

- [#402](https://github.com/hashicorp/react-components/pull/402) [`2f9b9c6`](https://github.com/hashicorp/react-components/commit/2f9b9c6e16d720fd51b45bce6deb47aef1128783) Thanks [@zchsh](https://github.com/zchsh)! - Patches issue where DocsPageWrapper was not exported. Without this export, GlossaryPage can cause Vercel builds of react-components to fail.

## 14.4.4

### Patch Changes

- [#398](https://github.com/hashicorp/react-components/pull/398) [`9d70e6b`](https://github.com/hashicorp/react-components/commit/9d70e6b93a5669fb0d85945cb3f861f657f1dfc4) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - This fixes docs-page to sort versions my descending semver

## 14.4.3

### Patch Changes

- [#393](https://github.com/hashicorp/react-components/pull/393) [`950f79c`](https://github.com/hashicorp/react-components/commit/950f79ce01628deb23fa4615d276fa1b0696ebc7) Thanks [@kendallstrautman](https://github.com/kendallstrautman)! - Upgrades the @hashicorp/markdown-utils dep to pull in a remark plugin a11y change

- Updated dependencies [[`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead)]:
  - @hashicorp/react-alert@6.0.2

## 14.4.2

### Patch Changes

- [#388](https://github.com/hashicorp/react-components/pull/388) [`a906a8d`](https://github.com/hashicorp/react-components/commit/a906a8d0056bd85e2f875d397f104ea83cf66014) Thanks [@BRKalow](https://github.com/BRKalow)! - Adds styles for search hits and adds units to a variable so that it works in calc()

- Updated dependencies [[`a906a8d`](https://github.com/hashicorp/react-components/commit/a906a8d0056bd85e2f875d397f104ea83cf66014)]:
  - @hashicorp/react-search@6.1.1

## 14.4.1

### Patch Changes

- [#358](https://github.com/hashicorp/react-components/pull/358) [`ef6333f`](https://github.com/hashicorp/react-components/commit/ef6333fb7276a636daab9fe5d6d1289d2945169d) Thanks [@zchsh](https://github.com/zchsh)! - Support possibility of index page being included in nav-data.

* [#382](https://github.com/hashicorp/react-components/pull/382) [`cc46ed6`](https://github.com/hashicorp/react-components/commit/cc46ed6e66c49e7ed777621f4b4c6b978c182e86) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - This updates logic to check `process.env.ENABLE_VERSIONED_DOCS === 'true'` since environment variables are _always strings_.

  This should prevent some unintended behavior if ENABLE_VERSIONED_DOCS is parsed as a string `"false"`, but unintentionally evaluating to `truthy`

* Updated dependencies [[`ef6333f`](https://github.com/hashicorp/react-components/commit/ef6333fb7276a636daab9fe5d6d1289d2945169d)]:
  - @hashicorp/react-docs-sidenav@8.4.0

## 14.4.0

### Minor Changes

- [#373](https://github.com/hashicorp/react-components/pull/373) [`4a5204b`](https://github.com/hashicorp/react-components/commit/4a5204b089e103da6e307ceba830c2356b2a930b) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - construct githubFileUrl to be used w/ **Edit this page**

  - This links to the `main` branch file while on the latest version
  - This is hidden for non-latest versions

### Patch Changes

- Updated dependencies [[`fe1fe69`](https://github.com/hashicorp/react-components/commit/fe1fe696e981bd93c5bcf34329eb81b571f798c9)]:
  - @hashicorp/react-search@6.0.2

## 14.3.1

### Patch Changes

- [#375](https://github.com/hashicorp/react-components/pull/375) [`0124e48`](https://github.com/hashicorp/react-components/commit/0124e48c025bea16d16f7d5cbb89c39f21aa88f6) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - This removes a log statement that was breaking minor updates

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
