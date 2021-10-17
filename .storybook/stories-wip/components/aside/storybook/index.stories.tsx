import React from 'react'
import BgColor from '../../../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Aside from '../../../../../packages/aside'

export default {
  title: 'Components/Aside',
  component: Aside,
  args: {
    children: <p>Hello world! I am an Aside component.</p>,
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ position: 'relative' }}>
        <BgColor color={args.theme === 'dark' ? 'black' : 'white'} />
        <div style={{ position: 'relative', padding: '1rem' }}>{Story()}</div>
      </div>
    ),
  ],
} as ComponentMeta<typeof Aside>

const Template: ComponentStory<typeof Aside> = (args) => {
  return <Aside {...args} />
}

export const Info = Template.bind({})
Info.args = {}

export const Success = Template.bind({})
Success.args = { type: 'success' }

export const Warning = Template.bind({})
Warning.args = { type: 'warning' }

export const Danger = Template.bind({})
Danger.args = { type: 'danger' }
