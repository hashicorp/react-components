module.exports = {
  defaultTabIdx: {
    type: 'integer',
    description:
      'If set, the tab with the specified ID will be active by default. If not set or if the ID does not match, it will default to 0',
  },
  centered: {
    type: 'boolean',
    description:
      'If true, the tabs are centered in their container, rather than left-aligned',
    control: { type: 'checkbox' },
  },
  fullWidthBorder: {
    type: 'boolean',
    description:
      'If true, the border line underneath the tabs expands to the full width of the container, rather than being slightly padded from the edges',
    control: { type: 'checkbox' },
  },
  onChange: {
    type: 'function',
    description:
      'Optional callback which is executed when a new tab is selected. Passed `(newTabIndex, groupId)`.',
  },
  children: {
    type: 'React.ReactNode',
    description: 'Data to be displayed as tabs',
    required: true,
    properties: {
      heading: { type: 'string', description: 'Title of the tab' },
      tooltip: {
        type: 'string',
        description: 'Optional tooltip to be displayed next to the tab title',
      },
      group: {
        type: 'string',
        description:
          "A unique identifier for a tab 'group' that, when active, all Tabs with this id will become active when one is selected. _Note_ it's necessary to wrap the page with `TabProvider` for this feature to function. ",
      },
    },
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  classNameTabBar: {
    type: 'string',
    description:
      'Optional className to add to the tabs bar container. Useful for sticky positioning.',
  },
}
