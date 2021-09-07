import { render, screen } from '@testing-library/react'
import TextSplitWithCode from './'

const baseProps = {
  textSplit: {
    className: 'g-text-split',
    heading: 'Some Code Heading',
    content:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.',
  },
  codeBlock: {
    code: '',
    language: 'shell',
  },
}

describe('<TextSplitWithCode />', () => {
  it('should render a `.g-text-split` root element', () => {
    const { container } = render(<TextSplitWithCode {...baseProps} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(baseProps.textSplit.className)
  })

  it('should pass the headline and content to the text-split component', () => {
    const testHeading = 'My text-split heading'
    const testContent = 'My example test content'
    render(
      <TextSplitWithCode
        {...baseProps}
        textSplit={{ heading: testHeading, content: testContent }}
      />
    )
    expect(screen.getByText(testHeading)).toBeVisible()
    expect(screen.getByText(testContent)).toBeVisible()
  })

  it('should pass the code to the code-block component', () => {
    const testCode = 'My sample code'
    render(<TextSplitWithCode {...baseProps} codeBlock={{ code: testCode }} />)
    const testCodeElem = screen.getAllByText(testCode)[1]
    expect(testCodeElem).toBeVisible()
    expect(testCodeElem.closest('.g-code-block')).toBeVisible()
  })
})
