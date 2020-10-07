# Vertical Text Block List

Vertical list of blocks of text (with optional images) with links.

### Props

- `data` - (arr) - Array of objects from the CMS, object props below
  - `logo` _[optional]_ - overrides header text if present
    - `url` - URL of logo to display
    - `alt` - alt text for image
  - `header` - [markdown] header text to display on the left of an item
  - `body` - [markdown] body text that is displayed to the right
  - `linkUrl` - _[optional]_ - If provided, links the entire 'card' to this URL
- `centerText` _[optional]_ (boolean) - sets text alignment to centered on mobile view if true (defaults to left-aligned)
- `Link` _[optional]_ (component) - if using nextjs, you can pass the `Link` component and it will be used for rendering links
