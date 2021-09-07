import { render, screen, waitFor } from '@testing-library/react'
import Subnav from './'

const baseProps = {
  titleLink: {
    text: 'terraform',
    product: 'terraform',
    url: '/',
  },
  ctaLinks: [
    {
      text: 'GitHub',
      url: 'https://www.github.com/hashicorp/terraform',
    },
    {
      text: 'Download',
      url: '/download',
    },
  ],
  currentPath: '/enterprise',
  menuItems: [
    {
      text: 'Overview',
      url: '/',
    },
    {
      text: 'Use Cases',
      submenu: [
        {
          text: 'Infrastructure as Code',
          url: '/use-cases/infrastructure-as-code',
        },
        {
          text: 'Multi-Cloud Compliance and Management',
          url: '/use-cases/multi-cloud-compliance-and-management',
        },
        {
          text: 'Self-Service Infrastructure',
          url: '/use-cases/self-service-infrastructure',
        },
      ],
    },
    {
      text: 'Enterprise',
      url: '/enterprise',
    },
    'divider',
    {
      text: 'Whitepaper',
      url: '/whitepaper',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
}

describe('<Subnav />', () => {
  it('should pass a provided className to the root element', async () => {
    const className = 'my-special-subnav'
    const { container } = render(
      <Subnav {...baseProps} className={className} />
    )
    await waitForGithubStarsUpdate()
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('NAV')
    expect(rootElem).toHaveClass(className)
  })

  it('should render all top-level menuItems as expected', async () => {
    const { menuItems } = baseProps
    render(<Subnav {...baseProps} />)
    await waitForGithubStarsUpdate()
    menuItems.forEach((menuItem) => {
      if (menuItem === 'divider') return true
      const menuItemTextElem = screen.getAllByText(menuItem.text)[0]
      expect(menuItemTextElem).toBeVisible()
      if (menuItem.url) {
        const linkElem = menuItemTextElem.parentNode
        expect(linkElem.tagName).toBe('A')
        expect(linkElem.getAttribute('href')).toBe(menuItem.url)
      }
    })
  })

  it('should highlight the active link for nested routes when matchOnBasePath=true', async () => {
    render(<Subnav {...baseProps} currentPath="/docs/nested" matchOnBasePath />)
    await waitForGithubStarsUpdate()
    const activeMenuItem = baseProps.menuItems.filter((menuItem) => {
      return menuItem.url === '/docs'
    })[0]
    const menuItemTextElem = screen.getAllByText(activeMenuItem.text)[0]
    expect(menuItemTextElem).toBeVisible()
    expect(menuItemTextElem).toHaveClass('isActive')
  })

  it('should highlight the active link', async () => {
    render(<Subnav {...baseProps} />)
    await waitForGithubStarsUpdate()
    const activeMenuItem = baseProps.menuItems.filter((menuItem) => {
      return menuItem.url === baseProps.currentPath
    })[0]
    const menuItemTextElem = screen.getAllByText(activeMenuItem.text)[0]
    expect(menuItemTextElem).toBeVisible()
    expect(menuItemTextElem).toHaveClass('isActive')
  })

  it('should highlight the dropdown that contains the active link', async () => {
    const testProps = Object.assign({}, baseProps, {
      currentPath: '/use-cases/infrastructure-as-code',
    })
    render(<Subnav {...testProps} />)
    await waitForGithubStarsUpdate()
    const activeMenuItem = testProps.menuItems.filter((menuItem) => {
      if (!menuItem.submenu) return false
      const hasActiveChild = menuItem.submenu.reduce((acc, s) => {
        return s._isActiveUrl || acc
      }, false)
      return hasActiveChild
    })[0]
    const menuItemTextElem = screen.getAllByText(activeMenuItem.text)[0]
    expect(menuItemTextElem).toBeVisible()
    expect(menuItemTextElem).toHaveClass('isActive')
  })

  it('should use a provided Link component to render all links', async () => {
    function TestLink({ href }) {
      return <div data-testid={href} />
    }
    render(<Subnav {...baseProps} Link={TestLink} />)
    await waitForGithubStarsUpdate()
    //  Test for Link use in title link
    const { titleLink } = baseProps
    const titleElem = screen.getAllByTestId(titleLink.url)[0]
    expect(titleElem).toBeVisible()
    //  Test for Link use in menuItem links, including submenus
    baseProps.menuItems.forEach((menuItem) => {
      if (menuItem.url) {
        const menuItemTextElem = screen.getAllByTestId(menuItem.url)[0]
        expect(menuItemTextElem).toBeVisible()
      }
      if (menuItem.submenu) {
        menuItem.submenu.forEach((submenuItem) => {
          if (submenuItem.url) {
            const submenuItemTextElem = screen.getAllByTestId(
              submenuItem.url
            )[0]
            expect(submenuItemTextElem).toBeVisible()
          }
        })
      }
    })
  })

  it('should render ctaLinks as hyperlinks', async () => {
    const { ctaLinks } = baseProps
    render(<Subnav {...baseProps} />)
    await waitForGithubStarsUpdate()
    ctaLinks.forEach((ctaLink) => {
      const ctaTextElem = screen.getAllByText(ctaLink.text)[0]
      expect(ctaTextElem).toBeVisible()
      const linkElem = ctaTextElem.closest('a')
      expect(linkElem.getAttribute('href')).toBe(ctaLink.url)
    })
  })

  it('should render the title linked to the titleUrl', async () => {
    const { titleLink } = baseProps
    const { text, url } = titleLink
    render(<Subnav {...baseProps} />)
    await waitForGithubStarsUpdate()
    const titleElem = screen.getAllByTitle(text)[0]
    expect(titleElem).toBeVisible()
    expect(titleElem.tagName).toBe('A')
    expect(titleElem.getAttribute('href')).toBe(url)
  })

  const logoSlugs = [
    'terraform',
    'vault',
    'consul',
    'nomad',
    'packer',
    'vagrant',
  ]

  logoSlugs.map((logoSlug) => {
    it(`should render product logos for product title "${logoSlug}", with alt text`, async () => {
      render(
        <Subnav
          {...baseProps}
          titleLink={{ text: logoSlug, product: logoSlug }}
        />
      )
      await waitForGithubStarsUpdate()
      const logoElem = screen.getByTitle(logoSlug)
      expect(logoElem).toBeVisible()
      expect(logoElem.firstChild).toBeVisible()
    })
  })

  it.todo('should display a submenu when the related menu item is clicked')

  it.todo('should allow keyboard access to menu items')

  it.todo('should allow keyboard access to submenus')
})

async function waitForGithubStarsUpdate() {
  return waitFor(() =>
    expect(screen.queryByTestId('github-stars')?.innerHTML).not.toBe(
      '<span>—</span>'
    )
  )
}
