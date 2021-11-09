# @hashicorp/react-consent-manager

## 7.1.0

### Minor Changes

- [#414](https://github.com/hashicorp/react-components/pull/414) [`68e0d7f`](https://github.com/hashicorp/react-components/commit/68e0d7ffa02653c74ba38e50485528b4df310d03) Thanks [@BRKalow](https://github.com/BRKalow)! - Refactor ConsentManager to use next/script under the hood and add support for a strategy attribute for each service to leverage `next/script`'s underlying loading strategies.

## 7.0.3

### Patch Changes

- [#407](https://github.com/hashicorp/react-components/pull/407) [`7674ae9`](https://github.com/hashicorp/react-components/commit/7674ae9432a4bbc93fde9302c8408f8f76605eb8) Thanks [@mwickett](https://github.com/mwickett)! - Change cookie expiry to six months (183 days)

## 7.0.2

### Patch Changes

- [#406](https://github.com/hashicorp/react-components/pull/406) [`605ae1a`](https://github.com/hashicorp/react-components/commit/605ae1a3179855cf861b1bd86c7b7c9414761d3f) Thanks [@zchsh](https://github.com/zchsh)! - Hide in print media.

## 7.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

- Updated dependencies [[`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6)]:
  - @hashicorp/react-toggle@4.0.1

## 7.0.0

### Major Changes

- [#305](https://github.com/hashicorp/react-components/pull/305) [`740f35b`](https://github.com/hashicorp/react-components/commit/740f35b2888c9cd0a2068408350e2e7efaa0ed32) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-consent-manager/style.css` imports.
  - Note: we've added CSS to hide `consent-manager` from Percy by default
    - This is achieved by an `@media only percy` rule on the root element
    - We've added support for a `className` to allow this behavior to be overridden as needed

### Patch Changes

- Updated dependencies [[`15f0689`](https://github.com/hashicorp/react-components/commit/15f068946720d4c10ce5385683da18e8ade0088c)]:
  - @hashicorp/react-toggle@4.0.0

## 6.0.3

### Patch Changes

- Updated dependencies [[`b0fd753`](https://github.com/hashicorp/react-components/commit/b0fd753d7f9e5c4649424139712d4d2c5ec5ffd9)]:
  - @hashicorp/react-button@6.0.0
