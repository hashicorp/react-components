/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen } from '@testing-library/react'
import NextSteps from '.'

const heading = 'Next steps'
const description =
  'Cras ullamcorper duis nunc velit commodo etiam. Auctor tincidunt pellentesque ullamcorper nisi integer.'
const steps = [
  {
    heading: 'Step 1',
    cta: {
      title: 'Step 1 link',
      url: '/step-1',
    },
  },
  {
    heading: 'Step 2',
    cta: {
      title: 'Step 2 link',
      url: '/step-2',
    },
  },
]
const cta = {
  copy: 'Ready to speak with our sales team?',
  href: 'https://www.hashicorp.com',
  ctaText: 'Contact us',
}

describe('<NextSteps />', () => {
  it('should render next steps', () => {
    render(
      <NextSteps heading={heading} description={description} steps={steps} />
    )

    const element = screen.getByTestId('next-steps')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent(heading)
    expect(element).toHaveTextContent(description)
    expect(screen.getByText(steps[0].heading).closest('a')).toHaveAttribute(
      'href',
      steps[0].cta.url
    )
    expect(screen.getByText(steps[1].heading).closest('a')).toHaveAttribute(
      'href',
      steps[1].cta.url
    )
  })

  it('should render provided cta', () => {
    render(
      <NextSteps
        heading={heading}
        description={description}
        cta={cta}
        steps={steps}
      />
    )

    expect(screen.getByText(cta.ctaText).closest('a')).toHaveAttribute(
      'href',
      cta.href
    )
  })

  it('should render provided theme', () => {
    render(
      <NextSteps
        theme="nomad"
        heading={heading}
        description={description}
        steps={steps}
      />
    )

    const element = screen.getByTestId('next-steps')
    expect(element).toHaveClass('nomad')
  })

  it('should render dark appearance', () => {
    render(
      <NextSteps
        appearance="dark"
        heading={heading}
        description={description}
        steps={steps}
      />
    )

    const element = screen.getByTestId('next-steps')
    expect(element).toHaveClass('dark')
  })
})
