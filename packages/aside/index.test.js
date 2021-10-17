import { render } from '@testing-library/react'
import Aside from '.'

describe('<Aside />', () => {
  it('should pass a provided className to the root element', () => {
    const className = 'my-special-aside-class'
    const { container } = render(
      <Aside className={className}>Here&apos;s some content</Aside>
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })
})
