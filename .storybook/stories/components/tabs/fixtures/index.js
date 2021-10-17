import { Tab } from '../../../../../packages/tabs'

function ExampleContent({ children }) {
  return (
    <p
      style={{
        minHeight: '110vh',
        margin: 0,
        border: '1px solid rgba(127, 127, 127, 0.3)',
        padding: '1rem',
      }}
    >
      {children}
    </p>
  )
}

const Basic = {
  children: [
    <Tab heading="First Tab">
      <ExampleContent>First tab content</ExampleContent>
    </Tab>,
    <Tab heading="Second Tab">
      <ExampleContent>Second tab content</ExampleContent>
    </Tab>,
    <Tab heading="Third Tab">
      <ExampleContent>Third tab content</ExampleContent>
    </Tab>,
  ],
}

const ManyTabs = {
  children: [
    <Tab heading="First Tab">
      <ExampleContent>First tab content</ExampleContent>
    </Tab>,
    <Tab heading="Second tab with long name">
      <ExampleContent>Second tab content</ExampleContent>
    </Tab>,
    <Tab heading="Third long name tab">
      <ExampleContent>Third tab content</ExampleContent>
    </Tab>,
    <Tab heading="Fourth tab lots of tabs">
      <ExampleContent>Fourth tab content</ExampleContent>
    </Tab>,
    <Tab heading="Fifth tab">
      <ExampleContent>Fifth tab content</ExampleContent>
    </Tab>,
    <Tab heading="Sixth tab">
      <ExampleContent>Sixth tab content</ExampleContent>
    </Tab>,
  ],
}

const ManyTabsWithTooltips = {
  children: [
    <Tab heading="First Tab">
      <ExampleContent>First tab content</ExampleContent>
    </Tab>,
    <Tab
      heading="Second tab with long name"
      tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ex et nulla aliquam placerat. Phasellus euismod posuere porttitor. Praesent quis mollis nibh, eget imperdiet velit. Nunc pulvinar ultrices metus quis dapibus."
    >
      <ExampleContent>Second tab content</ExampleContent>
    </Tab>,
    <Tab heading="Third long name tab">
      <ExampleContent>Third tab content</ExampleContent>
    </Tab>,
    <Tab
      heading="Fourth tab lots of tabs"
      tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ex et nulla aliquam placerat. Phasellus euismod posuere porttitor. Praesent quis mollis nibh, eget imperdiet velit. Nunc pulvinar ultrices metus quis dapibus."
    >
      <ExampleContent>Fourth tab content</ExampleContent>
    </Tab>,
    <Tab heading="Fifth tab">
      <ExampleContent>Fifth tab content</ExampleContent>
    </Tab>,
    <Tab
      heading="Sixth tab"
      tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ex et nulla aliquam placerat. Phasellus euismod posuere porttitor. Praesent quis mollis nibh, eget imperdiet velit. Nunc pulvinar ultrices metus quis dapibus."
    >
      <ExampleContent>Sixth tab content</ExampleContent>
    </Tab>,
  ],
}

export default { Basic, ManyTabs, ManyTabsWithTooltips }
