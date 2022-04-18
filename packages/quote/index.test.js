import { render, screen } from '@testing-library/react'
import Quote from '.'

describe('<Quote />', () => {
  it('should render', () => {
    const text =
      'Amet, nisl massa id egestas tincidunt urna tortor id bibendum. Mauris elit nunc fermentum elit mi varius suspendisse ut dictum. Nec a, massa vitae, viverra ultricies.'
    render(
      <Quote
        text={text}
        avatar="https://www.datocms-assets.com/2885/1560891392-cropped0000armon.jpg"
        name="Name"
        role="Company, Role"
      />
    )
    const element = screen.getByTestId('quote')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent(text)
  })

  it('should render dark appearance', () => {
    render(
      <Quote
        appearance="dark"
        text="Sample quote text"
        avatar="https://www.datocms-assets.com/2885/1560891392-cropped0000armon.jpg"
        name="Name"
        role="Company, Role"
      />
    )
    const element = screen.getByTestId('quote')
    expect(element).toHaveClass('dark')
  })
})
