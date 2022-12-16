import { render, screen } from '@testing-library/react'
import { NewsroomCard } from '.'

const defaultProps = {
  link: 'https://hashicorp.com',
  heading: 'Example heading',
  date: 'August 15, 2022',
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<NewsroomCard />', () => {
  it('should render the provided metadata correctly', () => {
    const expectedMeta = [defaultProps.date]

    render(<NewsroomCard {...defaultProps} />)

    const metaElement = screen.getByTestId('wpl-card-meta')

    expectedMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })

    expect(metaElement).not.toContainElement(screen.queryByText('|'))
  })
})
