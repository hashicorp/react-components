import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import DecoratorSurroundingContent from './decorator-surrounding-content'
import Tabs from '../../../../packages/tabs'
import fixtures from './fixtures'
import styles from './style.module.css'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    centered: false,
    fullWidthBorder: false,
    defaultTabIdx: 0,
    className: '',
  },
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
    onChange: {
      control: {
        type: null,
      },
    },
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {
  return <Tabs {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic

export const Centered = Template.bind({})
Centered.args = { ...fixtures.Basic, centered: true }

export const FullWidth = Template.bind({})
FullWidth.args = { ...fixtures.Basic, fullWidthBorder: true }

export const FullWidthCentered = Template.bind({})
FullWidthCentered.args = {
  ...fixtures.Basic,
  centered: true,
  fullWidthBorder: true,
}

export const ManyTabs = Template.bind({})
ManyTabs.args = fixtures.ManyTabs

export const ManyTabsWithTooltips = Template.bind({})
ManyTabsWithTooltips.args = fixtures.ManyTabsWithTooltips

export const ManyTabsCentered = Template.bind({})
ManyTabsCentered.args = { ...fixtures.ManyTabsWithTooltips, centered: true }

const withPageContentsArgs = {
  ...fixtures.ManyTabsWithTooltips,
  fullWidthBorder: true,
  className: styles.stickyTabsRoot,
  classNameTabBar: styles.stickyTabsBar,
}
export const WithPageContents = Template.bind({})
WithPageContents.args = withPageContentsArgs
WithPageContents.decorators = [DecoratorSurroundingContent]

export const DarkTheme = Template.bind({})
DarkTheme.args = { ...withPageContentsArgs, theme: 'dark' }
DarkTheme.decorators = [DecoratorSurroundingContent]
