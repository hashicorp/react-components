import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FeaturedSlider from '../../../packages/featured-slider'
import fixtures from './featured-slider-fixtures'

export default {
  title: 'Components/FeaturedSlider',
  component: FeaturedSlider,
} as ComponentMeta<typeof FeaturedSlider>

const Template: ComponentStory<typeof FeaturedSlider> = (args) => {
  return <FeaturedSlider {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
