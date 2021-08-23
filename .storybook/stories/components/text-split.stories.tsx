import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextSplit from '../../../packages/text-split'
import fixtures from './text-split-fixtures'

export default {
  title: 'Components/TextSplit',
  component: TextSplit,
} as ComponentMeta<typeof TextSplit>

const Template: ComponentStory<typeof TextSplit> = (args) => {
  return <TextSplit {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
