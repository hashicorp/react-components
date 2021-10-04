import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextInput from '../../../packages/text-input'
import BgColor from '../../components/bg-color'

function ControlDecorator(Story, { args }) {
  const [value, setValue] = useState(args.field?.value)

  const { background } = args.theme || {}

  return (
    <>
      <BgColor
        color={
          background === 'brand'
            ? 'var(--brand)'
            : background === 'dark'
            ? 'var(--black)'
            : 'var(--white)'
        }
      />
      <div style={{ position: 'relative', padding: '1rem' }}>
        <Story
          args={{
            ...args,
            field: {
              name: args.field?.name,
              value: value,
              onChange: (e) => setValue(e.target.value),
            },
          }}
        />
      </div>
    </>
  )
}

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => {
  return <TextInput {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  field: { name: 'example_field', value: 'test' },
  form: { errors: {}, touched: {} },
}
Basic.decorators = [ControlDecorator]

export const WithError = Template.bind({})
WithError.args = {
  field: { name: 'example_field', value: 'test' },
  form: {
    errors: { example_field: "You can't make this error go away." },
    touched: { example_field: true },
  },
}
WithError.decorators = [ControlDecorator]

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  theme: { background: 'dark' },
  field: { name: 'example_field', value: 'test' },
  form: { errors: {}, touched: {} },
}
DarkTheme.decorators = [ControlDecorator]

export const DarkWithError = Template.bind({})
DarkWithError.args = {
  theme: { background: 'dark' },
  field: { name: 'example_field', value: 'test' },
  form: {
    errors: { example_field: "You can't make this error go away." },
    touched: { example_field: true },
  },
}
DarkWithError.decorators = [ControlDecorator]

export const BrandTheme = Template.bind({})
BrandTheme.args = {
  theme: { background: 'brand' },
  field: { name: 'example_field', value: 'test' },
  form: { errors: {}, touched: {} },
}
BrandTheme.decorators = [ControlDecorator]

export const BrandWithError = Template.bind({})
BrandWithError.args = {
  theme: { background: 'brand' },
  field: { name: 'example_field', value: 'test' },
  form: {
    errors: { example_field: "You can't make this error go away." },
    touched: { example_field: true },
  },
}
BrandWithError.decorators = [ControlDecorator]
