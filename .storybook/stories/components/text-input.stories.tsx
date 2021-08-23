import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextInput from '../../../packages/text-input'
import fixtures from './text-input-fixtures'

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => {
  return <TextInput {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
