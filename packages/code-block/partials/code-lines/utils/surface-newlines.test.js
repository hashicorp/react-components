import surfaceNewlines from './surface-newlines'
import ReactDOMServer from 'react-dom/server'

it('returns already-surfaced input unmodified', () => {
  const jsxInput = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1">{`alert("Another line");`}</span>,
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(jsxInput)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('returns already-surfaced input unmodified', () => {
  const jsxInput = [
    <span key="0">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1">{`alert(`}</span>,
    <span key="2">{`"Third token on the same line as the second"`}</span>,
    <span key="3">{`);`}</span>,
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(jsxInput)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('surfaces simple nested JSX newlines while preserving tokens', () => {
  const jsxInput = [
    <span
      key="0"
      className="eg-token"
    >{`console.log("Hello world!");\nalert("Another line");`}</span>,
  ]
  const expectedResult = [
    <span key="0" className="eg-token">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1" className="eg-token">{`alert("Another line");`}</span>,
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('surfaces start and end edge cases of nested JSX newlines while preserving tokens', () => {
  const jsxInput = [
    <span
      key="0"
      className="eg-token"
    >{`\nconsole.log("Hello world!");\nalert("Another line");\n`}</span>,
  ]
  const expectedResult = [
    '\n',
    <span key="0" className="eg-token">{`console.log("Hello world!");`}</span>,
    '\n',
    <span key="1" className="eg-token">{`alert("Another line");`}</span>,
    '\n',
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('splits more deeply nested JSX newlines while preserving tokens', () => {
  const jsxInput = [
    <span key="0" className="foobar-token">
      <span className="nested-token">{`console.log("Hello world!");\nalert("Another line");`}</span>
    </span>,
  ]
  const expectedResult = [
    <span key="0" className="foobar-token">
      <span className="nested-token">{`console.log("Hello world!");`}</span>
    </span>,
    '\n',
    <span key="0" className="foobar-token">
      <span className="nested-token">{`alert("Another line");`}</span>
    </span>,
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})

it('splits deeply nested JSX newlines while preserving tokens', () => {
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
    '\n',
    <span key="2" className="foobar-complex-token">
      <span className="token-with-deep-nesting">
        <span className="more-nesting">{`alert("Another line");`}</span>
      </span>
      <span className="subsequent-token">{`con...`}</span>
    </span>,
    '\n',
    <span key="3" className="foobar-complex-token">
      <span className="subsequent-token">{`clusion`}</span>
    </span>,
  ]
  // Compare result and expected result via static markup
  const result = surfaceNewlines(jsxInput, true)
  const resultMarkup = ReactDOMServer.renderToString(result)
  const expectedMarkup = ReactDOMServer.renderToString(expectedResult)
  expect(resultMarkup).toBe(expectedMarkup)
})
