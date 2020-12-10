import { render } from '@testing-library/react'
import InlineSvg from './'

describe('<InlineSvg />', () => {
  it('should render an svg and any additional props', () => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      src:
        '<svg width="23" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M22.475 2.163a9.248 9.248 0 01-2.649.725 4.612 4.612 0 002.028-2.55 9.21 9.21 0 01-2.93 1.118 4.611 4.611 0 00-7.856 4.205A13.09 13.09 0 011.565.843 4.614 4.614 0 002.992 7a4.627 4.627 0 01-2.09-.576v.057a4.612 4.612 0 003.7 4.522 4.498 4.498 0 01-1.215.162c-.298 0-.586-.028-.867-.082a4.61 4.61 0 004.306 3.2A9.25 9.25 0 011.1 16.26c-.372 0-.74-.02-1.1-.063a13.06 13.06 0 007.067 2.071c8.484 0 13.12-7.026 13.12-13.12 0-.2-.004-.4-.013-.597a9.339 9.339 0 002.301-2.387" fill-rule="evenodd"/></svg>',
    }

    const { container } = render(<InlineSvg {...props} />)
    const rootElem = container.firstChild

    expect(rootElem.localName).toBe('div')
    expect(rootElem.getAttribute('id')).toMatch(props.id)
    expect(rootElem.getAttribute('class')).toMatch(props.className)
    expect(rootElem.hasAttribute('src')).toBe(false)
    expect(rootElem.childNodes.length).toBe(1)
  })

  it('should render an empty svg and any additional props', () => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      src: '',
    }

    const { container } = render(<InlineSvg {...props} />)
    const rootElem = container.firstChild

    expect(rootElem).toHaveClass('test-class')
    expect(rootElem.localName).toBe('div')
    expect(rootElem.getAttribute('id')).toMatch(props.id)
    expect(rootElem.getAttribute('class')).toMatch(props.className)
    expect(rootElem.hasAttribute('src')).toBe(false)
    expect(rootElem.childNodes.length).toBe(0)
  })

  it('should render an empty svg if the contents are invalid', () => {
    const props = { src: '<pU(DFASD' }

    const { container } = render(<InlineSvg {...props} />)
    const rootElem = container.firstChild

    expect(rootElem.localName).toBe('div')
    expect(rootElem.childNodes.length).toBe(0)
  })
})
