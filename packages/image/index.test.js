import { render, screen } from '@testing-library/react'
import Image from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<Image />', () => {
  it('should render with minimal props', () => {
    render(<Image url="foo.jpg" />)
    const defaultSteps = [250, 500, 750, 1000, 1500, 2000, 2500]

    const root = screen.getByTestId('image-root')
    const webpSource = screen.getByTestId('webp-source')
    const imageTag = screen.getByTestId('img')

    expect(root).toBeInTheDocument()
    expect(root.tagName.toLowerCase()).toBe('picture')

    expect(webpSource.type).toBe('image/webp')
    expect(webpSource.sizes).toBe('100vw')
    webpSource.srcset.split(',').map((src, i) => {
      expect(src).toMatch(
        new RegExp(
          `foo\\.jpg\\?fit=max&fm=webp&q=80&w=${defaultSteps[i]} ${defaultSteps[i]}w`
        )
      )
    })

    expect(imageTag.src).toBe('http://localhost/foo.jpg?fit=max&fm=jpg&q=80')
    expect(imageTag.sizes).toBe('100vw')
    imageTag.srcset.split(',').map((src, i) => {
      expect(src).toMatch(
        new RegExp(
          `foo\\.jpg\\?fit=max&fm=jpg&q=80&w=${defaultSteps[i]} ${defaultSteps[i]}w`
        )
      )
    })
  })

  it('should handle a missing image extension', () => {
    const testSrc = 'https://www.example.com/my-test/image'
    const testAlt = 'My extensionless image'
    const { getByAltText } = render(<Image url={testSrc} alt={testAlt} />)
    expect(getByAltText(testAlt)).toBeVisible()
  })

  it('should render with all props provided as custom values', () => {
    render(<Image {...defaultProps} />)

    const webpSource = screen.getByTestId('webp-source')
    const imageTag = screen.getByTestId('img')

    expect(screen.getByTestId('image-root')).toBeInTheDocument()

    expect(webpSource.sizes).toBe('100vw')
    webpSource.srcset.split(',').map((src, i) => {
      expect(src).toMatch(
        new RegExp(
          `${defaultProps.url}\\?fit=crop&fm=webp&h=[0-9.]+&q=80&w=${defaultProps.steps[i]} ${defaultProps.steps[i]}w`
        )
      )
    })

    expect(imageTag.alt).toBe(defaultProps.alt)
    imageTag.srcset.split(',').map((src, i) => {
      expect(src).toMatch(
        new RegExp(
          `${defaultProps.url}\\?fit=crop&fm=jpg&h=[0-9.]+&q=80&w=${defaultProps.steps[i]} ${defaultProps.steps[i]}w`
        )
      )
    })
  })

  it('should render svg images correctly', () => {
    render(<Image url="foo" format="svg" />)
    const root = screen.getByTestId('image-root')

    expect(root).toBeInTheDocument()
    expect(root.tagName.toLowerCase()).toBe('img')
    expect(root.src).toBe('http://localhost/foo')
  })

  it('should infer svg type from the file extension', () => {
    render(<Image url="foo.svg" />)

    const root = screen.getByTestId('image-root')

    expect(root).toBeInTheDocument()
    expect(root.tagName.toLowerCase()).toBe('img')
  })

  it('should pass through any other arbitrary props to svg images', () => {
    render(<Image url="foo" format="svg" className="wow" />)
    const root = screen.getByTestId('image-root')
    expect(root).toHaveClass('wow')
  })

  it('should pass through any other arbitrary props to non-svg images', () => {
    render(<Image url="foo.jpg" className="wow" />)
    const img = screen.getByTestId('img')
    expect(img).toHaveClass('wow')
  })
})
