import { render, screen } from '@testing-library/react'
import AuthorByline from '.'

describe('<AuthorByline />', () => {
  it('should render', () => {
    render(
      <AuthorByline
        avatar="https://www.datocms-assets.com/2885/1560891392-cropped0000armon.jpg"
        name="Name"
        role="Company, Role"
      />
    )
    expect(screen.getByTestId('author-byline')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Company, Role')).toBeInTheDocument()
    expect(screen.getByAltText('Name avatar')).toBeInTheDocument()
  })

  it('should render dark appearance', () => {
    render(
      <AuthorByline
        appearance="dark"
        avatar="https://www.datocms-assets.com/2885/1560891392-cropped0000armon.jpg"
        name="Name"
        role="Company, Role"
      />
    )
    const element = screen.getByTestId('author-byline')
    expect(element).toHaveClass('dark')
  })
})
