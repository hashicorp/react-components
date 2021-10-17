import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SteppedFeatureList from '../../../packages/stepped-feature-list'
import fixtures from './stepped-feature-list-fixtures'

export default {
  title: 'Components/SteppedFeatureList',
  component: SteppedFeatureList,
} as ComponentMeta<typeof SteppedFeatureList>

const Template: ComponentStory<typeof SteppedFeatureList> = (args) => {
  return <SteppedFeatureList {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
