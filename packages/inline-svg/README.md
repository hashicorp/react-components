# InlineSvg

The `<InlineSvg>` component renders an `<svg>` from a given string.

```jsx
<InlineSvg
  src={`<svg width="300" height="200">
    <rect width="100%" height="100%" fill="#000000" />
    <circle cx="150" cy="100" r="80" fill="#1563ff" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="#ffffff">SVG</text>
  </svg>`}
/>
```

## Installation

```sh
npm install @hashicorp/react-inline-svg
```

## Props

<table>
  <thead>
    <tr>
      <th align=left>Name
      <th align=left>Description
      <th align=center>Type
      <th align=center>Required
  </thead>
  <tbody>
    <tr>
      <td align=left><code>src</code>
      <td align=left>SVG string to render.
      <td align=center>HTML
      <td align=center>✓
  </tbody>
</table>
