import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TabTrigger from '../../../../packages/tabs/partials/tab-trigger'
import DecoratorControl from './decorator-control'

export default {
  title: 'Components/Tabs/partials/TabTrigger',
  component: TabTrigger,
} as ComponentMeta<typeof TabTrigger>

const Template: ComponentStory<typeof TabTrigger> = (args) => {
  return <TabTrigger {...args} />
}

export const Basic = Template.bind({})
Basic.decorators = [DecoratorControl]
Basic.args = {
  tab: {
    index: 0,
    heading: 'Basic tab trigger',
    children: <p>First tab content</p>,
  },
  hasOverflow: false,
}

export const WithTooltip = Template.bind({})
WithTooltip.decorators = [DecoratorControl]
WithTooltip.args = {
  tab: {
    index: 0,
    heading: 'Tab title with tooltip',
    children: <p>First tab content</p>,
    tooltip: 'Example tooltip with decent length.',
  },
  hasOverflow: false,
}

export const WithLongTooltip = Template.bind({})
WithLongTooltip.decorators = [DecoratorControl]
WithLongTooltip.args = {
  tab: {
    index: 0,
    heading: 'Tab title with tooltip',
    children: <p>First tab content</p>,
    tooltip:
      'Example tooltip content where the content length may appear slightly unreasonable to some viewers, especially those who may not be able to easily access the content of tooltips.',
  },
  hasOverflow: false,
}
