import React from 'react'
import BgColor from '../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FeaturedSlider from '../../../packages/featured-slider'
import fixtures from './featured-slider-fixtures'

export default {
  title: 'Components/FeaturedSlider',
  component: FeaturedSlider,
  decorators: [
    (Story, { args }) => (
      <div style={{ position: 'relative' }}>
        <BgColor color={args.theme === 'dark' ? 'black' : 'white'} />
        <div style={{ position: 'relative' }}>{Story()}</div>
      </div>
    ),
  ],
} as ComponentMeta<typeof FeaturedSlider>

const Template: ComponentStory<typeof FeaturedSlider> = (args) => {
  return <FeaturedSlider {...args} />
}

export const LightTheme = Template.bind({})
LightTheme.args = fixtures.LightTheme

export const DarkTheme = Template.bind({})
DarkTheme.args = fixtures.DarkTheme

export const SingleLight = Template.bind({})
SingleLight.args = {
  ...fixtures.LightTheme,
  features: [fixtures.LightTheme.features[0]],
}

export const SingleDark = Template.bind({})
SingleDark.args = {
  ...fixtures.DarkTheme,
  features: [fixtures.DarkTheme.features[1]],
}
