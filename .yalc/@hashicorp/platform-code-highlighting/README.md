# Code Highlighting

This folder contains code highlighting utilities and styles.

## `highlightString()`

`prism/highlight-string` is a utility function to highlight plain strings of code directly. It accepts:

- `code`, a plain text string of code
- `language`, a string, any of the [`refractor` syntax options](https://github.com/wooorm/refractor#syntaxes) are supported.

This function returns a `Promise` that resolves to a **string of HTML**, highlighted using our `rehypePrism` plugin.

## `highlightData()`

`prism/highlight-data` is a utility function to highlight `{ code, language }` structures in an object. It accepts:

- `data`, an object

It traverses the `data` object, and looks for any nodes that match the `{ code, language }` structure. The requirements for a matching structure are:

- `code` must be a plain string of code.
- `language` must be either a [`refractor` syntax option](https://github.com/wooorm/refractor#syntaxes), or an object `{ slug }` where `slug` is a [`refractor` syntax option](https://github.com/wooorm/refractor#syntaxes).

As it traverses the `data` object, `highlightData` modifies the `code` property of these matching structures, transforming it into a **string of HTML** highlighted using `highlightString()`. Note that the `data` object is not modified in place, it is closed to avoid mutating the original object.

This function returns a `Promise` that resolves to the modified `data` object.

_Note: we have [rough plans to run a Dato migration such that our `codeblock_language` model will just be a string](https://app.asana.com/0/1100423001970639/1199552303963347/f), rather than a `{ name, slug }` object. Once we've made this change, we plan on modifying the `highlightData` function to reduce variability in the matching `{ code, language }` data structures._

## Test Fixtures

`/prism/fixtures` contains test fixtures used for both `highlight-string` and `highlight-data`. We want to be able to manage the `input` and expected `output` of each fixture in individual files, since the input and output is very whitespace-heavy. `fixtures/_read-file` is a small utility that helps with this management.

All other `.js` files in the `fixtures` folder export `{ input, output }` objects which can be pulled into tests.

## Styles

`/prism/style.css` is our current source of truth for global `pre`, `code`, and `.token` highlighting styles. It needs to be imported into your project's global stylesheet in order for highlighted code and the `@hashicorp/react-code-block` component to render correctly:

For example, in `pages/style.css` you might do something like:

```css
@import '~@hashicorp/platform-code-highlighting/style.css';
```

_Note: we have rough plans to move this CSS out of `nextjs-scripts` at some point in the future, likely soon after we have completed the transition to CSS modules._
