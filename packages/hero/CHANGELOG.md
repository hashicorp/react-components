# @hashicorp/react-hero

## 8.0.4

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-button@6.0.4
  - @hashicorp/react-image@4.0.4

## 8.0.3

### Patch Changes

- [#335](https://github.com/hashicorp/react-components/pull/335) [`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead) Thanks [@zchsh](https://github.com/zchsh)! - Fix issue where centered prop did not function as expected.

- Updated dependencies [[`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead), [`8012b33`](https://github.com/hashicorp/react-components/commit/8012b33fa39d62b3227b3ad00e4e0cab683ffead)]:
  - @hashicorp/react-alert@6.0.2
  - @hashicorp/react-button@6.0.2

## 8.0.2

### Patch Changes

- [#363](https://github.com/hashicorp/react-components/pull/363) [`375b439`](https://github.com/hashicorp/react-components/commit/375b4394b4bc6fe8e376064f6201e5c6c1cc8e7a) Thanks [@BRKalow](https://github.com/BRKalow)! - Adjust nested alert text color in hero to be the opposite of the backgroundTheme

## 8.0.1

### Patch Changes

- [#345](https://github.com/hashicorp/react-components/pull/345) [`2e4a44a`](https://github.com/hashicorp/react-components/commit/2e4a44a61590fcddf28dd147128d56c058ab4095) Thanks [@BRKalow](https://github.com/BRKalow)! - - Fix tertiary/neutral button to have the expected text color
  - Update hero styles to have dark text when passing `data.backgroundTheme = "light"`
- Updated dependencies [[`2e4a44a`](https://github.com/hashicorp/react-components/commit/2e4a44a61590fcddf28dd147128d56c058ab4095)]:
  - @hashicorp/react-button@6.0.1

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
