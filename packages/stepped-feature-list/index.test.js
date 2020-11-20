import SteppedFeatureList from './'
import {
  fireEvent,
  getByLabelText,
  getByText,
  queryByText,
  render,
} from '@testing-library/react'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<SteppedFeatureList />', () => {
  describe('Vertical List (Desktop)', () => {
    it('Expands only the active slide', () => {
      const { getByTestId } = render(<SteppedFeatureList {...defaultProps} />)
      const container = getByTestId('features-vertical-list')
      expect(getByText(container, 'Feature 1')).toHaveAttribute(
        'aria-expanded',
        'true'
      )
      expect(getByText(container, 'Feature 2')).toHaveAttribute(
        'aria-expanded',
        'false'
      )

      expect(
        getByText(container, 'Feature 1 Description').closest('div')
      ).toHaveAttribute('aria-hidden', 'false')

      expect(
        getByText(container, 'Feature 2 Description').closest('div')
      ).toHaveAttribute('aria-hidden', 'true')
    })

    it('Switches feature when clicking an option', () => {
      const { getByTestId } = render(<SteppedFeatureList {...defaultProps} />)
      const container = getByTestId('features-vertical-list')

      expect(getByText(container, 'Feature 2')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
      fireEvent.click(getByText(container, 'Feature 2'))
      expect(getByText(container, 'Feature 2')).toHaveAttribute(
        'aria-expanded',
        'true'
      )
    })
  })

  describe('Carousel (Mobile)', () => {
    it('Shows only the active slide', () => {
      const { getByTestId } = render(<SteppedFeatureList {...defaultProps} />)
      const container = getByTestId('features-carousel')
      const activeSlide = container.querySelector('.slide-current')

      expect(getByText(activeSlide, 'Feature 1')).toBeInTheDocument()
      expect(queryByText(activeSlide, 'Feature 2')).not.toBeInTheDocument()
      expect(getByText(container, 'Slide 1 of 2')).toBeInTheDocument()
    })

    it('Switches feature when selecting a different slide', () => {
      const { getByTestId } = render(<SteppedFeatureList {...defaultProps} />)
      const container = getByTestId('features-carousel')
      expect(getByText(container, 'Slide 1 of 2')).toBeInTheDocument()
      fireEvent.click(getByLabelText(container, 'slide 2 bullet'))
      expect(getByText(container, 'Slide 2 of 2')).toBeInTheDocument()
    })
  })
})
