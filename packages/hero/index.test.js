import { render } from '@testing-library/react'
import Hero from '.'

describe('<Hero />', () => {
  it('should render the name of the product', () => {
    render(<Hero />)
  })
})
