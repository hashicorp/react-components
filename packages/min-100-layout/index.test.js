import { render, screen } from '@testing-library/react'
import Min100Layout from '.'

describe('<Min100Layout />', () => {
  it('should pass a provided className to the root element', () => {
    const className = 'my-special-layout-class'
    const { container } = render(
      <Min100Layout className={className} footer={<p>footer</p>}>
        <p>body</p>
      </Min100Layout>
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })

  it('should render the provided footer and body content', () => {
    render(
      <Min100Layout footer={<p>footer</p>}>
        <p>body</p>
      </Min100Layout>
    )
    expect(screen.getByText('body')).toBeInTheDocument()
    expect(screen.getByText('footer')).toBeInTheDocument()
  })
})
