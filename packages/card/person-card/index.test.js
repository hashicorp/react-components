import { render, screen } from '@testing-library/react'
import { PersonCard } from '.'

const defaultProps = {
  link: 'https://hashicorp.com',
  name: 'Example name',
  bio: 'Example bio',
  location: 'Example location',
  meta: ['August 15, 2022', 'Category'],
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<PersonCard />', () => {
  // Prop tests
  it('should render the correct thumbnail based on the provided link prop', () => {
    const links = {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }

    render(
      <>
        {Object.keys(links).map((platform) => (
          <PersonCard key={platform} {...defaultProps} link={links[platform]} />
        ))}
      </>
    )

    Object.keys(links).forEach((platform) => {
      screen.getByTestId(`wpl-personcard-${platform}-icon`)
    })
  })
})
