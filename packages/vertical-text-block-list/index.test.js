import { render, screen } from '@testing-library/react'
import VerticalTextBlockList from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<VerticalTextBlockList />', () => {
  it('should render correctly with default props', () => {
    const className = 'my-text-block-list'
    const { container } = render(
      <VerticalTextBlockList {...defaultProps} className={className} />
    )
    expect(container.firstChild).toHaveClass(className)

    // all items in the data list render
    expect(screen.getByTestId('item-list').children.length).toBe(
      defaultProps.data.length
    )

    defaultProps.data.map((item) => {
      // item.logo presence/absense changes render
      const headerFirstChild = screen.getByTestId(`header-${item.header}`)
        .children[0]
      if (item.logo) {
        expect(headerFirstChild).toHaveAttribute('data-testid', 'img')
      } else {
        expect(headerFirstChild).toHaveAttribute('data-testid', 'text')
      }
    })
  })

  it('should render body text as markdown', () => {
    render(
      <VerticalTextBlockList
        data={[{ header: 'test', body: '<strong>foo</strong>' }]}
      />
    )
    expect(
      screen.getByTestId(`body-text-test`).querySelector('strong')
    ).toBeInTheDocument()
  })

  it('should have a class with the "centerText" prop active', () => {
    render(<VerticalTextBlockList {...defaultProps} centerText={true} />)
    expect(screen.getByTestId('item-list')).toHaveClass('centeredText')
  })

  it('should render links correctly when a "Link" prop is passed', () => {
    render(<VerticalTextBlockList {...defaultProps} Link={noopComponent} />)
    Array.from(screen.getByTestId('item-list').children).map((child, i) => {
      const hasLink = defaultProps.data[i].linkUrl
      if (hasLink) {
        expect(child.querySelector('[data-testid="link"]')).toBeInTheDocument()
      } else {
        expect(child.querySelector('[data-testid="div"]')).toBeInTheDocument()
      }
    })
  })
})

function noopComponent({ children }) {
  return children
}
