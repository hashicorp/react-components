# @hashicorp/react-docs-page

## 16.2.0

### Minor Changes

- [#597](https://github.com/hashicorp/react-components/pull/597) [`b2c02280`](https://github.com/hashicorp/react-components/commit/b2c02280f57b1477ff30f7c1ecc00a8ff2ffe55a) Thanks [@BRKalow](https://github.com/BRKalow)! - Adds optInBanner prop to render an optInBanner in the content area

## 16.1.0

### Minor Changes

- [#583](https://github.com/hashicorp/react-components/pull/583) [`27a251e2`](https://github.com/hashicorp/react-components/commit/27a251e21a036b2aaca37e50b5827bd62c366b21) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - This version adds a navDataPrefix option to the RemoteContentLoader to make nav-data lookup more flexible.

## 16.0.0

### Major Changes

- [#576](https://github.com/hashicorp/react-components/pull/576) [`36f924ae`](https://github.com/hashicorp/react-components/commit/36f924aec763c0dc8c206602ef197194b77d7ff2) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - - convert `docs-sidenav` to typescript
  - update `docs-page` internal code and narrow prop type

### Patch Changes

- Updated dependencies [[`36f924ae`](https://github.com/hashicorp/react-components/commit/36f924aec763c0dc8c206602ef197194b77d7ff2)]:
  - @hashicorp/react-docs-sidenav@9.0.0

## 15.0.0

### Major Changes

- [#568](https://github.com/hashicorp/react-components/pull/568) [`26918b9e`](https://github.com/hashicorp/react-components/commit/26918b9e32b3d4882bb18786f09eaa63c178bbc6) Thanks [@dstaley](https://github.com/dstaley)! - Add TypeScript types

## 14.16.1

### Patch Changes

- [#569](https://github.com/hashicorp/react-components/pull/569) [`21e78bfe`](https://github.com/hashicorp/react-components/commit/21e78bfe0d371c8fffb0c86260744cc716d994a6) Thanks [@zchsh](https://github.com/zchsh)! - Bumps @hashicorp/react-content dependency to fix a table alignment issues. See #562 for details.

## 14.16.0

### Minor Changes

- [#552](https://github.com/hashicorp/react-components/pull/552) [`6cc916be`](https://github.com/hashicorp/react-components/commit/6cc916bee5b10f4beb136a70e43955b69bb27bcf) Thanks [@BRKalow](https://github.com/BRKalow)! - Add latestVersionRef option to RemoteContentLoader

## 14.15.0

### Minor Changes

- [#524](https://github.com/hashicorp/react-components/pull/524) [`657f44b3`](https://github.com/hashicorp/react-components/commit/657f44b3d61a026aca5781297aaf679b76341e40) Thanks [@BRKalow](https://github.com/BRKalow)! - Support passing a function for remarkPlugins, which accepts the params for the current page being rendered.

## 14.14.5

### Patch Changes

- [#541](https://github.com/hashicorp/react-components/pull/541) [`d68f7db0`](https://github.com/hashicorp/react-components/commit/d68f7db026a5af4cce012841fbbf9bf17154ca20) Thanks [@dstaley](https://github.com/dstaley)! - Update TypeScript types to allow `null` as a value for `canonicalUrl`

## 14.14.4

### Patch Changes

- [#516](https://github.com/hashicorp/react-components/pull/516) [`ceb89b24`](https://github.com/hashicorp/react-components/commit/ceb89b24b0086a77421f59ed560c09d7eb6c28e0) Thanks [@dstaley](https://github.com/dstaley)! - Ignore non-jump-to-section tagged H2 elements within the content of a DocsPage

## 14.14.3

### Patch Changes

- [#504](https://github.com/hashicorp/react-components/pull/504) [`25d353c`](https://github.com/hashicorp/react-components/commit/25d353c045437889f01e473f1ca5d8d14308809d) Thanks [@zchsh](https://github.com/zchsh)! - Bumps platform-docs-mdx to fix a manual copy issue in code-block

## 14.14.2

### Patch Changes

- [#508](https://github.com/hashicorp/react-components/pull/508) [`f0bfe27`](https://github.com/hashicorp/react-components/commit/f0bfe27d58f74c3dbc8049899d6bef7758782572) Thanks [@BRKalow](https://github.com/BRKalow)! - Adds CodeTabsProvider to DocsPage, which is necessary for syncing language selection across multiple CodeTabs instances.

## 14.14.1

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-content@8.2.1
  - @hashicorp/react-search@6.4.1

## 14.14.0

### Minor Changes

- [#484](https://github.com/hashicorp/react-components/pull/484) [`5d9f538`](https://github.com/hashicorp/react-components/commit/5d9f538a4910e0799236a75157b674f4630b8916) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - DocsPage

  - Rename `DocsPageWrapper` to `DocsPageInner`
  - Hide `VersionAlert` if version in path is "latest"

  GlossaryPage

  - Update internal import

### Patch Changes

- Updated dependencies [[`a6a6ba4`](https://github.com/hashicorp/react-components/commit/a6a6ba4c1fde8c9a10c725d6c50f9e9c1091de65)]:
  - @hashicorp/react-content@8.1.1

## 14.13.0

### Minor Changes

- [#468](https://github.com/hashicorp/react-components/pull/468) [`22a02a4`](https://github.com/hashicorp/react-components/commit/22a02a47f5dcac983e98f0f3096cf0a785447f7d) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Update `version-select` to handle multipart basePath's, such as `sentinel/intro`

* [#469](https://github.com/hashicorp/react-components/pull/469) [`e0dadee`](https://github.com/hashicorp/react-components/commit/e0dadeed30e0d10290041d0229a726e5cb036b32) Thanks [@dstaley](https://github.com/dstaley)! - Allow caller to override githubFileUrl generation

### Patch Changes

- Updated dependencies [[`22a02a4`](https://github.com/hashicorp/react-components/commit/22a02a47f5dcac983e98f0f3096cf0a785447f7d)]:
  - @hashicorp/react-version-select@0.3.0

## 14.12.0

### Minor Changes

- [#465](https://github.com/hashicorp/react-components/pull/465) [`b19d478`](https://github.com/hashicorp/react-components/commit/b19d47823a4dee52a740469bfc0328ddd0898127) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - move `showVersionSelect` default value

## 14.11.0

### Minor Changes

- [#461](https://github.com/hashicorp/react-components/pull/461) [`4270c8a`](https://github.com/hashicorp/react-components/commit/4270c8a67f73657094efd9efccd24122ba5a9c74) Thanks [@dstaley](https://github.com/dstaley)! - Update to latest version of @hashicorp/platform-markdown-utils

### Patch Changes

- Updated dependencies [[`03d83a6`](https://github.com/hashicorp/react-components/commit/03d83a6552cb3120320ddb51d85a7bdb2121d286), [`e545db4`](https://github.com/hashicorp/react-components/commit/e545db419eb93597e576256c079ef971291f4786)]:
  - @hashicorp/react-search@6.3.1
  - @hashicorp/react-content@8.1.0

## 14.10.0

### Minor Changes

- [#453](https://github.com/hashicorp/react-components/pull/453) [`eabad4b`](https://github.com/hashicorp/react-components/commit/eabad4bbbd1b1164d2d83c4bb2b9b56d6be5aaf3) Thanks [@zchsh](https://github.com/zchsh)! - Exposes new, optional localPartialsDir option for the filesystem loader.

## 14.9.0

### Minor Changes

- [#447](https://github.com/hashicorp/react-components/pull/447) [`68ab860`](https://github.com/hashicorp/react-components/commit/68ab860ae59f6df3b81a57eee953f6c33af3a75b) Thanks [@dstaley](https://github.com/dstaley)! - Hide UI elements that aren't useful when printing

### Patch Changes

- Updated dependencies [[`68ab860`](https://github.com/hashicorp/react-components/commit/68ab860ae59f6df3b81a57eee953f6c33af3a75b)]:
  - @hashicorp/react-search@6.3.0

## 14.8.1

### Patch Changes

- [#441](https://github.com/hashicorp/react-components/pull/441) [`f795232`](https://github.com/hashicorp/react-components/commit/f79523298b6d0b7e57d31219c6300538c1fb7b97) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Fix displayValue

## 14.8.0

### Minor Changes

- [#437](https://github.com/hashicorp/react-components/pull/437) [`4feba18`](https://github.com/hashicorp/react-components/commit/4feba18a84c3cd7916faba01fc47891b4c98418c) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Refactor internal data loader code. Pass `scope` option to MDX renderer

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
