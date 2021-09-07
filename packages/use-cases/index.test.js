import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UseCases from './index'

const defaultProps = {
  items: [
    {
      title: 'Easily onboard and manage users',
      description: 'Use SSO to manage onboarding and off-boarding users.',
      image: {
        url:
          'https://www.datocms-assets.com/2885/1565300480-workload-orchestration.png',
      },
      link: {
        title: 'Learn more',
        url:
          'https://learn.hashicorp.com/tutorials/boundary/getting-started-config',
      },
    },
    {
      title: 'Open and extensible remote access',
      description:
        'Integrate with existing tooling and APIs to simplify access.',
      image: {
        url:
          'https://www.datocms-assets.com/2885/1565300480-workload-orchestration.png',
      },
      link: {
        title: 'Learn more',
        url: '/docs/common-workflows/manage-users-groups',
      },
    },
    {
      title: 'Compliance without overhead',
      description:
        'Provide session visibility that enables teams to stay compliant.',
      image: {
        url:
          'https://www.datocms-assets.com/2885/1565300480-workload-orchestration.png',
      },
      link: {
        title: 'Learn more',
        url: '/docs/common-workflows/manage-sessions',
      },
    },
  ],
}

describe('<UseCases />', () => {
  it('should render and add a provided className to the root element', () => {
    const className = 'my-use-cases'
    const { container } = render(
      <UseCases {...defaultProps} className={className} />
    )
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render all props correctly', () => {
    render(<UseCases {...defaultProps} />)

    defaultProps.items.map((useCase) => {
      const key = useCase.title

      // anchor
      if (useCase.link) {
        expect(screen.queryByTestId(`anchor-${key}`)).toHaveAttribute(
          'href',
          useCase.link.url
        )
      } else {
        expect(screen.queryByTestId(`anchor-${key}`)).not.toBeInTheDocument()
      }

      // image
      const image = screen.queryByTestId(`image-${key}`)
      if (useCase.image) {
        expect(image.src).toMatch(useCase.image.url)
      } else {
        expect(image).not.toBeInTheDocument()
      }

      // title
      if (useCase.title) {
        expect(screen.getByText(useCase.title)).toBeInTheDocument()
      } else {
        expect(
          screen.queryByTestId(`title-${useCase.title}`)
        ).not.toBeInTheDocument()
      }

      // description
      if (useCase.description) {
        expect(screen.getByText(useCase.description)).toBeInTheDocument()
      } else {
        expect(
          screen.queryByTestId(`description-${key}`)
        ).not.toBeInTheDocument()
      }

      // faux-link
      if (useCase.link) {
        expect(screen.queryByTestId(`faux-link-${key}`)).toHaveTextContent(
          useCase.link.title
        )
      } else {
        expect(screen.queryByTestId(`faux-link-${key}`)).not.toBeInTheDocument()
      }
    })
  })

  it('should render HTML item.descriptions', () => {
    const propsWithHtml = {
      items: [
        {
          title: 'Open and extensible remote access',
          description:
            'Integrate with <strong>existing tooling</strong>and APIs to simplify access.',
          image: {
            url:
              'https://www.datocms-assets.com/2885/1565300480-workload-orchestration.png',
          },
          link: {
            title: 'Learn more',
            url: '/docs/common-workflows/manage-users-groups',
          },
        },
      ],
    }
    render(<UseCases {...propsWithHtml} />)
    const expectedStrong = screen.getByText('existing tooling')
    expect(expectedStrong).toBeInTheDocument()
    expect(expectedStrong.tagName).toBe('STRONG')
  })
})
