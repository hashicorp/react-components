import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TabbedAccordion from '../../../packages/tabbed-accordion'
import fixtures from './tabbed-accordion-fixtures'

export default {
  title: 'Components/TabbedAccordion',
  component: TabbedAccordion,
} as ComponentMeta<typeof TabbedAccordion>

const Template: ComponentStory<typeof TabbedAccordion> = (args) => {
  return <TabbedAccordion {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
