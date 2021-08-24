import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Subnav from '../../../packages/subnav'
import fixtures from './subnav-fixtures'

export default {
  title: 'Components/Subnav',
  component: Subnav,
} as ComponentMeta<typeof Subnav>

const Template: ComponentStory<typeof Subnav> = (args) => {
  return <Subnav {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic

export const WithProductLogo = Template.bind({})
WithProductLogo.args = fixtures.WithProductLogo

export const AlignRight = Template.bind({})
AlignRight.args = fixtures.AlignRight

export const WithFailingStarCount = Template.bind({})
WithFailingStarCount.args = fixtures.WithFailingStarCount

export const WithHiddenStarCount = Template.bind({})
WithHiddenStarCount.args = fixtures.WithHiddenStarCount

export const WithTitle = Template.bind({})
WithTitle.args = fixtures.WithTitle
