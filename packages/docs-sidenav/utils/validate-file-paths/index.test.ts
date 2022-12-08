import path from 'path'
import validateFilePaths from './'

// We have a content folder fixture set up so that
// we can properly test this function
const CONTENT_DIR = 'packages/docs-sidenav/fixtures/content'

describe('<DocsSidenav /> - validate-file-paths', () => {
  it('resolves the path for a named .mdx file', async () => {
    const navData = [
      {
        title: 'What is Vault?',
        path: 'what-is-vault',
      },
    ]
    const withFilePaths = await validateFilePaths(navData, CONTENT_DIR)
    const resolvedPath = withFilePaths[0].filePath
    expect(resolvedPath).toBe(path.join(CONTENT_DIR, 'what-is-vault.mdx'))
  })

  it('resolves the path for an index.mdx file', async () => {
    const navData = [
      {
        title: 'Vault Agent',
        routes: [
          {
            title: 'Overview',
            path: 'agent',
          },
        ],
      },
    ]
    const withFilePaths = await validateFilePaths(navData, CONTENT_DIR)
    const resolvedPath = withFilePaths[0].routes[0].filePath
    expect(resolvedPath).toBe(path.join(CONTENT_DIR, 'agent', 'index.mdx'))
  })

  it('throws an error if there is a NavLeaf with a missing file', async () => {
    const navData = [
      {
        title: 'Missing File Example',
        path: 'this-file-should-not-exist',
      },
    ]
    await expect(validateFilePaths(navData, CONTENT_DIR)).rejects.toThrow(
      `Could not find file to match path "this-file-should-not-exist". Neither "this-file-should-not-exist.mdx" or "${path.join(
        'this-file-should-not-exist',
        'index.mdx'
      )}" could be found.`
    )
  })

  it('throws an error if there is a NavLeaf with an ambiguous file', async () => {
    const navData = [
      {
        title: 'Ambiguous File Example',
        path: 'ambiguous',
      },
    ]
    await expect(validateFilePaths(navData, CONTENT_DIR)).rejects.toThrow(
      `Ambiguous path "ambiguous". Both "ambiguous.mdx" and "${path.join(
        'ambiguous',
        'index.mdx'
      )}" exist. Please delete one of these files.`
    )
  })
})
