# @hashicorp/react-search

## 6.0.0

### Major Changes

- [#298](https://github.com/hashicorp/react-components/pull/298) [`4c3e3d1`](https://github.com/hashicorp/react-components/commit/4c3e3d1efdba091f1a38b69b209f581e814f0e57) Thanks [@zchsh](https://github.com/zchsh)! - Converts Search to CSS modules, and makes tweaks in consuming components to account for related changes.

  - 💥✨ BREAKING CHANGE: Refactored to CSS modules.
    - Consumers will need to remove any `@hashicorp/react-search/style.css` imports.
    - For `.hit-content`, consumers will need to import `@hashicorp/react-search/hit-content-styles.module.css`, and use `s.root` on their `renderHitContent` container.
