import React from 'react'
import ContentCta from '../index.props.js'
import DocsPage from './docs.mdx'
import { withKnobs, text, select } from '@storybook/addon-knobs'

const propsBase = {
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

export const WithKnobs = () => {
  const heading = text('Heading', propsBase.heading)
  const content = text('Content', propsBase.content)
  const product = select(
    'product',
    ['terraform', 'vault', 'consul', 'nomad', 'packer', 'vagrant'],
    propsBase.product
  )
  return (
    <ContentCta
      product={product}
      heading={heading}
      content={content}
      links={[
        {
          title: 'Compare Features',
          url: 'example.com',
        },
        {
          title: 'Contact Sales',
          url: 'example.com',
        },
      ]}
    />
  )
}

WithKnobs.story = {
  decorators: [withKnobs({ escapeHTML: false })],
}

export default {
  title: 'Blocks|Content Cta/With Knobs',
  component: ContentCta,
  parameters: { docs: { page: DocsPage } },
}
