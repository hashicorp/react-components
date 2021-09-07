import { render } from '@testing-library/react'
import FeaturedSlider from './'

const propsBase = {
  heading: 'Use Cases',
  theme: 'dark',
  product: 'nomad',
  features: [
    {
      logo: {
        url: 'https://www.datocms-assets.com/2885/1582161366-deluxe-logo.svg',
        alt: 'Deluxe',
      },
      image: {
        url:
          'https://www.nomadproject.io/_next/static/images/deluxe-4e1ac6e68d5d4f30f3c3ed20cf03f308.png?fit=crop&fm=webp&h=843.75&q=80&w=1500',
        alt: 'Deluxe Case Study',
      },
      heading: 'Deluxe',
      content:
        'Disrupt the traditional media supply chain with a digital platform powered by Nomad, Consul and Vault.',
      link: {
        text: 'Learn More',
        url:
          'https://www.hashicorp.com/resources/deluxe-hashistack-video-production',
        type: 'outbound',
      },
    },
    {
      logo: {
        url: 'https://www.datocms-assets.com/2885/1582161581-seatgeek.svg',
        alt: 'SeatGeek',
      },
      image: {
        url:
          'https://www.nomadproject.io/_next/static/images/seatgeek-d3f29290e414b2935a5a047e09321596.png?fit=crop&fm=webp&h=843.75&q=80&w=1500',
        alt: 'Seat Geek Case Study',
      },
      heading: 'SeatGeek',
      content:
        'A team of 5 engineers built a infrastructure platform with Nomad, Consul, and Vault to provide tickets to millions of customers.',
      link: {
        text: 'Learn More',
        url:
          'https://www.hashicorp.com/resources/seatgeek-and-the-hashistack-a-tooling-and-automation-love-story',
        type: 'outbound',
      },
    },
  ],
}

describe('<FeaturedSlider />', () => {
  it('should add a provided className to root element', () => {
    const className = 'my-featured-slider'
    const { container } = render(
      <FeaturedSlider {...propsBase} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass(className)
  })
})
