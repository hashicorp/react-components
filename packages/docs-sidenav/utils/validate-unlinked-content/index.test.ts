import * as path from 'path'
import validateUnlinkedContent from './'

// We have a fixture folder with unlinked content set up
// so that we can properly test this function
const CONTENT_DIR = 'packages/docs-sidenav/fixtures/content-with-unlinked'

describe('<DocsSidenav /> - validate-unlinked-content', () => {
  it('returns a list of .mdx files that are missing from navData', async () => {
    const navData = [
      {
        title: 'This is not all the content',
        path: 'what-is-vault',
      },
      {
        title: 'There are five content files total',
        path: 'hello',
      },
    ]
    const expectedMissing = [
      'agent',
      'nested',
      path.join('nested', 'another-file'),
    ]
    const result = await validateUnlinkedContent(navData, CONTENT_DIR)
    expect(result.sort()).toEqual(expectedMissing.sort())
  })
})
