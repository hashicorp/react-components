import { render, screen } from '@testing-library/react'
import VideoFeature from '.'

describe('<VideoFeature />', () => {
  it('should render the provided React children', () => {
    const text = 'TODO Update tests'
    render(<VideoFeature>{text}</VideoFeature>)
    const element = screen.getByText(text)
    expect(element).toBeInTheDocument()
  })
})
