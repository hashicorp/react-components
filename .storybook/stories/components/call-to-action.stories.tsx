import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CallToAction from '../../../packages/call-to-action'

export default {
  title: 'Components/CallToAction',
  component: CallToAction,
} as ComponentMeta<typeof CallToAction>

const Template: ComponentStory<typeof CallToAction> = (args) => {
  return <CallToAction {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  heading: 'Test Heading',
  content: 'test content',
  links: [
    { text: 'test link', url: '#', type: 'inbound' },
    { text: 'test link', url: '#' },
  ],
  product: 'packer',
  variant: 'centered',
}
