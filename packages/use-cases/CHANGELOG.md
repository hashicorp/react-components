# @hashicorp/react-use-cases

## 6.0.0

### Major Changes

- [#522](https://github.com/hashicorp/react-components/pull/522) [`e8f8da9a`](https://github.com/hashicorp/react-components/commit/e8f8da9a4bfd63ff79201b122541621efe1bdf90) Thanks [@jmfury](https://github.com/jmfury)! - ## The breaking change

  This change removes the fragmentSpec definition and its corresponding GraphQL fragment from <UseCases /> component. <UseCases /> will no longer be applicable for use within `rivet-graphql`'s `dependencies` option.

  Any code making use of this fragment must be updated as the result will otherwise be a GraphQL request error given the fields will now be missing.

## 5.0.0

### Major Changes

- [#315](https://github.com/hashicorp/react-components/pull/315) [`fcbb786`](https://github.com/hashicorp/react-components/commit/fcbb786bc55e37ee5742e0dd3fc8e08a895cff4e) Thanks [@zchsh](https://github.com/zchsh)! - - 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-use-cases/style.css` imports.
  - To support overrides in projects, consumers can use the `className` prop.
    - For example, consumers can pass `className="g-use-cases` to retain existing overrides.
