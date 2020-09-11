# Callouts

Display a set of items, each with a title, description, option links, and an optional icon.

## Notes on Props

- `items.icon` - Can be given an SVG string, or used as a render prop, which will be passed `{ theme, brand }`. Whatever it renders, it shouldn't exceed `96px` square in size. If it does, there's no guarantee this component will display it in a nice way.
- `items.content` - Can be given a string of content, or used as a render prop, which will be passed `{ theme, brand }`. Whatever it renders, it wil likely be constrained to a container only a few hundred pixels wide.
