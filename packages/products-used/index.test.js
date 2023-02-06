/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import ProductsUsed from '.'

describe('<ProductsUsed />', () => {
  it('should render the name of the product', () => {
    const productName = 'waypoint'
    const products = [
      {
        name: productName,
      },
    ]
    render(<ProductsUsed products={products} />)
    const productEl = screen.getByText(productName)
    expect(productEl).toBeInTheDocument()
  })

  it('should render an anchor element if an href is provided', () => {
    const productName = 'waypoint'
    const href = 'https://www.hashicorp.com/'
    const products = [
      {
        name: productName,
        href: href,
      },
    ]
    render(<ProductsUsed products={products} />)
    expect(screen.getByTestId('anchorEl')).toBeVisible()
  })

  it('should render dark class if appearance is set to `dark`', () => {
    const productName = 'waypoint'
    const products = [
      {
        name: productName,
      },
    ]
    render(<ProductsUsed products={products} appearance={'dark'} />)
    expect(screen.getByTestId('root')).toHaveClass('dark')
  })
})
