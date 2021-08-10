import { render, waitFor } from '@testing-library/react'
import { setImmediate } from 'timers'
import SentinelEmbedded from '.'
import props from './props'
import { getTestValues } from 'swingset/testing'

// Due to the Sentinel embedded code performing a dynamic
// import on client side, we need to wait until promises
// are resolved before running assertions against CodeMirror.
// A description of this solution can be found here:
//    https://stackoverflow.com/a/51045733
function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve))
}

const defaultProps = getTestValues(props)

// fix for getBoundingClientRect issue on range
// see: https://github.com/jsdom/jsdom/issues/3002
// Required for CodeMirror interaction within tests.
document.createRange = () => {
  const range = new Range()

  range.getBoundingClientRect = jest.fn()

  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }))

  return range
}

describe('<SentinelEmbedded />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render a `sentinel-playground` with expected wrapper', async () => {
    expect.assertions(2)
    const { container } = render(<SentinelEmbedded {...defaultProps} />)

    await flushPromises()
    jest.runAllTimers()

    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SENTINEL-PLAYGROUND')
    const wrapper = rootElem.shadowRoot.querySelector('.wrapper')
    expect(wrapper).not.toBeNull()
  })

  it('should render sample content', async () => {
    expect.assertions(1)
    const { container } = render(
      <SentinelEmbedded
        {...defaultProps}
        exampleData={{ policy: 'main = true' }}
      />
    )

    await flushPromises()
    jest.runAllTimers()

    const rootElem = container.firstChild
    const codeMirror = rootElem.shadowRoot.querySelector('.CodeMirror')
      .CodeMirror
    expect(codeMirror.getValue()).toBe('main = true')
  })

  it('should render height', () => {
    expect.assertions(1)
    const { container } = render(
      <SentinelEmbedded {...defaultProps} height="300px" />
    )
    const rootElem = container.firstChild

    const wrapper = rootElem.shadowRoot.querySelector('.wrapper')
    const style = window.getComputedStyle(wrapper)
    expect(style.height).toBe('300px')
  })

  it('should render from id response', async () => {
    const xhrMockObj = {
      open: jest.fn(),
      send: jest.fn(),
      getResponseHeader: jest.fn(() => 'application/json'),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      response: JSON.stringify({ example: { policy: 'main = true' } }),
    }
    const xhrMockClass = () => xhrMockObj
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)

    const { container } = render(
      <SentinelEmbedded {...defaultProps} exampleId="abcd1234" />
    )
    const rootElem = container.firstChild

    setTimeout(() => {
      xhrMockObj['onload']({ target: xhrMockObj })
    }, 0)

    await waitFor(() =>
      expect(rootElem.shadowRoot.querySelector('.CodeMirror')).not.toBeNull()
    )

    const codeMirror = rootElem.shadowRoot.querySelector('.CodeMirror')
      .CodeMirror
    expect(codeMirror.getValue()).toBe('main = true')
  })

  it('should pass policyContent into example', async () => {
    expect.assertions(1)
    const { container } = render(
      <SentinelEmbedded {...defaultProps} policyContent={'main = true'} />
    )

    await flushPromises()
    jest.runAllTimers()

    const rootElem = container.firstChild
    const codeMirror = rootElem.shadowRoot.querySelector('.CodeMirror')
      .CodeMirror
    expect(codeMirror.getValue()).toBe('main = true')
  })
})
