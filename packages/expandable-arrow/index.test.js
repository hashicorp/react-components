/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import ExpandableArrow from '.'

describe('<ExpandableArrow />', () => {
  it('should render', () => {
    render(<ExpandableArrow />)
    const element = screen.getByTestId('expandable-arrow')
    expect(element).toBeInTheDocument()
  })

  it('should render expanded', () => {
    render(<ExpandableArrow expanded={true} />)
    const element = screen.getByTestId('expandable-arrow')
    expect(element).toHaveClass('expanded')
  })
})
