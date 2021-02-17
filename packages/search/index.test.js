import { render, screen, fireEvent } from '@testing-library/react'
import Search, {
  SearchProvider,
  useSearch,
  SEARCH_BOX_ID,
  SEARCH_RESULTS_ID,
} from './'
import { HitsComponent } from './hits'
import { indexContent } from './tools'

const renderWithProvider = (ui) => {
  return render(<SearchProvider>{ui}</SearchProvider>)
}

const originalEnv = process.env

const setDummyVars = () => {
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID = 'foo'
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX = 'bar'
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY = 'baz'
}

function setupEnv() {
  jest.resetModules()
  process.env = { ...originalEnv } //  copy original environment
}

function teardownEnv() {
  process.env = originalEnv //  restore original environment
}

describe('<Search />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)
  beforeEach(setDummyVars)

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

    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('id', SEARCH_BOX_ID)
    expect(input).toHaveAttribute('aria-activedescendant', '')
    expect(container.querySelector('.c-hits')).toBeNull()
  })
})

describe('<Hits />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)
  beforeEach(setDummyVars)

  it('should display no results with invalid input', () => {
    renderWithProvider(<HitsComponent hits={[]} renderHitContent={() => {}} />)

    expect(screen.queryByRole('listbox')).toBeNull()
    expect(
      screen.queryByText('No results for undefined...')
    ).toBeInTheDocument()
  })

  it('should render results when given valid input', () => {
    renderWithProvider(
      <HitsComponent
        hits={[{ objectID: 'foo' }, { objectID: 'bar' }]}
        renderHitContent={({ objectID }) => <span>{objectID}</span>}
      />
    )

    const resultsEl = screen.getByRole('listbox')
    expect(resultsEl).toHaveAttribute('id', SEARCH_RESULTS_ID)
    expect(Array.from(resultsEl.querySelectorAll('.hit-item')).length).toBe(2)
  })
})

describe('<SearchProvider />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)
  beforeEach(setDummyVars)

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

    const { container } = renderWithProvider(<SearchButton />)

    //  empty string by default
    expect(screen.getByText('query is')).toBeDefined()

    //  set the query value
    fireEvent.click(container.firstChild)

    //  verify query is applied
    expect(screen.getByText('query is nomad')).toBeDefined()
  })
})

describe('search tools', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)

  let algoliaConfig = {}

  const searchObjects = [
    {
      objectID: 0,
      name: 'Foo',
      category: 'A',
      timestamp: new Date(),
    },
    {
      objectID: 1,
      name: 'Bar',
      category: 'B',
      timestamp: new Date(),
    },
    {
      objectID: 2,
      name: 'Baz',
      category: 'B',
      timestamp: new Date(),
    },
  ]

  const getSearchObjects = () => searchObjects

  beforeEach(() => {
    require('dotenv').config() //  grab real value for app ID
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX = 'react-components_TEST' //  ensure we're using test index
    process.env.ALGOLIA_API_KEY = '44ed2a0b923b306ea74acd4ac0dee741' //  this key only has access to the test index

    algoliaConfig = {
      appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
      apiKey: process.env.ALGOLIA_API_KEY,
    }
  })

  it('should index content', async () => {
    await indexContent({
      algoliaConfig,
      getSearchObjects,
      settings: {
        searchableAttributes: ['name'],
        attributesForFaceting: ['category'],
      },
    })
  })
})
