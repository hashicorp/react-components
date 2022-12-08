# @hashicorp/react-consent-manager

## 8.2.1

### Patch Changes

- [#824](https://github.com/hashicorp/react-components/pull/824) [`fb827df3`](https://github.com/hashicorp/react-components/commit/fb827df377a04e47ae094b86eb88e97caae7e94c) Thanks [@pbortnick](https://github.com/pbortnick)! - fix: check preferences before setting global var

## 8.2.0

### Minor Changes

- [#795](https://github.com/hashicorp/react-components/pull/795) [`72f90d73`](https://github.com/hashicorp/react-components/commit/72f90d739cfd4387a2e524bc83fc187f9f7753c4) Thanks [@pbortnick](https://github.com/pbortnick)! - update: set cookie preferences global variable

## 8.1.0

### Minor Changes

- [#729](https://github.com/hashicorp/react-components/pull/729) [`13a6f0d5`](https://github.com/hashicorp/react-components/commit/13a6f0d5110c245d09188bcb998c19ea03565d3d) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - stack actions on mobile

## 8.0.1

### Patch Changes

- [#672](https://github.com/hashicorp/react-components/pull/672) [`4f9ec2db`](https://github.com/hashicorp/react-components/commit/4f9ec2dba23e8d1caedb63daa897220eb34ca76f) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - Fix heading color

## 8.0.0

### Major Changes

- [#658](https://github.com/hashicorp/react-components/pull/658) [`e0f753db`](https://github.com/hashicorp/react-components/commit/e0f753dbd942baff0fcee77918a003e4d2dbc2f5) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - Adds logic to loadAll preferences if the user is within the US
  - Consumers will need to implement `edge-utils` `setGeoCookie` to detect users within the US

## 7.5.0

### Minor Changes

- [#590](https://github.com/hashicorp/react-components/pull/590) [`77ee90aa`](https://github.com/hashicorp/react-components/commit/77ee90aab1b582ef1daffd075eb6cce8a13686e1) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - Reskin dialog component

## 7.4.1

### Patch Changes

- Updated dependencies [[`f942b5d2`](https://github.com/hashicorp/react-components/commit/f942b5d291c50cbdafe0e3c49319235ba87c1497)]:
  - @hashicorp/react-toggle@5.0.0

## 7.4.0

### Minor Changes

- [#629](https://github.com/hashicorp/react-components/pull/629) [`f969489c`](https://github.com/hashicorp/react-components/commit/f969489c704bc36fcf37ab12db19624bca73e642) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - expose saveAndLoadAnalytics function

* [#637](https://github.com/hashicorp/react-components/pull/637) [`04aa6541`](https://github.com/hashicorp/react-components/commit/04aa6541578aee4da36cf02876512dd2a7eea4af) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - Fetch integrations directly from Segment

### Patch Changes

- [#635](https://github.com/hashicorp/react-components/pull/635) [`a4391931`](https://github.com/hashicorp/react-components/commit/a4391931102eb03d95943d9ec30cd10709215067) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - Remove events and object-assign dependencies

## 7.3.0

### Minor Changes

- [#616](https://github.com/hashicorp/react-components/pull/616) [`231d6bac`](https://github.com/hashicorp/react-components/commit/231d6bacb380e1ea1ec2f6156a70b8b296dc635c) Thanks [@EnMod](https://github.com/EnMod)! - Adds default cookie policy link

## 7.2.0

### Minor Changes

- [#545](https://github.com/hashicorp/react-components/pull/545) [`94fe63fb`](https://github.com/hashicorp/react-components/commit/94fe63fb50bc6ee5067ccebf2cbec3da70b2a27f) Thanks [@alexcarpenter](https://github.com/alexcarpenter)! - feat(ConsentManager): add event callback options

## 7.1.3

### Patch Changes

- [#521](https://github.com/hashicorp/react-components/pull/521) [`cbcf167c`](https://github.com/hashicorp/react-components/commit/cbcf167cec21da83482c13effac2e44c6d2a54eb) Thanks [@rayelder](https://github.com/rayelder)! - Adjust accept button border radius

- Updated dependencies [[`cb0a3eaf`](https://github.com/hashicorp/react-components/commit/cb0a3eaf8fe9be30dc72b1b3e87ad6ed2e2e2b07)]:
  - @hashicorp/react-button@6.2.0

## 7.1.2

### Patch Changes

- [#514](https://github.com/hashicorp/react-components/pull/514) [`072f32c9`](https://github.com/hashicorp/react-components/commit/072f32c9b5473ec5282973d9746bcf350a0cd966) Thanks [@zchsh](https://github.com/zchsh)! - Adds missing events dependency to avoid webpack > 5 errors.

## 7.1.1

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

- Updated dependencies [[`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e)]:
  - @hashicorp/react-button@6.0.4

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
