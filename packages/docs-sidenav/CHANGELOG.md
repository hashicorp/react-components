# @hashicorp/react-docs-sidenav

## 9.0.0

### Major Changes

- [#576](https://github.com/hashicorp/react-components/pull/576) [`36f924ae`](https://github.com/hashicorp/react-components/commit/36f924aec763c0dc8c206602ef197194b77d7ff2) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - - convert `docs-sidenav` to typescript
  - update `docs-page` internal code and narrow prop type

## 8.4.1

### Patch Changes

- [#427](https://github.com/hashicorp/react-components/pull/427) [`203e96d`](https://github.com/hashicorp/react-components/commit/203e96db848856973f9a1eadedb834b5ff3836d7) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Add missing `key` prop in `docs-sidenav` - `NavTree`

## 8.4.0

### Minor Changes

- [#358](https://github.com/hashicorp/react-components/pull/358) [`ef6333f`](https://github.com/hashicorp/react-components/commit/ef6333fb7276a636daab9fe5d6d1289d2945169d) Thanks [@zchsh](https://github.com/zchsh)! - Support empty paths for index pages.

## 8.3.1

### Patch Changes

- [#379](https://github.com/hashicorp/react-components/pull/379) [`9274b62`](https://github.com/hashicorp/react-components/commit/9274b625692cf4fccef4cc31f7aeba188d21bd13) Thanks [@jescalan](https://github.com/jescalan)! - fix a small bug with validation for heading nodes

## 8.3.0

### Minor Changes

- [#336](https://github.com/hashicorp/react-components/pull/336) [`9b190b0`](https://github.com/hashicorp/react-components/commit/9b190b0b13beb1045825ee2b1eb560b84215c265) Thanks [@jescalan](https://github.com/jescalan)! - Add "headline" option which can be used to inject a headline at any point in the navigation

## 8.2.5

### Patch Changes

- [#298](https://github.com/hashicorp/react-components/pull/298) [`4c3e3d1`](https://github.com/hashicorp/react-components/commit/4c3e3d1efdba091f1a38b69b209f581e814f0e57) Thanks [@zchsh](https://github.com/zchsh)! - Converts Search to CSS modules, and makes tweaks in consuming components to account for related changes.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-search/style.css` imports.
    - For `.hit-content`, consumers will need to import `@hashicorp/react-search/hit-content-styles.module.css`, and use `s.root` on their `renderHitContent` container.
