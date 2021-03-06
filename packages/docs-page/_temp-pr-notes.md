# Changes to implement MKTG-032

To implement MKTG-032, changes have been made to both the `docs-page` and `doc-sidenav` components.

## Notes on tests

- ran into difficulty testing jump-to-section
- Jest doesn't know what `innerText` is (line 13 of temporary_jump-to-section)
- Replace with `textContent` (?) We did a similar thing for `code-block`: https://app.asana.com/0/1199883977708219/1199877101801285/f ... but in this case we actually don't want to see the "permalink" text 🤔 EDIT: nvm it's fine, we were already using slice() to omit the >> char from the permalink text.

## Common changes

- `subpath` prop renamed to `baseRoute`
- `pagePath` prop replaced by `staticProps.currentPath`
- `order` and `data` (aka `allPageData`) props replaced by `staticProps.navData`

## Changes to DocsPageWrapper

...

## Changes to DocsPage

...

## Changes to DocsSidenav

...
