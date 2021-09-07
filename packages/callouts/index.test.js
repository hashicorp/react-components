import { render, screen } from '@testing-library/react'
import Callouts from './index.js'

const baseProps = {
  heading: "Ensure Your Team's Success",
  layout: 'two-up',
  centerHeading: true,
  product: 'hashicorp',
  items: [
    {
      heading: 'Worldwide Support',
      content:
        'With HashiCorp Worldwide Support, you can get assistance when you need it from anywhere in the world with our ready-to-serve ticketing system and expert support team.',
      link: {
        text: 'Compare Plans',
        url: '#',
        linkType: 'anchor',
      },
    },
    {
      heading: 'Technical Account Management',
      content:
        'From best practice advice to regular cadences and quarterly business reviews, our Technical Account Managers (TAMs) will be your advocate, ensuring your teams are set up for long term success with HashiCorp every step of the way.',
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound',
      },
    },
    {
      heading: 'Implementation Services',
      content:
        'Let highly skilled product domain experts help you achieve success by simplifying and accelerating the adoption of our cloud solutions starting at the implementation phase.',
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound',
      },
    },
    {
      heading: 'Enterprise Architecture',
      content:
        "Large-scale systems and services can become complex to design and manage. Our Enterprise Architects can lay the foundation for your success through design consultation and architecture review using HashiCorp's recommended patterns.",
      link: {
        text: 'Learn More',
        url: '#',
        linkType: 'inbound',
      },
    },
  ],
}

describe('<Callouts />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-special-callouts'
    const { container } = render(
      <Callouts {...baseProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass(className)
  })

  it('should throw an error if no layout is provided', () => {
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(<Callouts {...baseProps} layout={undefined} />)
    }).toThrowError('The "layout" prop is required, please pass in a value')
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should render a heading if one is provided', () => {
    const heading = 'My test heading'
    render(<Callouts {...baseProps} heading={heading} />)
    expect(screen.getByTestId('headings')).toBeVisible()
    expect(screen.getByText(heading)).toBeVisible()
  })

  it('should render a subheading if one is provided', () => {
    const subheading = 'My test subheading'
    const { getByText } = render(
      <Callouts {...baseProps} subheading={subheading} />
    )
    expect(getByText(subheading)).toBeVisible()
  })

  it('should not render a heading container if no heading or subheading is provided', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.heading
    delete basePropsModified.subheading

    render(<Callouts {...basePropsModified} />)
    expect(screen.queryByTestId('headings')).not.toBeInTheDocument()
  })

  it('should render each callout, verifiable by each heading being rendered', () => {
    render(<Callouts {...baseProps} />)
    baseProps.items.forEach((item) => {
      expect(screen.getByText(item.heading)).toBeVisible()
    })
  })
})
