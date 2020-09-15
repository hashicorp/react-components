import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import FeaturedSlider from './index.jsx'

describe('<FeaturedSlider />', () => {
  test('renders correctly', () => {
    const { container } = render(<FeaturedSlider />)
    const rootElem = container.firstChild
    expect(rootElem).toBeTruthy()
  })
})
