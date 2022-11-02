import { queryByTestId, render, screen } from '@testing-library/react'
import VideoFeature from '.'

const defaultProps = {
  appearance: 'light',
  contentPosition: 'left',
  heading: 'Display copy, tellus massa in lementum nulla donec nec',
  description:
    'Body copy, pharetra pellentesque sed elementum risus accumsan et. Tristique tortor, morbi vivamus nibh mollis. Ultrices aliquet sit nibh consequat quam vestibulum ipsum turpis. Sed quam vitae porttitor egestas. Luctus nibh ut posuere ultrices est arcu at aliquam in. Sem aenean laoreet molestie non.',
  author: {
    name: 'Firstname Lastname',
    role: 'Title, Company',
    avatar:
      'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
  },
  video: {
    url: 'https://youtu.be/nJ0aI6sEDRo',
    description:
      'Description - 2 lines with character limit of 90. Tempus in egestas sagittis nulla feugiat',
  },
}

describe('<VideoFeature />', () => {
  it('should render the provided heading text', () => {
    render(<VideoFeature {...defaultProps} />)
    const element = screen.getByText(defaultProps.heading)
    expect(element).toBeInTheDocument()
  })

  it('should render the provided description text', () => {
    render(<VideoFeature {...defaultProps} />)
    const element = screen.getByText(defaultProps.description)
    expect(element).toBeInTheDocument()
  })

  it('should render the default (light) appearance', () => {
    const { container } = render(<VideoFeature {...defaultProps} />)

    expect(container.firstChild).toHaveClass('videoFeature', 'light')
    expect(container.firstChild).not.toHaveClass('dark')
  })

  it('should render the dark appearance', () => {
    const { container } = render(
      <VideoFeature {...defaultProps} appearance="dark" />
    )

    expect(container.firstChild).toHaveClass('videoFeature', 'dark')
    expect(container.firstChild).not.toHaveClass('light')
  })

  it('should render with content positioned on the left by default', () => {
    const { container } = render(<VideoFeature {...defaultProps} />)

    expect(container.firstChild).toHaveClass('videoFeature', 'left')
    expect(container.firstChild).not.toHaveClass('right')
  })

  it('should render with content positioned on the right', () => {
    const { container } = render(
      <VideoFeature {...defaultProps} contentPosition="right" />
    )

    expect(container.firstChild).toHaveClass('videoFeature', 'right')
    expect(container.firstChild).not.toHaveClass('left')
  })

  it('should not render <AuthorByline /> without a provided author prop', () => {
    const { container } = render(
      <VideoFeature
        heading={defaultProps.heading}
        description={defaultProps.description}
        video={defaultProps.video}
      />
    )

    const element = queryByTestId(container, 'author-byline')
    expect(element).not.toBeInTheDocument()
  })
})
