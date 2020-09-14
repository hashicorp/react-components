# Alert

The `<Alert>` component renders a small alert banner with a link. It is often used to redirect users to a new release or announcement.

```jsx
<Alert
  url="#"
  tag="Introducing Terraform Cloud"
  tagColor="terraform-purple"
  text="Terraform Collaboration for Everyone"
  textColor="dark"
/>
```

## Installation

```sh
npm install @hashicorp/react-alert
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
      <td align=left><code>url</code>
      <td align=left>URL that the alert points to
      <td align=center>Text
      <td align=center>✓
    <tr>
      <td align=left><code>tag</code>
      <td align=left>Label or summary of the main alert message
      <td align=center>Text
      <td align=center>✓
    <tr>
      <td align=left><code>text</code>
      <td align=left>Primary message of the alert
      <td align=center>Text
      <td align=center>✓
    <tr>
      <td align=left><code>tagColor</code>
      <td align=left>Background color of the tag
      <td align=center>Text
      <td align=center>
    <tr>
      <td align=left><code>textColor</code>
      <td align=left>Background color of the text
      <td align=center>Text
      <td align=center>
  </tbody>
</table>
