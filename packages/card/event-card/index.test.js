/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import { EventCard } from '.'

const defaultProps = {
  link: 'https://hashicorp.com',
  title: 'Example title',
  eventDate: 'August 15, 2022',
  eventType: 'Category',
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<EventCard />', () => {
  // Prop tests
  it('should render the provided title prop', () => {
    render(<EventCard {...defaultProps} />)

    const title = screen.getByText(defaultProps.title)
    expect(title.tagName).toBe('H2')
  })

  it('should render the provided eventType and eventDate prop together', () => {
    const eventMeta = [defaultProps.eventDate, defaultProps.eventType]

    render(<EventCard {...defaultProps} />)

    const metaElement = screen.getByTestId('wpl-card-meta')

    eventMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })

    expect(metaElement).toContainElement(screen.getByText('|'))
  })
})
