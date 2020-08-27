export default function expectToThrow(fn, throwResult) {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
  expect(fn).toThrow(throwResult)
  console.error.mockRestore()
}
