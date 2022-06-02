import { render, screen } from '@testing-library/react'
import Actions from '.'

describe('<Actions />', () => {
  it('should render ctas', () => {
    render(
      <Actions
        ctas={[
          {
            title: 'View tutorials',
            url: '/tutorials',
            variant: 'primary',
          },
          {
            title: 'View documentation',
            url: '/docs',
            variant: 'tertiary-neutral',
          },
        ]}
      />
    )
    const element = screen.getByTestId('actions')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('View tutorials')
    expect(element).toHaveTextContent('View documentation')
  })
})
