import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../../../packages/button'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Button Test',
    url: 'https://www.hashicorp.com',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />
}

export const Basic = Template.bind({})
