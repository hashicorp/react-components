import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SectionHeader from '../../../packages/section-header'

export default {
  title: 'Components/SectionHeader',
  component: SectionHeader,
} as ComponentMeta<typeof SectionHeader>

const Template: ComponentStory<typeof SectionHeader> = (args) => {
  return <SectionHeader {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  headline: 'Headline',
  description:
    'Maecenas sed <strong>diam eget</strong> risus varius blandit sit amet non magna.',
}
