/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('./util/integrations', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return Promise.resolve({
      'Example Category': [
        {
          name: 'Google Analytics',
          enabled: true,
          origin: 'segment',
          category: 'Example Category',
          description: 'Analytics service',
        },
        {
          name: 'Test Service',
          enabled: true,
          origin: 'additional',
          category: 'Example Category',
          description: 'Test service description',
        },
      ],
      'Example Category with conditionally loaded service': [
        {
          name: 'Conditional Service',
          enabled: false,
          origin: 'additional',
          category: 'Example Category with conditionally loaded service',
          description: 'Conditional test service',
        },
      ],
    })
  }),
  zipIntegrations: jest.fn((segmentOriginated, additionalServices) => {
    const result = {}

    if (segmentOriginated && Array.isArray(segmentOriginated)) {
      segmentOriginated.forEach((service) => {
        result[service.name] = { ...service, origin: 'segment' }
      })
    }

    if (additionalServices && Array.isArray(additionalServices)) {
      additionalServices.forEach((service) => {
        result[service.name] = { ...service, origin: 'additional' }
      })
    }

    return result
  }),
}))

jest.mock('./util/cookies', () => ({
  loadPreferences: jest.fn(() => ({})),
  savePreferences: jest.fn(),
}))

jest.mock('next/script', () => {
  const MockScript = ({ children, onLoad, ...props }) => {
    React.useEffect(() => {
      if (onLoad) onLoad()
    }, [onLoad])
    return React.createElement('script', props, children)
  }
  MockScript.displayName = 'MockScript'
  return MockScript
})

const mockAnalytics = {
  push: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  page: jest.fn(),
  load: jest.fn(),
  ready: jest.fn((callback) => callback && callback()),
  integrations: jest.fn(() => ({})),
}

beforeAll(() => {
  const createMockDialogElement = () => {
    const element = {
      open: false,
      dispatchEvent: () => {},
    }

    element.show = () => {
      element.open = true
      element.dispatchEvent(new Event('show'))
    }

    element.showModal = () => {
      element.open = true
      element.dispatchEvent(new Event('show'))
    }

    element.close = () => {
      element.open = false
      element.dispatchEvent(new Event('close'))
    }

    return element
  }

  global.HTMLDialogElement = createMockDialogElement
  window.HTMLDialogElement = global.HTMLDialogElement

  const originalCreateElement = document.createElement.bind(document)
  document.createElement = (tagName, options) => {
    if (tagName.toLowerCase() === 'dialog') {
      const element = originalCreateElement('div', options)
      element.show = () => {
        element.open = true
      }
      element.showModal = () => {
        element.open = true
      }
      element.close = () => {
        element.open = false
      }
      element.open = false
      return element
    }
    return originalCreateElement(tagName, options)
  }
})

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''

  delete global.analytics
  delete window.analytics

  document.querySelectorAll('script').forEach((script) => script.remove())

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ integrations: {} }),
    })
  )

  global.analytics = mockAnalytics
  window.analytics = mockAnalytics

  jest.clearAllMocks()

  const { loadPreferences } = require('./util/cookies')
  loadPreferences.mockReturnValue({})

  const originalError = console.error
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes(
        'Warning: An update to ConsentPreferences inside a test was not wrapped in act'
      )
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterEach(() => {
  jest.restoreAllMocks()
  delete global.analytics
  delete window.analytics
  console.error.mockRestore?.()
})

const defaultProps = {
  version: 0,
  showDialog: false,
  segmentWriteKey: 'test-write-key',
  privacyPolicyLink: 'https://www.hashicorp.com/privacy',
  companyName: 'HashiCorp',
  segmentServices: [
    {
      name: 'Google Analytics',
      category: 'Example Category',
      description: 'Analytics service',
    },
  ],
  additionalServices: [
    {
      name: 'Test Service',
      category: 'Example Category',
      description: 'Test service description',
      body: 'console.log("test")',
    },
    {
      name: 'Conditional Service',
      category: 'Example Category with conditionally loaded service',
      description: 'Conditional test service',
      body: 'console.log("conditional")',
      shouldLoad: () => false,
    },
  ],
  categories: [
    {
      name: 'Example Category',
      description: 'A short description of the category',
    },
    {
      name: 'Example Category with conditionally loaded service',
      description: 'A category with conditional services',
    },
  ],
}

