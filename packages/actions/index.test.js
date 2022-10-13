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
          },
          {
            title: 'View documentation',
            href: '/docs',
          },
        ]}
      />
    )
    const element = screen.getByTestId('actions')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('View tutorials')
    expect(element).toHaveTextContent('View documentation')
  })
  it('should render a Button and StandaloneLink CTA', () => {
    render(
      <Actions
        ctas={[
          {
            title: 'View tutorials',
            href: '/tutorials',
          },
          {
            title: 'View documentation',
            href: '/docs',
            type: 'standalone-link',
          },
        ]}
      />
    )
    expect(screen.getByTestId('button-0')).toBeVisible()
    expect(screen.getByTestId('standaloneLink-1')).toBeVisible()
  })
  it('should render two StandaloneLink CTAs', () => {
    render(
      <Actions
        ctas={[
          {
            title: 'View tutorials',
            href: '/tutorials',
            type: 'standalone-link',
          },
          {
            title: 'View documentation',
            href: '/docs',
            type: 'standalone-link',
          },
        ]}
      />
    )
    expect(screen.getByTestId('standaloneLink-0')).toBeVisible()
    expect(screen.getByTestId('standaloneLink-1')).toBeVisible()
  })
  it('should render two Button CTAs', () => {
    render(
      <Actions
        ctas={[
          {
            title: 'View tutorials',
            href: '/tutorials',
          },
          {
            title: 'View documentation',
            href: '/docs',
          },
        ]}
      />
    )
    expect(screen.getByTestId('button-0')).toBeVisible()
    expect(screen.getByTestId('button-1')).toBeVisible()
  })
})
