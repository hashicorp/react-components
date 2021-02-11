import { render, screen, fireEvent } from '@testing-library/react'
import Search, {
  SearchProvider,
  useSearch,
  SEARCH_BOX_ID,
  SEARCH_RESULTS_ID,
} from './'
import { HitsComponent } from './hits'

const renderWithProvider = (ui) => {
  return render(<SearchProvider>{ui}</SearchProvider>)
}

const originalEnv = process.env

function setupEnv() {
  jest.resetModules()
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID = 'foo'
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX = 'bar'
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY = 'baz'
}

function teardownEnv() {
  process.env = originalEnv
}

describe('<Search />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)

  it('should render a `.g-search` <div> root element', () => {
    const { container } = renderWithProvider(
      <Search renderHitContent={() => {}} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-search')
  })

  it('should render an empty input by default', () => {
    const { container, getByRole } = renderWithProvider(
      <Search renderHitContent={() => {}} />
    )

    const input = getByRole('searchbox')
    expect(input).toHaveAttribute('id', SEARCH_BOX_ID)
    expect(input).toHaveAttribute('aria-activedescendant', '')
    expect(container.querySelector('.c-hits')).toBeNull()
  })
})

describe('<Hits />', () => {
  it('should display no results with invalid input', () => {
    const { queryByText, queryByRole } = renderWithProvider(
      <HitsComponent hits={[]} renderHitContent={() => {}} />
    )

    expect(queryByRole('listbox')).toBeNull()
    expect(queryByText('No results for undefined...')).toBeInTheDocument()
  })

  it('should render results when given valid input', () => {
    const { getByRole } = renderWithProvider(
      <HitsComponent
        hits={[{ objectID: 'foo' }, { objectID: 'bar' }]}
        renderHitContent={({ objectID }) => <span>{objectID}</span>}
      />
    )

    const resultsEl = getByRole('listbox')
    expect(resultsEl).toHaveAttribute('id', SEARCH_RESULTS_ID)
    expect(Array.from(resultsEl.querySelectorAll('.hit-item')).length).toBe(2)
  })
})

describe('<SearchProvider />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)

  it('should provide a context object', () => {
    function Consumer() {
      const context = useSearch()
      return <div>{typeof context}</div>
    }
    renderWithProvider(<Consumer />)
    expect(screen.getByText('object')).toBeInTheDocument()
  })

  it('should accurately get/set query state', () => {
    function SearchButton() {
      const { query, setQuery } = useSearch()
      const clickHandler = () => setQuery('nomad')
      return (
        <>
          <button onClick={clickHandler}>
            <span>query is {query}</span>
          </button>
        </>
      )
    }

    const { container, getByText } = renderWithProvider(<SearchButton />)

    //  empty string by default
    expect(getByText('query is')).toBeDefined()

    //  set the query value
    fireEvent.click(container.firstChild)

    //  verify query is applied
    expect(getByText('query is nomad')).toBeDefined()
  })
})
