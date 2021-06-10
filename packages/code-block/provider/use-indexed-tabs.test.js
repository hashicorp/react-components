// import useIndexedTabs from './use-indexed-tabs'

it.todo('should clamp the default tab value')
it.todo(
  'should warn if the consuming component is rendering without Provider context'
)
it.todo(
  "should reflect a valid default tab's index in the localTabIdx return value"
)
it.todo(
  "should reflect a valid default tab's group ID in the activeTabGroup return value"
)
it.todo('should allow updates to localTabIdx via setActiveTabIdx')
it.todo(
  'should reflect setActiveTabIdx updates in the activeTabGroup return value'
)
it.todo(
  'should reflect matching setActiveTabGroup updates in the localTabIdx return value'
)
it.todo(
  'should not reflect non-matching setActiveTabGroup updates in the localTabIdx return value'
)
it.todo(
  'should reflect changes to preferredTabGroups in the activeTabGroup return value'
)
it.todo(
  'should reflect lone matching preferredTabGroups updates in the localTabIdx return value'
)
it.todo(
  'should rank matching preferredTabGroups an update the localTabIdx return value to reflect the most preferred value'
)

//   it("spies on console.warn", () => {
//     //  Suppress console.warn for this test, we expect an error
//     jest.spyOn(console, 'error')
//     global.console.warn.mockImplementation(() => {})
//     // Render
//     // TODO
//     // Expect console.warn to have been called
//     expect(() => {
//       parseHighlightedLines(input)
//     }).toThrowError(expectedError)
//     //  Restore console.warn for further tests
//     global.console.warn.mockRestore()
//   })
