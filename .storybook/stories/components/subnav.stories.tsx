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
