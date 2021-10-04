import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Min100Layout from '../../../../packages/min-100-layout'

export default {
  title: 'Components/Min100Layout',
  component: Min100Layout,
} as ComponentMeta<typeof Min100Layout>

const Template: ComponentStory<typeof Min100Layout> = (args) => {
  return <Min100Layout {...args} />
}

/* Basic Example */
export const ShortContent = Template.bind({})
ShortContent.args = {
  children: (
    <div style={{ border: '1px solid red' }}>
      Hello world! I am the page content, passed as <code>children</code> to
      Min100Layout. I should include all parts of the page except the footer,
      such as the main navigation bar, alert banners, and so on. Min100Layout
      accepts multiple children, so all these elements can be included as
      separate children - they do not need to wrapped in a single element. There
      should not be any visible content rendered above me, or this layout will
      break. I can also include fixed and absolutely positioned elements.
      <br />
      <br />I don't have to be as tall as the whole page, the footer will still
      be at least at the bottom of the page.
    </div>
  ),
  footer: (
    <div style={{ border: '1px solid blue' }}>
      This is the footer. It goes at the bottom, regardless of page content
      height.
    </div>
  ),
}

export const LongContent = Template.bind({})
LongContent.args = {
  children: (
    <div style={{ border: '1px solid red', height: '130vh' }}>
      Hello world! I am the page content, passed as <code>children</code> to
      Min100Layout. I should include all parts of the page except the footer,
      such as the main navigation bar, alert banners, and so on. Min100Layout
      accepts multiple children, so all these elements can be included as
      separate children - they do not need to wrapped in a single element. There
      should not be any visible content rendered above me, or this layout will
      break. I can also include fixed and absolutely positioned elements.
      <br />
      <br />
      When I am larger than the viewport height, as in this example where I have
      a set height of <code>120vh</code>, the footer should act more or less
      like regular flow content, and will be pushed farther down the page. This
      is because it the footer is not absolutely positioned at the bottom of the
      page. Instead, the footer and body containers have a parent with{' '}
      <code>display: flex</code> set, and the footer has{' '}
      <code>margin-top: auto</code> set.
    </div>
  ),
  footer: (
    <div style={{ border: '1px solid blue' }}>
      This is the footer. It goes at the bottom, regardless of page content
      height.
    </div>
  ),
}
