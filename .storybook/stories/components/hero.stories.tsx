import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Hero from '../../../packages/hero'
import fixtures from './hero-fixtures'

export default {
  title: 'Components/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => {
  return <Hero {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
