import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CheckboxInput from '../../../packages/checkbox-input'

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
} as ComponentMeta<typeof CheckboxInput>

const Template: ComponentStory<typeof CheckboxInput> = (args) => {
  return <CheckboxInput {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: 'This is an example checkbox',
  field: {
    name: 'example_checkbox',
    value: false,
    checked: false,
    onChange: () => null,
  },
  form: {
    errors: { example_checkbox: 'This is an example error message.' },
    touched: { example_checkbox: true },
  },
}