describe('ConsentManager', () => {
  let ConsentManager, open

  beforeEach(async () => {
    const module = await import('./index')
    ConsentManager = module.default
    open = module.open
  })

  test('shows the banner if the forceShow prop is true', () => {
    render(<ConsentManager {...defaultProps} forceShow={true} />)
    expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
  })

  test('sets existing preferences and does not show the banner if preferences are already set', async () => {
    const { loadPreferences } = require('./util/cookies')
    loadPreferences.mockReturnValue({ analytics: true, version: 0 })

    render(<ConsentManager {...defaultProps} />)

    expect(screen.queryByTestId('consent-banner')).not.toBeInTheDocument()
  })

  test('shows the banner if preferences are set but version has increased', async () => {
    const { loadPreferences } = require('./util/cookies')
    loadPreferences.mockReturnValue({ analytics: true, version: 0 })

    render(<ConsentManager {...defaultProps} version={1} />)

    await waitFor(() => {
      expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
    })
  })

  test('if the manage preferences button is clicked, opens the dialog and makes body un-scrollable', async () => {
    render(<ConsentManager {...defaultProps} forceShow={true} />)

    await waitFor(() => {
      expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
    })

    const manageButton = screen.getByTestId('manage-preferences')

    await act(async () => {
      await userEvent.click(manageButton)
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    await waitFor(() => {
      expect(screen.getByTestId('consent-mgr-dialog')).toBeInTheDocument()
      expect(document.body).toHaveClass('g-noscroll')
    })
  })

  test('opens the dialog when the open function is called', async () => {
    render(<ConsentManager {...defaultProps} />)

    await act(async () => {
      open()
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    await waitFor(() => {
      expect(screen.getByTestId('consent-mgr-dialog')).toBeInTheDocument()
    })
  })

  test('if accept all button is clicked, any open dialogs are closed and all analytics are loaded', async () => {
    const { savePreferences } = require('./util/cookies')

    render(<ConsentManager {...defaultProps} forceShow={true} />)

    await waitFor(() => {
      expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
    })

    const acceptButton = screen.getByTestId('accept')

    await act(async () => {
      await userEvent.click(acceptButton)
      await new Promise((resolve) => setTimeout(resolve, 200))
    })

    await waitFor(
      () => {
        expect(screen.queryByTestId('consent-banner')).not.toBeInTheDocument()
      },
      { timeout: 2000 }
    )

    expect(savePreferences).toHaveBeenCalledWith(
      expect.objectContaining({
        loadAll: true,
      }),
      expect.any(Number)
    )
  })

  test('loads segment and additional services if loadAll is passed', async () => {
    const { loadPreferences } = require('./util/cookies')
    loadPreferences.mockReturnValue({
      loadAll: true,
      version: 0,
      segment: { 'Google Analytics': true },
      additional: { 'Test Service': true },
    })

    await act(async () => {
      render(<ConsentManager {...defaultProps} />)
      await new Promise((resolve) => setTimeout(resolve, 300))
    })

    const scripts = document.querySelectorAll('script')
    const hasSegmentScript = Array.from(scripts).some(
      (script) =>
        (script.src && script.src.includes('analytics')) ||
        (script.textContent && script.textContent.includes('analytics'))
    )

    const fetchCalled = global.fetch.mock.calls.length > 0

    expect(fetchCalled || hasSegmentScript).toBe(true)
  })

  describe('handles custom events', () => {
    test('manage preferences callback', async () => {
      const onManagePreferences = jest.fn()

      render(
        <ConsentManager
          {...defaultProps}
          forceShow={true}
          onManagePreferences={onManagePreferences}
        />
      )

      await waitFor(() => {
        expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
      })

      const manageButton = screen.getByTestId('manage-preferences')

      await act(async () => {
        await userEvent.click(manageButton)
      })

      expect(onManagePreferences).toHaveBeenCalled()
    })

    test('accept all callback', async () => {
      const onAcceptAll = jest.fn()

      render(
        <ConsentManager
          {...defaultProps}
          forceShow={true}
          onAcceptAll={onAcceptAll}
        />
      )

      await waitFor(() => {
        expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
      })

      const acceptButton = screen.getByTestId('accept')

      await act(async () => {
        await userEvent.click(acceptButton)
      })

      expect(onAcceptAll).toHaveBeenCalled()
    })
  })

  describe('handles conditionally loaded services in dialog', () => {
    test('renders dialog without errors', async () => {
      render(<ConsentManager {...defaultProps} />)

      await act(async () => {
        open()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      await waitFor(() => {
        expect(screen.getByTestId('consent-mgr-dialog')).toBeInTheDocument()
      })

      expect(screen.getByText('Example Category')).toBeInTheDocument()
    })

    test('dialog contains expected elements', async () => {
      render(<ConsentManager {...defaultProps} />)

      await act(async () => {
        open()
        await new Promise((resolve) => setTimeout(resolve, 200))
      })

      await waitFor(() => {
        expect(screen.getByTestId('consent-mgr-dialog')).toBeInTheDocument()
      })

      await waitFor(
        () => {
          expect(screen.getByText('Example Category')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const categoryToggle = screen.getByRole('button', {
        name: 'See more in Example Category',
      })

      await act(async () => {
        await userEvent.click(categoryToggle)
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      await waitFor(
        () => {
          expect(screen.getByText('Google Analytics')).toBeInTheDocument()
          expect(screen.getByText('Test Service')).toBeInTheDocument()
        },
        { timeout: 2000 }
      )
    })
  })
})
