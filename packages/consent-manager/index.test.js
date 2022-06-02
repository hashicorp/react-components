import { fireEvent, render, screen, act } from '@testing-library/react'

const defaultProps = {
  version: 0,
  showDialog: false,
  segmentWriteKey: 'iyi06c432UL7SB1r3fQReec4bNwFyzkW',
  utilServerRoot: 'https://hashicorp-web-util-staging.herokuapp.com',
  privacyPolicyLink: 'https://www.hashicorp.com/privacy',
  companyName: 'HashiCorp',
  segmentServices: [
    {
      name: 'Example Name',
      category: 'Example Category',
      description:
        'A short description of what the service is and how your company uses the data.',
    },
  ],
  additionalServices: [
    {
      name: 'Name of the service',
      category: 'Example Category',
      description:
        'A short description of what the service is and how your company uses the data.',
      body: '',
      url: 'http://www.an-optional-url-for-a-script-to-add-to-the-page.com',
    },
    {
      name: 'Name of the service 2',
      category: 'Example Category',
      description: 'A script with additional elements to be injected',
      body: '',
      url: 'https://source-url-of-script.com',
      async: true,
      addToBody: true,
      dataAttrs: [
        {
          name: 'test',
          value: 'foobar',
        },
      ],
    },
    {
      name: 'Name of the service 3',
      category: 'Example Category',
      description: 'A script with additional elements to be injected',
      body: 'window.foo = "bar"',
      dataAttrs: [
        {
          name: 'test',
          value: 'foobar',
        },
      ],
    },
  ],
  categories: [
    {
      name: 'Example Category',
      description: 'A short description of the category',
    },
  ],
  container: '#consent-manager',
}

test('shows the banner if the forceShow prop is true', () => {
  const { default: ConsentManager } = require('./')
  render(<ConsentManager {...defaultProps} forceShow={true} />)
  expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
})

test('sets existing preferences and does not show the banner if preferences are already set', async () => {
  await runWithMockedImport(
    './util/cookies',
    {
      loadPreferences: () => {
        return { loadAll: false, segment: false, version: 0 }
      },
      savePreferences: () => {},
    },
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={false} />)
      expect(screen.queryByTestId('consent-banner')).not.toBeInTheDocument()
    }
  )
})

test('shows the banner if preferences are set but version has increased', async () => {
  await runWithMockedImport(
    './util/cookies',
    {
      loadPreferences: () => {
        return { loadAll: false, segment: false, version: 1 }
      },
      savePreferences: () => {},
    },
    (MockedConsentManager) => {
      render(
        <MockedConsentManager {...defaultProps} forceShow={false} version={2} />
      )
      expect(screen.queryByTestId('consent-banner')).toBeInTheDocument()
    }
  )
})

test('if the manage preferences button is clicked, opens the dialog and makes body un-scrollable', async () => {
  await runWithMockedImport(
    './components/dialog',
    () => {
      return <p data-testid="mocked-dialog">test</p>
    },
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={true} />)
      fireEvent.click(screen.getByTestId('manage-preferences'))
      expect(screen.getByTestId('mocked-dialog')).toBeInTheDocument()
      expect(document.body.className).toBe('g-noscroll')
    }
  )
})

test('opens the dialog when the open function is called', async () => {
  await runWithMockedImport(
    './components/dialog',
    () => {
      return <p data-testid="mocked-dialog">test</p>
    },
    async (MockedConsentManager, open) => {
      render(<MockedConsentManager {...defaultProps} />)
      act(() => open())
      expect(screen.getByTestId('mocked-dialog')).toBeInTheDocument()
      expect(document.body.className).toBe('g-noscroll')
    }
  )
})

test('if accept all button is clicked, any open dialogs are closed and all analytics are loaded', async () => {
  let prefs
  await runWithMockedImport(
    './util/cookies',
    {
      loadPreferences: () => {},
      savePreferences: (preferences) => {
        prefs = preferences
      },
    },
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={true} />)
      fireEvent.click(screen.getByTestId('accept'))
    }
  )
  expect(prefs.loadAll).toBe(true)
})

test('loads segment and additional services if loadAll is passed', async () => {
  await runWithMockedImport(
    './util/cookies',
    {
      loadPreferences: () => {
        return { loadAll: true, segment: { foo: 'bar' } }
      },
      savePreferences: () => {},
    },
    (MockedConsentManager) => {
      render(
        <MockedConsentManager {...defaultProps} forceShow={false} version={2} />
      )
      const html = document.body.innerHTML
      // script was injected
      expect(html).toMatch(
        /<script type="text\/javascript" src="https:\/\/cdn.segment.com\/analytics\.js/
      )
      // all services loaded, as well as custom segment
      expect(html).toMatch(
        /analytics\.load\("iyi06c432UL7SB1r3fQReec4bNwFyzkW", {"integrations":{"All":true,"Segment\.io":true,"foo":"bar"}}\);/
      )

      // custom service loaded
      expect(html).toMatch(
        /src="http:\/\/www.an-optional-url-for-a-script-to-add-to-the-page\.com"/
      )

      // custom inline script
      expect(html).toMatch(/window\.foo = "bar"/)
    }
  )
})

describe('handles custom events', () => {
  test('manage preferences callback', async () => {
    const fn = jest.fn()
    await runWithMockedImport(
      './components/dialog',
      () => {
        return <p data-testid="mocked-dialog">test</p>
      },
      (MockedConsentManager) => {
        render(
          <MockedConsentManager
            {...defaultProps}
            forceShow={true}
            onManagePreferences={fn}
          />
        )
        fireEvent.click(screen.getByTestId('manage-preferences'))
        expect(fn).toHaveBeenCalled()
      }
    )
  })

  test('accept all callback', async () => {
    const fn = jest.fn()
    await runWithMockedImport(
      './components/dialog',
      () => {
        return <p data-testid="mocked-dialog">test</p>
      },
      (MockedConsentManager) => {
        render(
          <MockedConsentManager
            {...defaultProps}
            forceShow={true}
            onAcceptAll={fn}
          />
        )
        fireEvent.click(screen.getByTestId('accept'))
        expect(fn).toHaveBeenCalled()
      }
    )
  })
})

// Given an internal module name and mock implementation, mocks the given module and returns a version
// of the component with the module mocked.
async function runWithMockedImport(module, mock, cb) {
  jest.isolateModules(() => {
    jest.doMock(module, () => mock)
    const { default: ConsentManager, open } = require('./')
    cb(ConsentManager, open)
  })
}
