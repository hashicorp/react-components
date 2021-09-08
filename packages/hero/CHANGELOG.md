# @hashicorp/react-hero

## 8.0.0

### Major Changes

- [#299](https://github.com/hashicorp/react-components/pull/299) [`bc36b72`](https://github.com/hashicorp/react-components/commit/bc36b72a74068eeea59359e23d3955fa48043684) Thanks [@zchsh](https://github.com/zchsh)! - - 💥 BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-hero/style.css` imports.
  - ✨ To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-hero` to retain existing overrides.
  - ✨ Hides `progress-bar` from Percy using `@media only percy`
    - This avoids the need for reach-in styles in consuming projects
    - Consumers who targeted the `.has-videos` class can remove related styles

### Patch Changes

- Updated dependencies [[`bc36b72`](https://github.com/hashicorp/react-components/commit/bc36b72a74068eeea59359e23d3955fa48043684), [`19744c9`](https://github.com/hashicorp/react-components/commit/19744c9638aa4db1ba98abff284538aede5b1326)]:
  - @hashicorp/react-text-input@5.0.0

## 7.3.6

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
