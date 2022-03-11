# @hashicorp/react-product-downloads-page

## 2.8.1

### Patch Changes

- [#536](https://github.com/hashicorp/react-components/pull/536) [`d6eba797`](https://github.com/hashicorp/react-components/commit/d6eba7971bbbf7c58cf3cc110f5b7b423e3cd27c) Thanks [@thiskevinwang](https://github.com/thiskevinwang)! - Install `@types/semver`; Fix incorrect `semverValid` usage

## 2.8.0

### Minor Changes

- [#526](https://github.com/hashicorp/react-components/pull/526) [`390ec6d3`](https://github.com/hashicorp/react-components/commit/390ec6d3aa2473a6a5959cdbb2a88225b7f2dd22) Thanks [@zchsh](https://github.com/zchsh)! - Fixes an issue where props that could be optional were required.

## 2.7.2

### Patch Changes

- [#510](https://github.com/hashicorp/react-components/pull/510) [`963d39a`](https://github.com/hashicorp/react-components/commit/963d39ac51d63ff45a8a85ab078c7130502c972d) Thanks [@dstaley](https://github.com/dstaley)! - Adjust human-readable CPU architecture labels

## 2.7.1

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-button@6.0.4
  - @hashicorp/react-tabs@7.1.2

## 2.7.0

### Minor Changes

- [#479](https://github.com/hashicorp/react-components/pull/479) [`460153e`](https://github.com/hashicorp/react-components/commit/460153e6fe92f3c45e1a97710832603bd200d62e) Thanks [@BRKalow](https://github.com/BRKalow)! - Adds fetch retry with delay to releases data fetching.

## 2.6.0

### Minor Changes

- [#474](https://github.com/hashicorp/react-components/pull/474) [`b05a1a5`](https://github.com/hashicorp/react-components/commit/b05a1a5b9cd3e2acd20d0fd784e4f83a69a193f4) Thanks [@jescalan](https://github.com/jescalan)! - change wording on 32 and 64 bit downloads

## 2.5.3

### Patch Changes

- [#439](https://github.com/hashicorp/react-components/pull/439) [`da6398a`](https://github.com/hashicorp/react-components/commit/da6398a83ff33556d34bca71341a237bb579b836) Thanks [@EnMod](https://github.com/EnMod)! - Reduce margin below the download cards partial

## 2.5.2

### Patch Changes

- [#296](https://github.com/hashicorp/react-components/pull/296) [`c6b7a4d`](https://github.com/hashicorp/react-components/commit/c6b7a4dc80319d92f694773517d822f0566b229a) Thanks [@zchsh](https://github.com/zchsh)! - Fixes to account for underlying changes in Tabs

- Updated dependencies [[`c6b7a4d`](https://github.com/hashicorp/react-components/commit/c6b7a4dc80319d92f694773517d822f0566b229a)]:
  - @hashicorp/react-tabs@7.0.0

## 2.5.1

### Patch Changes

- [#288](https://github.com/hashicorp/react-components/pull/288) [`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9) Thanks [@zchsh](https://github.com/zchsh)! - Patches a minor type issue with HashiCorpProduct, which was previously imported from outside the package. Now imports from platform-product-meta.

* [#324](https://github.com/hashicorp/react-components/pull/324) [`1090453`](https://github.com/hashicorp/react-components/commit/1090453fb46efd7da2d3218d8bfb3f0910bcdf9d) Thanks [@jescalan](https://github.com/jescalan)! - dont index enterpriseMode page for search engines

* Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0

## 2.5.0

### Minor Changes

- [#292](https://github.com/hashicorp/react-components/pull/292) [`5a93964`](https://github.com/hashicorp/react-components/commit/5a93964095c3b85c395d654301b4c02044d2ca67) Thanks [@jescalan](https://github.com/jescalan)! - - Add package manager default for `enterpriseMode` flag
  - Add `showPackageManagers` prop, `true` by default, which can be set to `false` to hide package managers
