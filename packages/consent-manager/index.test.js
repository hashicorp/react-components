import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ConsentManager } from './'

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
      body:
        '// a chunk of javascript to add to the page if permission is granted\n// this is optional',
      url: 'http://www.an-optional-url-for-a-script-to-add-to-the-page.com',
    },
    {
      name: 'Name of the service',
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
  ],
  categories: [
    {
      name: 'Example Category',
      description: 'A short description of the category',
    },
  ],
  container: '#consent-manager',
  forceShow: true,
}

test('shows the banner if the forceShow prop is true', () => {
  render(<ConsentManager {...defaultProps} forceShow={true} />)
  expect(screen.getByTestId('consent-banner')).toBeInTheDocument()
})

test('shows the banner if in EU', async () => {
  await runWithMockedImport(
    '@segment/in-eu',
    () => true,
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={false} />)
      expect(screen.queryByTestId('consent-banner')).toBeInTheDocument()
    }
  )
})

test('does not show the banner if not in EU', async () => {
  await runWithMockedImport(
    '@segment/in-eu',
    () => false,
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={false} />)
      expect(screen.queryByTestId('consent-banner')).not.toBeInTheDocument()
    }
  )
})

test('sets existing preferences and does not show the banner if preferences are already set', async () => {
  await runWithMockedImport(
    './cookies',
    {
      loadPreferences: () => {
        return { All: false, 'Segment.io': false }
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
    './cookies',
    {
      loadPreferences: () => {
        return { All: false, 'Segment.io': false, version: 1 }
      },
      savePreferences: () => {},
    },
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} version={2} />)
      expect(screen.queryByTestId('consent-banner')).toBeInTheDocument()
    }
  )
})

test('automatically opts in to all if not in EU', async () => {
  let prefs
  await runWithMockedImport(
    './cookies',
    {
      loadPreferences: () => {},
      savePreferences: (preferences) => {
        prefs = preferences
      },
    },
    (MockedConsentManager) => {
      render(<MockedConsentManager {...defaultProps} forceShow={false} />)
    }
  )
  expect(prefs.loadAll).toBe(true)
})

test('if the manage preferences button is clicked, opens the dialog and makes body un-scrollable', async () => {
  await runWithMockedImport(
    './dialog',
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
    './dialog',
    () => {
      return <p data-testid="mocked-dialog">test</p>
    },
    async (MockedConsentManager, open) => {
      render(<MockedConsentManager {...defaultProps} />)
      open()
      expect(screen.getByTestId('mocked-dialog')).toBeInTheDocument()
      expect(document.body.className).toBe('g-noscroll')
    }
  )
})

test('if accept all button is clicked, any open dialogs are closed and all analytics are loaded', async () => {
  let prefs
  await runWithMockedImport(
    './cookies',
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

// Given an internal module name and mock implementation, mocks the given module and returns a version
// of the component with the module mocked.
async function runWithMockedImport(module, mock, cb) {
  jest.resetModules()
  jest.mock(module, () => mock)
  const { ConsentManager, open } = await import('./')
  cb(ConsentManager, open)
  jest.resetAllMocks()
}
