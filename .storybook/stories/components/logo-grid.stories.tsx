import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LogoGrid from '../../../packages/logo-grid'
import fixtures from './logo-grid-fixtures'

export default {
  title: 'Components/LogoGrid',
  component: LogoGrid,
} as ComponentMeta<typeof LogoGrid>

const Template: ComponentStory<typeof LogoGrid> = (args) => {
  return <LogoGrid {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
