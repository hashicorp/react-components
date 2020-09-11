import React from 'react'
import Callouts from '../index.props.js'
import {
  withKnobs,
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs'
import DocsPage from './docs.mdx'

const CustomIcon = ({ brand, svg }) => {
  return (
    <div
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `var(--${brand && brand != 'hashicorp' ? brand : 'brand'})`
      }}
      dangerouslySetInnerHTML={{
        __html: svg
      }}
    />
  )
}

const propsBase = {
  heading: "Ensure Your Team's Success",
  layout: 'two-up',
  centerHeading: true,
  items: [
    {
      icon: ({ brand }) => (
        <CustomIcon
          brand={brand}
          svg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M2 12H22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        />
      ),
      heading: 'Worldwide Support',
      content:
        'With HashiCorp Worldwide Support, you can get assistance when you need it from anywhere in the world with our ready-to-serve ticketing system and expert support team.',
      link: {
        text: 'Compare Plans',
        url: '#',
        linkType: 'anchor'
      }
    },
    {
      icon: ({ brand }) => (
        <CustomIcon
          brand={brand}
          svg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        />
      ),
      heading: 'Technical Account Management',
      content:
        'From best practice advice to regular cadences and quarterly business reviews, our Technical Account Managers (TAMs) will be your advocate, ensuring your teams are set up for long term success with HashiCorp every step of the way.',
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound'
      }
    },
    {
      icon: ({ brand }) => (
        <CustomIcon
          brand={brand}
          svg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 21H16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17V21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        />
      ),
      heading: 'Implementation Services',
      content:
        'Let highly skilled product domain experts help you achieve success by simplifying and accelerating the adoption of our cloud solutions starting at the implementation phase.',
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound'
      }
    },
    {
      icon: ({ brand }) => (
        <CustomIcon
          brand={brand}
          svg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6V22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        />
      ),
      heading: 'Enterprise Architecture',
      content:
        "Large-scale systems and services can become complex to design and manage. Our Enterprise Architects can lay the foundation for your success through design consultation and architecture review using HashiCorp's recommended patterns.",
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound'
      }
    }
  ]
}

export const WithKnobs = () => {
  const heading = text('Heading', propsBase.heading)
  const subheading = text('Subheading', propsBase.subheading)
  const centerHeading = boolean('Center Headings', propsBase.centerHeading)
  const brand = select(
    'Brand',
    ['hashicorp', 'terraform', 'vault', 'consul', 'nomad', 'packer', 'vagrant'],
    propsBase.theme
  )
  const theme = select('Theme', ['light', 'gray', 'dark'], propsBase.theme)

  const layout = select(
    'Layout',
    ['auto', 'two-up', 'three-up', 'four-up'],
    propsBase.layout
  )
  const itemsCount = number('# Items', propsBase.items.length)
  const items = []
  for (var i = 0; i < itemsCount; i++) {
    const defaultItem = propsBase.items[i] || {}
    const icon = ({ brand }) => (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `var(--${
            brand && brand != 'hashicorp' ? brand : 'brand'
          })`
        }}
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-labelledby="title"
        >
          <title id="title">globe logo</title>
          <path
            clipRule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            stroke={'white'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12h20"
            stroke={'white'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            clipRule="evenodd"
            d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10v0z"
            stroke={'white'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
    const heading = defaultItem.heading || propsBase.items[0].heading // text(`${itemKey} Heading`, defaultItem.heading)
    const content = defaultItem.content || propsBase.items[0].content // text(`${itemKey} Content`, defaultItem.content)
    const link = { text: 'Learn More', linkType: 'inbound', url: '#' }
    items.push({ icon, heading, content, link })
  }
  return (
    <Callouts
      heading={heading}
      subheading={subheading}
      centerHeading={centerHeading}
      items={items}
      layout={layout}
      theme={theme}
      brand={brand}
    />
  )
}
WithKnobs.story = {
  decorators: [withKnobs({ escapeHTML: false })]
}

export default {
  title: 'Blocks|Callouts',
  component: Callouts,
  parameters: { docs: { page: DocsPage } }
}
