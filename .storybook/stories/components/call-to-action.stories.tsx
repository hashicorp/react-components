import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CallToAction from '../../../packages/call-to-action'

export default {
  title: 'Components/CallToAction',
  component: CallToAction,
  args: {
    heading: 'Ready to get started?',
    content:
      'Get critical workloads running in the cloud faster with fewer resources in order to meet today‘s challenges.',
    links: [
      {
        text: 'Get Started',
        url:
          'https://portal.cloud.hashicorp.com/sign-up?utm_source=cloud_landing&utm_content=footer',
      },
      {
        text: 'Explore HCP on HashiCorp Learn',
        url:
          'https://learn.hashicorp.com/cloud?utm_source=cloud_landing&utm_content=footer',
        type: 'outbound',
      },
    ],
    product: 'packer',
  },
} as ComponentMeta<typeof CallToAction>

const Template: ComponentStory<typeof CallToAction> = (args) => {
  return <CallToAction {...args} />
}

export const Centered = Template.bind({})
Centered.args = { variant: 'centered' }

export const Compact = Template.bind({})
Compact.args = { variant: 'compact' }

export const Links = Template.bind({})
Links.args = { variant: 'links' }
