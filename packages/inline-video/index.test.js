/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import InlineVideo from '.'

const defaultProps = {
  url: 'https://youtu.be/nJ0aI6sEDRo',
  description:
    'Description - 2 lines with character limit of 90. Tempus in egestas sagittis nulla feugiat',
}

describe('<InlineVideo />', () => {
  it('renders the provided description text', () => {
    render(<InlineVideo {...defaultProps} />)
    const element = screen.getByText(defaultProps.description)
    expect(element).toBeInTheDocument()
  })
})
