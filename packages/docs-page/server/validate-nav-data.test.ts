import { validateNavData } from './validate-nav-data'
import navData from './__fixtures__/navData.json'

import validateFilePaths from '@hashicorp/react-docs-sidenav/utils/validate-file-paths'
import validateRouteStructure from '@hashicorp/react-docs-sidenav/utils/validate-route-structure'
import validateUnlinkedContent from '@hashicorp/react-docs-sidenav/utils/validate-unlinked-content'

jest.mock('@hashicorp/react-docs-sidenav/utils/validate-file-paths')
jest.mock('@hashicorp/react-docs-sidenav/utils/validate-route-structure')
jest.mock('@hashicorp/react-docs-sidenav/utils/validate-unlinked-content')

// Future: when '@hashicorp/react-docs-sidenav/utils' are converted to TS

// import { mocked } from 'ts-jest/utils'
// const mockedValidateFilePaths = mocked(validateFilePaths)
// const mockedValidateRouteStructure = mocked(validateRouteStructure)
// const mockedValidateUnlinkedContent = mocked(validateUnlinkedContent)

const CONTENT_DIR = 'content/commands'

const validateFilePathsResult = [
  {
    filePath: 'packages/docs-sidenav/fixtures/content/what-is-vault.mdx',
    path: 'what-is-vault',
    title: 'What is Vault?',
  },
]

describe('validateNavData', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should validate nav data', async () => {
    validateFilePaths.mockImplementation(async () => validateFilePathsResult)
    validateRouteStructure.mockImplementation(async () => undefined)
    validateUnlinkedContent.mockImplementation(async () => [])

    const res = await validateNavData(navData, CONTENT_DIR)

    expect(validateFilePaths).toHaveBeenCalledWith(navData, 'content/commands')
    expect(validateRouteStructure).toHaveBeenCalledWith(validateFilePathsResult)
    expect(validateUnlinkedContent).toHaveBeenCalledWith(
      navData,
      'content/commands'
    )

    expect(res).toMatchInlineSnapshot(`
Array [
  Object {
    "filePath": "packages/docs-sidenav/fixtures/content/what-is-vault.mdx",
    "path": "what-is-vault",
    "title": "What is Vault?",
  },
]
`)
  })
})
