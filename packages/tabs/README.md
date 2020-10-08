# Tabs

Tabs will render arbitrary tabbed content based on `items` passed in as an array

### Example Usage

```jsx
<Tabs
  items={[
    {
      heading: 'First tab',
      tabChildren: () => <YourJSXElement />,
    },
    {
      heading: 'Second tab with a custom tooltip',
      tooltip: 'This is tooltip text',
      tabChildren: () => <YourJSXElement />,
    },
    {
      heading: 'Third tab, no children rendered',
      tabChildren: () => null,
    },
  ]}
/>
```

### Component Props

| Name    | Description                                                                  | Required |
| ------- | ---------------------------------------------------------------------------- | -------- |
| items\* | arrayOf { heading: _string_ , tabChildren: _function_ , tooltip?: _string_ } | true     |
