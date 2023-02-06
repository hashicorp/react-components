/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import { CareerCard } from '.'

const defaultProps = {
  link: 'https://hashicorp.com',
  heading: 'Example heading',
  workplaceType: 'Remote',
  location: 'Example Location',
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<CareerCard />', () => {
  it('should render the provided metadata correctly', () => {
    const expectedMeta = [defaultProps.workplaceType]

    render(<CareerCard {...defaultProps} />)

    const metaElement = screen.getByTestId('wpl-card-meta')

    expectedMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })

    expect(metaElement).not.toContainElement(screen.queryByText('|'))
  })
})
