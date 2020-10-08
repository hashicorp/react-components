# Text Split With Image

Display an image alongside a title, description, and links.

## Note on Props

This component passes its props directly to `<Image />` and `<TextSplit />`:

- `image` is passed to the `<Image />` component. This **must** be an object with at minimum a valid `url`, ie `{ url }`
- `textSplit` is passed to `<TextSplit />`

Please refer to `@hashicorp/react-image` and `@hashicorp/react-text-split` for documentation on `<Image />` and `<TextSplit />` props respectively.
