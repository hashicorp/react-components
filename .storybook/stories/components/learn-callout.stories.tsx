import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LearnCallout from '../../../packages/learn-callout'
import fixtures from './learn-callout-fixtures'

export default {
  title: 'Components/LearnCallout',
  component: LearnCallout,
} as ComponentMeta<typeof LearnCallout>

const Template: ComponentStory<typeof LearnCallout> = (args) => {
  return <LearnCallout {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
