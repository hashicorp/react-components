import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CheckboxInput from '../../../packages/checkbox-input'
import BgColor from '../../components/bg-color'

function ControlDecorator(Story, { args }) {
  const [isChecked, setIsChecked] = useState(
    args.field?.value || args.field?.checked
  )
  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <Story
        args={{
          ...args,
          field: {
            name: 'example_checkbox',
            value: isChecked,
            checked: isChecked,
            onChange: () => setIsChecked(!isChecked),
          },
        }}
      />
    </div>
  )
}

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
  args: {
    label: 'This is an example checkbox',
    field: {
      name: 'example_checkbox',
      value: false,
      checked: false,
      onChange: () => null,
    },
    form: { errors: {}, touched: {} },
  },
  decorators: [],
} as ComponentMeta<typeof CheckboxInput>

const Template: ComponentStory<typeof CheckboxInput> = (args) => {
  return <CheckboxInput {...args} />
}

export const Basic = Template.bind({})
Basic.decorators = [ControlDecorator]

export const Checked = Template.bind({})
Checked.decorators = [ControlDecorator]
Checked.args = { field: { checked: true } }

export const WithError = Template.bind({})
WithError.decorators = [ControlDecorator]
WithError.args = {
  form: {
    errors: { example_checkbox: 'This is an example error message.' },
    touched: { example_checkbox: true },
  },
}

export const CheckedWithError = Template.bind({})
CheckedWithError.decorators = [ControlDecorator]
CheckedWithError.args = {
  field: { checked: true },
  form: {
    errors: { example_checkbox: 'This is an example error message.' },
    touched: { example_checkbox: true },
  },
}

/* StickerSheet */
export const StickerSheet: ComponentStory<typeof CheckboxInput> = (args) => {
  const backgroundColors = ['light', 'dark', 'brand']
  const argVariants = [
    {},
    { field: { checked: true } },
    {
      form: {
        errors: { example_checkbox: 'This is an example error message.' },
        touched: { example_checkbox: true },
      },
    },
    {
      field: { checked: true },
      form: {
        errors: { example_checkbox: 'This is an example error message.' },
        touched: { example_checkbox: true },
      },
    },
  ]
  return (
    <>
      {backgroundColors.map((backgroundColor) => {
        return (
          <div style={{ position: 'relative', padding: '1rem' }}>
            <BgColor
              color={
                backgroundColor === 'brand'
                  ? 'var(--vagrant)'
                  : backgroundColor === 'dark'
                  ? 'black'
                  : 'white'
              }
            />
            {argVariants.map((variedArgs, idx) => {
              const [isChecked, setIsChecked] = useState(
                variedArgs.field?.checked
              )
              return (
                <div
                  key={idx}
                  style={{ position: 'relative', margin: '1rem 0' }}
                >
                  <CheckboxInput
                    {...args}
                    {...variedArgs}
                    field={{
                      ...args.field,
                      ...variedArgs.field,
                      value: isChecked,
                      checked: isChecked,
                      onChange: () => setIsChecked(!isChecked),
                    }}
                    theme={{ background: backgroundColor }}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
StickerSheet.argTypes = {
  // products: { table: { disable: true } },
  // state: { table: { disable: true } },
  // textColor: { table: { disable: true } },
}
