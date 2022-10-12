import { render, screen } from '@testing-library/react'
import Actions from '.'

describe('<Actions />', () => {
  it('should render ctas', () => {
    render(
      <Actions
        ctas={[
          {
            title: 'View tutorials',
            href: '/tutorials',
            variant: 'primary',
          },
          {
            title: 'View documentation',
            href: '/docs',
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
