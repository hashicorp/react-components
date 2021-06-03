import splitJsxIntoLines from './split-jsx-into-lines'
import ReactDOMServer from 'react-dom/server'

function renderLinesToMarkup(linesArray) {
  const linesJsx = linesArray.map((line, idx) => {
    return (
      // idx is stable, safer to use as key than the
      // line contents, which are often identical (eg blank lines)
      // eslint-disable-next-line react/no-array-index-key
      <div key={idx} className="line">
        {line}
      </div>
    )
  })
  return ReactDOMServer.renderToStaticMarkup(linesJsx)
}

it('splits into lines at newline children', () => {
  const jsxInput = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1">{`alert("Another line");`}</span>,
  ]
  const expectedResult = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    <span key="1">{`alert("Another line");`}</span>,
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('groups consecutive non-newline elements', () => {
  const jsxInput = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1">{`alert(`}</span>,
    <span key="2">{`"Third token on the same line as the second"`}</span>,
    <span key="3">{`);`}</span>,
  ]
  const expectedResult = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    [
      <span key="1">{`alert(`}</span>,
      <span key="2">{`"Third token on the same line as the second"`}</span>,
      <span key="3">{`);`}</span>,
    ],
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('inserts blank lines when consecutive newlines are present', () => {
  const jsxInput = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '\n',
    '\n',
    <span key="1">{`alert(`}</span>,
    <span key="2">{`"Third token on the same line as the second"`}</span>,
    <span key="3">{`);`}</span>,
  ]
  const expectedResult = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '',
    [
      <span key="1">{`alert(`}</span>,
      <span key="2">{`"Third token on the same line as the second"`}</span>,
      <span key="3">{`);`}</span>,
    ],
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('handles cases that start or end with newlines', () => {
  const jsxInput = [
    <span
      key="0"
      className="eg-token"
    >{`\nconsole.log("Hello world!");\nalert("Another line");\n`}</span>,
  ]
  const expectedResult = [
    '',
    <span key="0" className="eg-token">{`console.log("Hello world!");`}</span>,
    <span key="1" className="eg-token">{`alert("Another line");`}</span>,
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('handles cases that start or end with multiple newlines', () => {
  const jsxInput = [
    <span
      key="0"
      className="eg-token"
    >{`\n\nconsole.log("Hello world!");\nalert("Another line");\n\n`}</span>,
  ]
  const expectedResult = [
    '',
    '',
    <span key="0" className="eg-token">{`console.log("Hello world!");`}</span>,
    <span key="1" className="eg-token">{`alert("Another line");`}</span>,
    '',
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('handles complex nesting cases', () => {
  const jsxInput = [
    <span key="0" className="foobar-complex-token">
      <span className="nested-token">{`neat token`}</span>
      <span className="token-with-deep-nesting">
        <span className="more-nesting">
          {`console.log("Hello world!");\nalert("Another line");`}
        </span>
      </span>
      <span className="subsequent-token">{`con...\nclusion`}</span>
    </span>,
  ]
  const expectedResult = [
    <span key="0" className="foobar-complex-token">
      <span className="nested-token">{`neat token`}</span>
      <span className="token-with-deep-nesting">
        <span className="more-nesting">{`console.log("Hello world!");`}</span>
      </span>
    </span>,
    <span key="2" className="foobar-complex-token">
      <span className="token-with-deep-nesting">
        <span className="more-nesting">{`alert("Another line");`}</span>
      </span>
      <span className="subsequent-token">{`con...`}</span>
    </span>,
    <span key="4" className="foobar-complex-token">
      <span className="subsequent-token">{`clusion`}</span>
    </span>,
  ]
  // Compare result and expected result via static markup
  const result = splitJsxIntoLines(jsxInput, true)
  const resultMarkup = renderLinesToMarkup(result)
  const expectedMarkup = renderLinesToMarkup(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})
