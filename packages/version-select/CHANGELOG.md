# @hashicorp/react-version-select

## 0.3.0

### Minor Changes

- [#468](https://github.com/hashicorp/react-components/pull/468) [`22a02a4`](https://github.com/hashicorp/react-components/commit/22a02a47f5dcac983e98f0f3096cf0a785447f7d) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Update `version-select` to handle multipart basePath's, such as `sentinel/intro`

## 0.2.2

### Patch Changes

- [#368](https://github.com/hashicorp/react-components/pull/368) [`4e65bce`](https://github.com/hashicorp/react-components/commit/4e65bcef5e570f8634e14d46439a5e50bc84796f) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Fix a bug where navigating from v0.4.x to v0.3.x would splice the path incorrectly

## 0.2.1

### Patch Changes

- [#359](https://github.com/hashicorp/react-components/pull/359) [`e34aeea`](https://github.com/hashicorp/react-components/commit/e34aeeafc1eab1b5ec39a75425b3bd9a207a8bfa) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Fixed a bug with `version-select` where navigating to a latest version, while on the latest version caused the site to be pushed to "/latest", which is unintended.

  Also added minor improvements to not call Next.js router `push` when selecting a version that is the same as the current version.

  Added test coverage.

## 0.2.0

### Minor Changes

- [#342](https://github.com/hashicorp/react-components/pull/342) [`348434e`](https://github.com/hashicorp/react-components/commit/348434ee9490944626f77291082f8130c00a607a) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - feat(version-select): added `removeVersionFromPath` util
  feat(react-docs-page): use new VersionSelect; add test coverage; expose extra prop

## 0.1.0

### Minor Changes

- [#331](https://github.com/hashicorp/react-components/pull/331) [`344038e`](https://github.com/hashicorp/react-components/commit/344038ebbd38f659d15395b72fb52555f8cb6e39) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Added new `VersionSelect` component
