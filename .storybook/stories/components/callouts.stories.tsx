import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Callouts from '../../../packages/callouts'
import fixtures from './callouts-fixtures'

export default {
  title: 'Components/Callouts',
  component: Callouts,
} as ComponentMeta<typeof Callouts>

const Template: ComponentStory<typeof Callouts> = (args) => {
  return <Callouts {...args} />
}

export const TwoUp = Template.bind({})
TwoUp.args = fixtures.TwoUp

export const TwoUpPlainIcons = Template.bind({})
TwoUpPlainIcons.args = fixtures.TwoUpPlainIcons

export const ThreeUp = Template.bind({})
ThreeUp.args = fixtures.ThreeUp

export const ThreeUpWithHeading = Template.bind({})
ThreeUpWithHeading.args = fixtures.ThreeUpWithHeading

export const ThreeUpDarkIcons = Template.bind({})
ThreeUpDarkIcons.args = fixtures.ThreeUpDarkIcons

export const ThreeUpDarkText = Template.bind({})
ThreeUpDarkText.args = fixtures.ThreeUpDarkText

export const FourUp = Template.bind({})
FourUp.args = fixtures.FourUp

export const SixUp = Template.bind({})
SixUp.args = fixtures.SixUp

export const WithCustomContent = Template.bind({})
WithCustomContent.args = fixtures.WithCustomContent
