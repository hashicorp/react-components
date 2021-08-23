import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductFeaturesList from '../../../packages/product-features-list'
import fixtures from './product-features-list-fixtures'

export default {
  title: 'Components/ProductFeaturesList',
  component: ProductFeaturesList,
} as ComponentMeta<typeof ProductFeaturesList>

const Template: ComponentStory<typeof ProductFeaturesList> = (args) => {
  return <ProductFeaturesList {...args} />
}

export const Basic = Template.bind({})
Basic.args = fixtures.Basic
