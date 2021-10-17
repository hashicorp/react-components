import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Hero from '../../../packages/hero'
import fixtures from './hero-fixtures'
import s from './hero.module.css'

export default {
  title: 'Components/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => {
  return <Hero {...args} />
}

export const DarkTheme = Template.bind({})
DarkTheme.args = fixtures.Basic

export const LightTheme = Template.bind({})
LightTheme.args = {
  ...fixtures.Basic,
  data: {
    ...fixtures.Basic.data,
    backgroundTheme: 'light',
    backgroundImage: null,
  },
}

export const Boundary = Template.bind({})
Boundary.args = { ...fixtures.Boundary, className: s.boundaryBackground }
