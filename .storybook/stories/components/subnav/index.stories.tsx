import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Subnav from '../../../../packages/subnav'
import s from './style.module.css'
import DecoratorSurroundingContent from './decorator-surrounding-content'
import fixtures from './fixtures'

export default {
  title: 'Components/Subnav',
  component: Subnav,
  argTypes: {
    theme: {
      options: ['dark', 'light'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Subnav>

const Template: ComponentStory<typeof Subnav> = (args) => {
  return <Subnav {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic

export const CloudHashicorp = Template.bind({})
CloudHashicorp.args = {
  ...fixtures.CloudHashicorp,
  className: s.cloudSubnav,
  theme: 'dark',
}

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

export const WithSurroundingContent = Template.bind({})
WithSurroundingContent.args = fixtures.WithProductLogo
WithSurroundingContent.decorators = [DecoratorSurroundingContent]

export const DarkTheme = Template.bind({})
DarkTheme.args = { ...fixtures.WithProductLogo, theme: 'dark' }
DarkTheme.decorators = [DecoratorSurroundingContent]
