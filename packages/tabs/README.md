# Tabs

Tabs will render arbitrary tabbed content based on `Tab` items passed as children.

### Example Usage

```jsx
<Tabs>
  <Tab heading="First Tab">
    <p>First tab content</p>
  </Tab>
  <Tab heading="Second Tab">
    <p>Second tab content</p>
  </Tab>
  <Tab heading="Third Tab">
    <p>Third tab content</p>
  </Tab>
</Tabs>
```

### Component Props

### `Tabs`

| Name            | Type            | Description                                                                                                                               | Required |
| --------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| children        | React.ReactNode | `Tab` components to render.                                                                                                               | true     |
| defaultTabIdx   | number          | If set, the tab with the specified ID will be active by default. If not set or if the ID does not match, it will default to 0             | false    |
| centered        | boolean         | If true, the tabs are centered in their container, rather than left-aligned                                                               | false    |
| fullWidthBorder | boolean         | If true, the border line underneath the tabs expands to the full width of the container, rather than being slightly padded from the edges | false    |

### `Tab`

| Name     | Type            | Description                                                                                                                                                                                                     | Required |
| -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| heading  | string          | Title of the tab                                                                                                                                                                                                | true     |
| tooltip  | string          | Optional tooltip to be displayed next to the tab title                                                                                                                                                          | false    |
| group    | string          | A unique identifier for a tab 'group' that, when active, all Tabs with this id will become active when one is selected. _Note_ it's necessary to wrap the page with `TabProvider` for this feature to function. | false    |
| children | React.ReactNode | Content that should render when the associated tab is active.                                                                                                                                                   | false    |
