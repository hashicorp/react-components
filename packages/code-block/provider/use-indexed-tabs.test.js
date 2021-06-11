import { fireEvent, render, screen } from '@testing-library/react'
import useIndexedTabs from './use-indexed-tabs'
import CodeTabsProvider, { LOCAL_STORAGE_KEY } from '.'

afterEach(() => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, [])
})

/**
 * TestComponent is meant as a minimal yet
 * somewhat realistic way to ensure that the
 * useIndexedTabs hook works as expected.
 */
function TestComponent({ tabGroupIds, defaultTabIdx }) {
  const [
    localTabIdx,
    setActiveTabIdx,
    activeTabGroup,
    setActiveTabGroup,
  ] = useIndexedTabs(tabGroupIds, defaultTabIdx)
  return (
    <div>
      <p data-value={localTabIdx}>localTabIdx</p>
      <p data-value={activeTabGroup}>activeTabGroup</p>
      {tabGroupIds.map((_groupId, idx) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <button key={idx} onClick={() => setActiveTabIdx(idx)}>
            setActiveTabIdx-{idx}
          </button>
        )
      })}
      {tabGroupIds.map((groupId, idx) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <button key={idx} onClick={() => setActiveTabGroup(groupId)}>
            setActiveTabGroup-{groupId}
          </button>
        )
      })}
      <button onClick={() => setActiveTabGroup('fooBar')}>
        setActiveTabGroup-fooBar
      </button>
    </div>
  )
}

it("should reflect a valid default tab's index in the localTabIdx return value", () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={2} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('2')
})

it('should clamp the default tab value when it is too large', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={3} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('2')
})

it('should clamp the default tab value when it is too small', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={-1} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('0')
})

it('should warn if the consuming component is rendering without Provider context', () => {
  //  Suppress console.warn for this test, we expect an error
  jest.spyOn(console, 'warn')
  global.console.warn.mockImplementation(() => {})
  // Render
  render(<TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={-1} />)
  // Expect console.warn to have been called
  expect(console.warn).toHaveBeenCalledTimes(1)
  const msg =
    'Warning: "CodeTabsProvider" cannot be accessed. Make sure it wraps any component that calls useIndexedTabs, otherwise tab syncing will not function.'
  expect(console.warn).toHaveBeenCalledWith(msg)
  //  Restore console.warn for further tests
  global.console.warn.mockRestore()
})

it('should allow updates to localTabIdx via setActiveTabIdx', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={1} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('1')
  const setIdxButton = screen.getByText('setActiveTabIdx-2')
  fireEvent.click(setIdxButton)
  expect(tabIdxElem.dataset.value).toBe('2')
})

it('should reflect setActiveTabIdx updates in the activeTabGroup return value', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} defaultTabIdx={1} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('1')
  const setIdxButton = screen.getByText('setActiveTabIdx-2')
  fireEvent.click(setIdxButton)
  const tabGroupElem = screen.getByText('activeTabGroup')
  expect(tabGroupElem.dataset.value).toBe('g3')
})

it('should reflect matching setActiveTabGroup updates in the localTabIdx return value', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('0')
  const setIdxButton = screen.getByText('setActiveTabGroup-g2')
  fireEvent.click(setIdxButton)
  // Assert activeTabGroup was updated
  const tabGroupElem = screen.getByText('activeTabGroup')
  expect(tabGroupElem.dataset.value).toBe('g2')
  // Assert tabIdx was updated
  expect(tabIdxElem.dataset.value).toBe('1')
})

it('should not reflect non-matching setActiveTabGroup updates in the localTabIdx return value', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('0')
  const setIdxButton = screen.getByText('setActiveTabGroup-fooBar')
  fireEvent.click(setIdxButton)
  // Assert activeTabGroup was updated
  const tabGroupElem = screen.getByText('activeTabGroup')
  expect(tabGroupElem.dataset.value).toBe('fooBar')
  // Assert tabIdx was NOT updated
  expect(tabIdxElem.dataset.value).toBe('0')
})

it('should reflect changes to activeTabGroup in window.localStorage', () => {
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} />
    </CodeTabsProvider>
  )
  const setIdx0Button = screen.getByText('setActiveTabIdx-0')
  fireEvent.click(setIdx0Button)
  const setIdx2Button = screen.getByText('setActiveTabIdx-2')
  fireEvent.click(setIdx2Button)
  const actualJson = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  const expectedJson = JSON.stringify(['g3', 'g1'])
  expect(actualJson).toBe(expectedJson)
})

it('should load preferredTabGroups from window.localStorage, and use for the initial localTabIdx', () => {
  const tabPreferences = ['g2']
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabPreferences))
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('1')
})

it('should rank matching preferredTabGroups an update the localTabIdx return value to reflect the most preferred value', () => {
  const tabPreferences = ['no', 'nope', 'g2', 'g1']
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabPreferences))
  render(
    <CodeTabsProvider>
      <TestComponent tabGroupIds={['g1', 'g2', 'g3']} />
    </CodeTabsProvider>
  )
  const tabIdxElem = screen.getByText('localTabIdx')
  expect(tabIdxElem.dataset.value).toBe('1')
})
