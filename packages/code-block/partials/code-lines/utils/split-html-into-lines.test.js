import splitHtmlIntoLines from './split-html-into-lines'

it('splits a simple string into multiple span elements', () => {
  const htmlInput = `<span>console.log("Hello world!");</span>\n<span>alert("Another line");</span>`
  const jsxResult = splitHtmlIntoLines(htmlInput)
  expect(jsxResult.length).toBe(2)
})

/**
 * @TODO see if this situation ever actually comes up,
 * eg what is the output of using our highlight() utility on the
 * "diff" example that's causing problems for split-jsx-into-lines?
 */
it('splits a string with newlines, while preserving tokens', () => {
  const htmlInput = `<span class="token-foobar">console.log("Hello world!");\nalert("Another line");</span>`
  const jsxResult = splitHtmlIntoLines(htmlInput)
  expect(jsxResult.length).toBe(2)
  // Ensure the HTML is as expected
  const htmlResults = jsxResult.map(({ props }) => {
    return props.dangerouslySetInnerHTML.__html
  })
  expect(htmlResults[0]).toBe(
    `<span class="token-foobar">console.log("Hello world!");</span>`
  )
  expect(htmlResults[1]).toBe(
    `<span class="token-foobar">alert("Another line");</span>`
  )
})
