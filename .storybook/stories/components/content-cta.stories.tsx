import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ContentCta from '../../../packages/content-cta'

export default {
  title: 'Components/ContentCta',
  component: ContentCta,
} as ComponentMeta<typeof ContentCta>

const Template: ComponentStory<typeof ContentCta> = (args) => {
  return <ContentCta {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
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
}
