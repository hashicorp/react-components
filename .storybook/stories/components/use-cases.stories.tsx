import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import UseCases from '../../../packages/use-cases'
import fixtures from './use-cases-fixtures'

export default {
  title: 'Components/UseCases',
  component: UseCases,
} as ComponentMeta<typeof UseCases>

const Template: ComponentStory<typeof UseCases> = (args) => {
  return <UseCases {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
