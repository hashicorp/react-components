const Basic = {
  heading: 'Sample Tabbed Accordion',
  tabs: [
    {
      heading: 'My First Tab',
      items: [
        { heading: 'My Accordion Item', content: 'Example Content' },
        { heading: 'Another Accordion Item', content: 'Example Content' },
      ],
    },
    {
      heading: 'Another Tab',
      items: [
        { heading: 'Item One', content: 'Example Content' },
        {
          heading: 'Item Two',
          content: 'Example Content with <strong>markup</strong>',
        },
      ],
    },
  ],
}

export default { Basic }
