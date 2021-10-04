import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Toggle from '../../../packages/toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>

const Template: ComponentStory<typeof Toggle> = (args) => {
  return <Toggle {...args} />
}

export const Basic = Template.bind({})
export const Enabled = Template.bind({})
Enabled.args = { enabled: true }
