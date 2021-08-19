import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Accordion from '../../../packages/accordion'

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>

const Template: ComponentStory<typeof Accordion> = (args) => {
  return <Accordion {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  heading: 'My test accordion heading',
  items: [
    {
      heading: 'My Accordion Item',
      content: 'This is some default text in the collapsible area.',
    },
    {
      heading: 'Another Accordion Item',
      content:
        'This is some text content with some <strong>strong text</strong>',
    },
  ],
}
