import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Callouts from '../../../packages/callouts'

export default {
  title: 'Components/Callouts',
  component: Callouts,
} as ComponentMeta<typeof Callouts>

const Template: ComponentStory<typeof Callouts> = (args) => {
  return <Callouts {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  heading: 'Example Main Heading',
  layout: 'two-up',
  items: [
    {
      heading: 'Example Item Heading',
      content: 'Sed posuere consectetur est at lobortis.',
    },
    {
      heading: 'Example Item Heading 2',
      content: 'Sed posuere consectetur est at lobortis.',
    },
  ],
}
