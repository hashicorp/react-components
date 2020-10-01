import React from 'react'
import ContentCta from '../index.props.js'
import DocsPage from './docs.mdx'

export const Basic = () => (
  <ContentCta
    product="terraform"
    heading="My Custom Heading"
    content="Compare Terraform Cloud and Terraform Enterprise features to find the best fit for your organization."
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

export const ContentRenderProp = () => (
  <ContentCta
    product="terraform"
    heading="With Content Render Prop"
    content={() => (
      <p className="g-type-body">
        Custom content text. This is an <a href="example.com">example link</a>.
        Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id
        elit.
      </p>
    )}
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

export default {
  title: 'Blocks|Content Cta/Examples',
  component: ContentCta,
  parameters: { docs: { page: DocsPage } },
}
