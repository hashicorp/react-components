# Changes to implement MKTG-032

To implement MKTG-032, changes have been made to both the `docs-page` and `doc-sidenav` components.

## Common changes

### Renamed props

- `subpath` prop renamed to `baseRoute`
- `pagePath` prop renamed to `currentPath`

### Refactored props

- `order` and `data` props replaced by `staticProps.navData`

## Changes to DocsPageWrapper

- `order` and `allPageData` props replaced by `staticProps.navData`

## Changes to DocsPage

---

## Changes to DocsSidenav

---
