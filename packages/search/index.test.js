import { render, screen, fireEvent } from '@testing-library/react'
import randomWords from 'random-words'
import Search, {
  SearchProvider,
  useSearch,
  SEARCH_BOX_ID,
  SEARCH_RESULTS_ID,
} from './'
import { HitsComponent } from './hits'
import { indexContent } from './tools'

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

  it('should pass className to the root element', () => {
    const className = 'special-class-name'
    const { container } = render(
      <SearchProvider>
        <Search className={className} renderHitContent={() => {}} />
      </SearchProvider>
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should render an empty input by default', () => {
    const { container } = render(
      <SearchProvider>
        <Search renderHitContent={() => {}} />
      </SearchProvider>
    )
    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('id', SEARCH_BOX_ID)
    expect(input).not.toHaveAttribute('aria-activedescendant')
    expect(container.querySelector('.c-hits')).toBeNull()
  })
})

describe('<Hits />', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)
  beforeEach(setDummyVars)

  it('should display no results with invalid input', () => {
    render(
      <SearchProvider>
        <HitsComponent hits={[]} renderHitContent={() => {}} />
      </SearchProvider>
    )
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(
      screen.queryByText('No results for undefined...')
    ).toBeInTheDocument()
  })

  it('should render results when given valid input', () => {
    render(
      <SearchProvider>
        <HitsComponent
          hits={[{ objectID: 'foo' }, { objectID: 'bar' }]}
          renderHitContent={({ objectID }) => <span>{objectID}</span>}
        />
      </SearchProvider>
    )
    const resultsEl = screen.getByRole('listbox')
    expect(resultsEl).toHaveAttribute('id', SEARCH_RESULTS_ID)
    const hitItems = screen.getAllByTestId('hit-item')
    expect(hitItems.length).toBe(2)
  })
})

describe('<SearchProvider /> configuration', () => {
  it('should throw an error if no Algolia config is accessible', () => {
    //  Suppress console.error for this test, we expect errors
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    // Set up a function to render the provider, we'll re-use this
    function renderProvider() {
      render(
        <SearchProvider>
          <p>Hi</p>
        </SearchProvider>
      )
    }
    // Test that when .env is present, we don't throw an error
    expect(renderProvider).not.toThrowError()
    // Test each .env var individually, if any are missing,
    // an error should be thrown
    const {
      NEXT_PUBLIC_ALGOLIA_APP_ID,
      NEXT_PUBLIC_ALGOLIA_INDEX,
      NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
    } = originalEnv
    // APP_ID missing
    process.env = {
      NEXT_PUBLIC_ALGOLIA_INDEX,
      NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
    }
    expect(renderProvider).toThrowError()
    // INDEX missing
    process.env = {
      NEXT_PUBLIC_ALGOLIA_APP_ID,
      NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
    }
    expect(renderProvider).toThrowError()
    // SEARCH_ONLY_API_KEY missing
    process.env = { NEXT_PUBLIC_ALGOLIA_INDEX, NEXT_PUBLIC_ALGOLIA_APP_ID }
    expect(renderProvider).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
    // Restore the original .env for further tests
    teardownEnv()
  })

  it('should allow mixed use of Algolia config props and .env', () => {
    // Set search-only API key and App ID in .env
    process.env = {
      NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY:
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
    }
    // Render the provider, and a consumer to log out the index name
    const testIndexName = 'my-very-special-index'
    function IndexConsumer() {
      const context = useSearch()
      return <div>{context.indexName}</div>
    }
    render(
      <SearchProvider algoliaConfig={{ indexName: testIndexName }}>
        <IndexConsumer />
      </SearchProvider>
    )
    expect(screen.getByText(testIndexName)).toBeInTheDocument()

    // Restore the original .env for further tests
    teardownEnv()
  })
})

describe('<SearchProvider /> context', () => {
  beforeAll(setupEnv)
  afterAll(teardownEnv)
  beforeEach(setDummyVars)

  it('should provide a context object', () => {
    function Consumer() {
      const context = useSearch()
      return <div>{typeof context}</div>
    }
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>
    )
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

    const { container } = render(
      <SearchProvider>
        <SearchButton />
      </SearchProvider>
    )

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

  const searchObjects = new Array(20).fill(0).map((item, index) => ({
    objectID: index,
    name: `Search object ${index}`,
    category: index % 2 ? 'A' : 'B',
    timestamp: new Date(),
    description: randomWords({ exactly: 10, join: ' ' }),
  }))

  const getSearchObjects = () => searchObjects

  beforeEach(() => {
    require('dotenv').config()

    algoliaConfig = {
      appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
      apiKey: '44ed2a0b923b306ea74acd4ac0dee741', //  this key only has access to the test index
    }
  })

  it.skip('should index content', async () => {
    //  double check we're using the right index
    expect(process.env.NEXT_PUBLIC_ALGOLIA_INDEX).toBe('react-components_TEST')

    await expect(
      indexContent({
        algoliaConfig,
        getSearchObjects,
        settings: {
          searchableAttributes: ['name', 'description'],
          attributesForFaceting: ['category'],
        },
      })
    ).resolves.not.toThrowError()
  })
})
