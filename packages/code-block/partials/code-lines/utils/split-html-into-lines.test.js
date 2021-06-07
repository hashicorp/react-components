import splitHtmlIntoLines from './split-html-into-lines'

it('splits a simple string into multiple span elements', () => {
  const htmlInput = `<span>console.log("Hello world!");</span>\n<span>alert("Another line");</span>`
  const jsxResult = splitHtmlIntoLines(htmlInput)
  expect(jsxResult.length).toBe(2)
})
