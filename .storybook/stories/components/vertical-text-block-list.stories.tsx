import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import VerticalTextBlockList from '../../../packages/vertical-text-block-list'
import fixtures from './vertical-text-block-list-fixtures'

export default {
  title: 'Components/VerticalTextBlockList',
  component: VerticalTextBlockList,
} as ComponentMeta<typeof VerticalTextBlockList>

const Template: ComponentStory<typeof VerticalTextBlockList> = (args) => {
  return <VerticalTextBlockList {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
