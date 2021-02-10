import { render } from '@testing-library/react'
import Search, { SearchProvider, SEARCH_BOX_ID } from './'

const renderWithProvider = (ui) => {
  return render(<SearchProvider>{ui}</SearchProvider>)
}

describe('<Search />', () => {
  it('should render a `.g-search` <div> root element', () => {
    const { container } = renderWithProvider(
      <Search renderHitContent={() => {}} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-search')
  })

  it('should render an empty input by default', () => {
    const { container } = renderWithProvider(
      <Search renderHitContent={() => {}} />
    )

    const input = container.querySelector('input')
    const results = container.querySelector('.c-hits')
    expect(input).toHaveAttribute('id', SEARCH_BOX_ID)
    expect(input).toHaveAttribute('aria-activedescendant', '')
    expect(results).toBeNull()
  })
})

// describe('<SearchProvider />', () => {
//   it('should provide a context object', () => {})
// })
