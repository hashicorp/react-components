import { render, screen } from '@testing-library/react'
import VideoFeature from '.'

const defaultProps = {
  appearance: 'light',
  contentSide: 'left',
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
  it('TODO: Write tests', () => {
    render(<VideoFeature {...defaultProps} />)
    const element = screen.getByText(defaultProps.heading)
    expect(element).toBeInTheDocument()
  })
})
