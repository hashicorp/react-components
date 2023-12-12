# @hashicorp/react-code-block

## 6.5.0

### Minor Changes

- [#1007](https://github.com/hashicorp/react-components/pull/1007) [`e49d8f65`](https://github.com/hashicorp/react-components/commit/e49d8f65f6f7403ef73e250568fa202effadc2b6) Thanks [@dstaley](https://github.com/dstaley)! - Use next/image instead of react-inline-svg

## 6.4.0

### Minor Changes

- [#991](https://github.com/hashicorp/react-components/pull/991) [`534b6517`](https://github.com/hashicorp/react-components/commit/534b6517b4fcb76b3450c329b9c9e3c76236fe6a) Thanks [@zchsh](https://github.com/zchsh)! - Implements support for code wrapping, through an options.wrapCode boolean property.

## 6.3.0

### Minor Changes

- [#942](https://github.com/hashicorp/react-components/pull/942) [`8d1faaa5`](https://github.com/hashicorp/react-components/commit/8d1faaa5841edc4c3a02f02d5c7127c4dc6e7f6e) Thanks [@dstaley](https://github.com/dstaley)! - Use a native select element instead of @reach/listbox

## 6.2.2

### Patch Changes

- [#834](https://github.com/hashicorp/react-components/pull/834) [`3d138a8e`](https://github.com/hashicorp/react-components/commit/3d138a8efa43c1a14e3180205fc8f2b162ef3c64) Thanks [@BRKalow](https://github.com/BRKalow)! - Only render HiddenCopyContent on the client to avoid hydration mismatches and duplicative markup

## 6.2.1

### Patch Changes

- [#768](https://github.com/hashicorp/react-components/pull/768) [`95c749ef`](https://github.com/hashicorp/react-components/commit/95c749effc8d9eb17251e65f3d29db866b109121) Thanks [@zchsh](https://github.com/zchsh)! - Fixes issue where code-tabs in MDX would render blocks with a language-undefined className, even if the className was in fact defined.

## 6.2.0

### Minor Changes

- [#736](https://github.com/hashicorp/react-components/pull/736) [`702eb92a`](https://github.com/hashicorp/react-components/commit/702eb92ac35758fbdddabe9042b3a07c9d470a5b) Thanks [@zchsh](https://github.com/zchsh)! - Support copy-button copying of shell-session snippets with multiple single-line commands. Support select-copy-paste copying of shell-session snippets by setting user-select none on shell-symbols.

## 6.1.1

### Patch Changes

- [#735](https://github.com/hashicorp/react-components/pull/735) [`0aa2389a`](https://github.com/hashicorp/react-components/commit/0aa2389a98fa9ab004a855a81decbefc4014f022) Thanks [@zchsh](https://github.com/zchsh)! - Fixes an issue where code-block would throw an error and potentially break the consuming app if local storage is disabled.

## 6.1.0

### Minor Changes

- [#695](https://github.com/hashicorp/react-components/pull/695) [`61b1ccb2`](https://github.com/hashicorp/react-components/commit/61b1ccb204144907e9e7785312414dae753a3a73) Thanks [@dstaley](https://github.com/dstaley)! - Update dependencies

## 6.0.1

### Patch Changes

- [#612](https://github.com/hashicorp/react-components/pull/612) [`baacf69c`](https://github.com/hashicorp/react-components/commit/baacf69c24a9a52669d39ab9aa8d96087b854e11) Thanks [@zchsh](https://github.com/zchsh)! - Fixes alignment of code-tabs dropdown when no heading is present

## 6.0.0

### Major Changes

- [#604](https://github.com/hashicorp/react-components/pull/604) [`a22f756f`](https://github.com/hashicorp/react-components/commit/a22f756fb4d202e173b530475857f7b285b390f8) Thanks [@ashleemboyer](https://github.com/ashleemboyer)! - Moves the invocation of `onCopyCallback` to after the copy button has been clicked, and only invokes the callback if `copiedState` is `true` or `false`.

### Patch Changes

- [#605](https://github.com/hashicorp/react-components/pull/605) [`c171ca8c`](https://github.com/hashicorp/react-components/commit/c171ca8cfc15076332b5ccce2cde5dccff02ac62) Thanks [@ashleemboyer](https://github.com/ashleemboyer)! - Fixing an issue where the copy button totally lost focus on `copiedState` change.

## 5.2.0

### Minor Changes

- [#547](https://github.com/hashicorp/react-components/pull/547) [`51d6ea42`](https://github.com/hashicorp/react-components/commit/51d6ea42633194083fbcc192f7580f2d38c6a109) Thanks [@ashleemboyer](https://github.com/ashleemboyer)! - Updated style and icons in CodeBlock copy button

## 5.1.1

### Patch Changes

- [#600](https://github.com/hashicorp/react-components/pull/600) [`8261ebcd`](https://github.com/hashicorp/react-components/commit/8261ebcd4059d3899cd4c67263c58ef6f785ed0a) Thanks [@zchsh](https://github.com/zchsh)! - Fixes an issue where use-overflow-ref did not work fully when code-tabs are nested in a tabpanel.

## 5.1.0

### Minor Changes

- [#591](https://github.com/hashicorp/react-components/pull/591) [`9fa3bdab`](https://github.com/hashicorp/react-components/commit/9fa3bdab34d4f719cf73307f3adb0ff414e35f65) Thanks [@zchsh](https://github.com/zchsh)! - Adds support for an onCopyCallback prop.

## 5.0.0

### Major Changes

- [#568](https://github.com/hashicorp/react-components/pull/568) [`26918b9e`](https://github.com/hashicorp/react-components/commit/26918b9e32b3d4882bb18786f09eaa63c178bbc6) Thanks [@dstaley](https://github.com/dstaley)! - Add TypeScript types

## 4.5.0

### Minor Changes

- [#532](https://github.com/hashicorp/react-components/pull/532) [`fb69b94d`](https://github.com/hashicorp/react-components/commit/fb69b94d205f4f264a66648888495a5401a17e0f) Thanks [@zchsh](https://github.com/zchsh)! - Changes alignment of CodeTabs tab elements from right-aligned to left-aligned. Note that if the heading prop is used, then tab elements remained right-aligned, matching previous behaviour. This release also fixes a bug in CodeTabs, where valid CodeBlock children would sometimes be incorrectly flagged as invalid.

## 4.4.2

### Patch Changes

- [#503](https://github.com/hashicorp/react-components/pull/503) [`ce0ddaf`](https://github.com/hashicorp/react-components/commit/ce0ddafd0555d133a48531aefd1e614432d2d593) Thanks [@zchsh](https://github.com/zchsh)! - Fixes a Firefox-specific issue where manually selected and then copied code does not contain the newlines it should.

## 4.4.1

### Patch Changes

- [#498](https://github.com/hashicorp/react-components/pull/498) [`e60fa8f`](https://github.com/hashicorp/react-components/commit/e60fa8f437a98f97f6c0ed396f194192cf5e376e) Thanks [@BRKalow](https://github.com/BRKalow)! - Bumps underlying dependencies.

## 4.4.0

### Minor Changes

- [#447](https://github.com/hashicorp/react-components/pull/447) [`68ab860`](https://github.com/hashicorp/react-components/commit/68ab860ae59f6df3b81a57eee953f6c33af3a75b) Thanks [@dstaley](https://github.com/dstaley)! - Hide UI elements that aren't useful when printing

## 4.3.0

### Minor Changes

- [#435](https://github.com/hashicorp/react-components/pull/435) [`e8d741e`](https://github.com/hashicorp/react-components/commit/e8d741eb4d599af4d77a086cc4041754db35790e) Thanks [@BRKalow](https://github.com/BRKalow)! - Update CodeTabs to identify nodes rendered through MDX v2

## 4.2.0

### Minor Changes

- [#433](https://github.com/hashicorp/react-components/pull/433) [`2275ef9`](https://github.com/hashicorp/react-components/commit/2275ef92f7cf2b00d413c465bafde636ea7fb9fa) Thanks [@BRKalow](https://github.com/BRKalow)! - Update CodeBlock checks to support MDX v2 output
