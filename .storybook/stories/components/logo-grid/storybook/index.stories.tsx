import React from 'react'
import BgColor from '../../../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LogoGrid from '../../../../../packages/logo-grid'
import fixtures from '../fixtures'

export default {
  title: 'Components/LogoGrid',
  component: LogoGrid,
  args: {
    color: 'color',
    size: 'small',
    details: false,
    removeBorders: false,
    integrationLink: false,
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

export const LightTheme = Template.bind({})
LightTheme.args = fixtures.Basic

export const DarkTheme = Template.bind({})
DarkTheme.args = { ...fixtures.Basic, color: 'white' }

export const MonochromeTheme = Template.bind({})
MonochromeTheme.args = { ...fixtures.Basic, color: 'monochrome' }

export const NoDetails = Template.bind({})
NoDetails.args = { ...fixtures.Basic, details: false }

export const Linked = Template.bind({})
Linked.args = { ...fixtures.Basic, integrationLink: true, details: false }

export const LogoAspectTest = Template.bind({})
LogoAspectTest.args = fixtures.LogoAspectTest
