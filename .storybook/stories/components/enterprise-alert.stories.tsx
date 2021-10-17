import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import EnterpriseAlert from '../../../packages/enterprise-alert'
import fixtures from './enterprise-alert-fixtures'

export default {
  title: 'Components/EnterpriseAlert',
  component: EnterpriseAlert,
} as ComponentMeta<typeof EnterpriseAlert>

const Template: ComponentStory<typeof EnterpriseAlert> = (args) => {
  return <EnterpriseAlert {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  product: 'terraform',
}

export const Inline = Template.bind({})
Inline.args = {
  product: 'consul',
  inline: true,
}

export const CustomContent = Template.bind({})
CustomContent.args = {
  children: 'Custom message content',
}
