---
'@hashicorp/react-use-cases': major
---

## The breaking change

This change removes the fragmentSpec definition and its corresponding GraphQL fragment from <UseCases /> component. <UseCases /> will no longer be applicable for use within `rivet-graphql`'s `dependencies` option.

Any code making use of this fragment must be updated as the result will otherwise be a GraphQL request error given the fields will now be missing.
