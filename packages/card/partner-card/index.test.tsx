import { render, screen } from '@testing-library/react'
import { PartnerCard } from '.'

const defaultProps = {
  link: 'https://hashicorp.com',
  description: 'Example description',
  category: 'Example Category',
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<PartnerCard />', () => {
  it('should render the provided metadata correctly', () => {
    const expectedMeta = [defaultProps.category]

    render(<PartnerCard {...defaultProps} />)

    const metaElement = screen.getByTestId('wpl-card-meta')

    expectedMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })

    expect(metaElement).not.toContainElement(screen.queryByText('|'))
  })
})
