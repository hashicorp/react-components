import React from 'react'
import BgColor from '../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CaseStudySlider from '../../../packages/case-study-slider'
import fixtures from './case-study-slider-fixtures'

export default {
  title: 'Components/CaseStudySlider',
  component: CaseStudySlider,
  decorators: [
    (Story, { args }) => (
      <div style={{ position: 'relative' }}>
        <BgColor color={args.dark ? 'black' : 'white'} />
        <div style={{ position: 'relative' }}>{Story()}</div>
      </div>
    ),
  ],
} as ComponentMeta<typeof CaseStudySlider>

const Template: ComponentStory<typeof CaseStudySlider> = (args) => {
  return <CaseStudySlider {...args} />
}

export const LightTheme = Template.bind({})
LightTheme.args = fixtures.TwoUp

export const DarkTheme = Template.bind({})
DarkTheme.args = { ...fixtures.TwoUp, dark: true }

export const SingleLight = Template.bind({})
SingleLight.args = {
  ...fixtures.TwoUp,
  data: {
    caseStudies: [fixtures.TwoUp.data.caseStudies[1]],
  },
}

export const SingleDark = Template.bind({})
SingleDark.args = {
  ...fixtures.TwoUp,
  dark: true,
  data: {
    caseStudies: [fixtures.TwoUp.data.caseStudies[1]],
  },
}

export const ThreeUp = Template.bind({})
ThreeUp.args = fixtures.ThreeUp

export const ThreeUpDark = Template.bind({})
ThreeUpDark.args = { ...fixtures.ThreeUp, dark: true }
