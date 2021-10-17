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

export const AsLinks = Template.bind({})
AsLinks.args = { ...fixtures.Basic, linkStyle: 'links' }

export const WithCustomContent = Template.bind({})
WithCustomContent.args = fixtures.WithCustomContent

export const WithCheckboxes = Template.bind({})
WithCheckboxes.args = fixtures.WithCheckboxes

export const DarkTheme = Template.bind({})
DarkTheme.args = fixtures.DarkTheme

export const GrayTheme = Template.bind({})
GrayTheme.args = fixtures.GrayTheme
