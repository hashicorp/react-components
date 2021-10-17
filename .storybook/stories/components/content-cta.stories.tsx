import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ContentCta from '../../../packages/content-cta'

export default {
  title: 'Components/ContentCta',
  component: ContentCta,
  args: {
    product: 'terraform',
    heading: 'My Custom Heading',
    content:
      'Compare Terraform Cloud and Terraform Enterprise features to find the best fit for your organization.',
    links: [
      {
        title: 'Compare Features',
        url: 'example.com',
      },
      {
        title: 'Contact Sales',
        url: 'example.com',
      },
    ],
  },
} as ComponentMeta<typeof ContentCta>

const Template: ComponentStory<typeof ContentCta> = (args) => {
  return <ContentCta {...args} />
}

export const Basic = Template.bind({})

export const ContentRenderProp = Template.bind({})
ContentRenderProp.args = {
  heading: 'With Content Render Prop',
  content: () => (
    <p className="g-type-body">
      Custom content text. This is an <a href="example.com">example link</a>.
      Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit.
    </p>
  ),
}
