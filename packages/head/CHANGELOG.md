# @hashicorp/react-head

## 3.3.2

### Patch Changes

- [#754](https://github.com/hashicorp/react-components/pull/754) [`92ad2c5a`](https://github.com/hashicorp/react-components/commit/92ad2c5ac846d4530ca541d09907c2c5c8e80e3a) Thanks [@dstaley](https://github.com/dstaley)! - Specifically import React types

## 3.3.1

### Patch Changes

- [#684](https://github.com/hashicorp/react-components/pull/684) [`4bf0222f`](https://github.com/hashicorp/react-components/commit/4bf0222fbe54bf2aa333611b8514e729bbb87876) Thanks [@BRKalow](https://github.com/BRKalow)! - Only validate the `image` prop if it's passed as the correct type.

## 3.3.0

### Minor Changes

- [#623](https://github.com/hashicorp/react-components/pull/623) [`270c6792`](https://github.com/hashicorp/react-components/commit/270c679293188fc67684caf9e47aaba92727e2d1) Thanks [@zchsh](https://github.com/zchsh)! - Validates that props.image is an absolute URL, and throws an error in development if it is not. As well, adds `twitter:description` when `description` prop is provided.

## 3.2.0

### Minor Changes

- [#520](https://github.com/hashicorp/react-components/pull/520) [`3a6d89e9`](https://github.com/hashicorp/react-components/commit/3a6d89e971976daa2d910c72f6aa6e5353af8b4b) Thanks [@dstaley](https://github.com/dstaley)! - Add new `renderMetaTags` function that renders `<meta />` elements for a given set of DatoCMS SEO attributes.
