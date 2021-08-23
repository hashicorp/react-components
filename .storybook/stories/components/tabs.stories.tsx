import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tabs from '../../../packages/tabs'
import fixtures from './tabs-fixtures'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {
  return <Tabs {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
