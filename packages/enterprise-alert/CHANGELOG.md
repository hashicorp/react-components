# @hashicorp/react-enterprise-alert

## 7.0.1

### Patch Changes

- [#881](https://github.com/hashicorp/react-components/pull/881) [`406fa0c9`](https://github.com/hashicorp/react-components/commit/406fa0c9e6e075878078788dd8e0539e52f7512e) Thanks [@BRKalow](https://github.com/BRKalow)! - Fix EnterpriseAlert so that it does not potentially generate invalid markup when used inline

## 7.0.0

### Major Changes

- [#568](https://github.com/hashicorp/react-components/pull/568) [`26918b9e`](https://github.com/hashicorp/react-components/commit/26918b9e32b3d4882bb18786f09eaa63c178bbc6) Thanks [@dstaley](https://github.com/dstaley)! - Add TypeScript types

## 6.0.1

### Patch Changes

- [#330](https://github.com/hashicorp/react-components/pull/330) [`44a0e60`](https://github.com/hashicorp/react-components/commit/44a0e60b577a36978275ef1b0efa0e351a9802c6) Thanks [@zchsh](https://github.com/zchsh)! - Removes package-lock.json

## 6.0.0

### Major Changes

- [#307](https://github.com/hashicorp/react-components/pull/307) [`4d62eb1`](https://github.com/hashicorp/react-components/commit/4d62eb1f7ab33ccd404e8b04daeda291616e47c3) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-enterprise-alert/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-enterprise-alert` to retain existing overrides.
