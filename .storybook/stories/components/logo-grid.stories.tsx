import React from 'react'
import BgColor from '../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LogoGrid from '../../../packages/logo-grid'
import fixtures from './logo-grid-fixtures'

export default {
  title: 'Components/LogoGrid',
  component: LogoGrid,
  args: {
    color: 'color',
    size: 'small',
    details: false,
    removeBorders: false,
    integrationLink: false,
    hashUrl: false,
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ position: 'relative' }}>
        <BgColor color={args.color === 'white' ? 'black' : 'white'} />
        <div style={{ position: 'relative' }}>{Story()}</div>
      </div>
    ),
  ],
} as ComponentMeta<typeof LogoGrid>

const Template: ComponentStory<typeof LogoGrid> = (args) => {
  return <LogoGrid {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic

export const NoDetails = Template.bind({})
NoDetails.args = { ...fixtures.Basic, details: false }

export const DarkTheme = Template.bind({})
DarkTheme.args = { ...fixtures.Basic, color: 'white' }
