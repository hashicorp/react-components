import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BgColor from '../../components/bg-color'
import Alert from '../../../packages/alert'
import docsPageMdx from './alert-docs.mdx'
import { Products as HashiProduct } from '@hashicorp/platform-product-meta'

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    tag: 'New',
    text: 'Terraform Collaboration for Everyone',
    url: 'https://www.hashicorp.com',
    product: 'terraform',
    textColor: 'dark',
  },
  argTypes: {
    state: {
      options: ['none', 'success', 'warning', 'error'],
    },
  },
  parameters: {
    docs: {
      page: docsPageMdx,
    },
  },
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => {
  return <Alert {...args} />
}

/* Basic Example */
export const Basic = Template.bind({})
Basic.decorators = [
  (Story, { args }) => (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <BgColor color={args.textColor === 'dark' ? 'white' : 'black'} />
      <div style={{ position: 'relative' }}>{Story()}</div>
    </div>
  ),
]

/* States */
export const States: ComponentStory<typeof Alert> = (args) => {
  const textColors = ['dark', 'light']
  const states = ['success', 'warning', 'error']
  return (
    <>
      {textColors.map((textColor) => {
        return (
          <div style={{ position: 'relative', padding: '1rem' }}>
            <BgColor color={textColor === 'dark' ? 'white' : 'black'} />
            {states.map((state) => {
              return (
                <div style={{ position: 'relative' }}>
                  <Alert
                    {...args}
                    textColor={textColor as 'dark' | 'light'}
                    state={state as 'success' | 'warning' | 'error'}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
States.argTypes = {
  products: { table: { disable: true } },
  state: { table: { disable: true } },
  textColor: { table: { disable: true } },
}

/* Product Colors */
export const Products: ComponentStory<typeof Alert> = (args) => {
  const textColors = ['dark', 'light']
  const products = [
    'hashicorp',
    'packer',
    'vagrant',
    'terraform',
    'consul',
    'boundary',
    'vault',
    'nomad',
    'waypoint',
  ]
  return (
    <>
      {textColors.map((textColor) => {
        return (
          <div style={{ position: 'relative', padding: '1rem' }}>
            <BgColor color={textColor === 'dark' ? 'white' : 'black'} />
            {products.map((product) => {
              return (
                <div style={{ position: 'relative' }}>
                  <Alert
                    {...args}
                    textColor={textColor as 'dark' | 'light'}
                    product={product as HashiProduct}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
Products.argTypes = {
  products: { table: { disable: true } },
  state: { table: { disable: true } },
  textColor: { table: { disable: true } },
}
