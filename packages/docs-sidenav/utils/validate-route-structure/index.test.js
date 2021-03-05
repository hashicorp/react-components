import validateRouteStructure from './'

describe('<DocsSidenav /> - validate-file-paths', () => {
  it("throws an error if a NavLeaf's path is an empty string", () => {
    const navData = [
      {
        title: 'Whoops I Left The Path Empty',
        path: '',
      },
    ]
    const emptyPathError = `Empty path value on NavLeaf. Path values must be non-empty strings. Node: ${JSON.stringify(
      navData[0]
    )}.`
    expect(() => validateRouteStructure(navData)).toThrow(emptyPathError)
  })

  it("throws an error if a NavLeaf's path is nested at the wrong depth", () => {
    const navData = [
      {
        title: 'Directory',
        routes: [
          {
            title: 'Overview',
            path: 'directory',
          },
          {
            title: 'Valid Depth',
            path: 'directory/some-file',
          },
          {
            title: 'Invalid Depth',
            path: 'directory/some-nested-dir/some-file',
          },
        ],
      },
    ]
    const depthError = `Invalid path depth. At depth 1, found path "directory/some-nested-dir/some-file". Please move this path to the correct depth of 2.`
    expect(() => validateRouteStructure(navData)).toThrow(depthError)
  })

  it('throws an error if an empty array is passed', () => {
    const emptyRoutesError = `Found empty array of navNodes at depth 0. There must be more than one route.`
    expect(() => validateRouteStructure([])).toThrow(emptyRoutesError)
  })

  it('throws an error if a NavBranch has has an empty array of routes', () => {
    const navData = [
      {
        title: 'Directory',
        routes: [],
      },
    ]
    const emptyRoutesError = `Found empty array of navNodes at depth 1. There must be more than one route.`
    expect(() => validateRouteStructure(navData)).toThrow(emptyRoutesError)
  })

  it('throws an error if sibling routes have different parent routes', () => {
    const navData = [
      {
        title: 'Directory',
        routes: [
          {
            title: 'Overview',
            path: 'directory',
          },
          {
            title: 'Valid Parent',
            path: 'directory/some-file',
          },
          {
            title: 'Invalid Parent',
            path: 'another-directory/another-file',
          },
        ],
      },
    ]
    const siblingError = `Found mismatched paths at depth 1: ["directory","another-directory"].`
    expect(() => validateRouteStructure(navData)).toThrow(siblingError)
  })

  it('throws an error if there are duplicate routes', () => {
    const navData = [
      {
        title: 'Directory Dupe',
        path: 'directory',
      },
      {
        title: 'Directory',
        routes: [
          {
            title: 'Overview',
            path: 'directory',
          },
          {
            title: 'Some File',
            path: 'directory/some-file',
          },
        ],
      },
    ]
    const duplicateError = `Duplicate routes found for "directory". Please resolve duplicates.`
    expect(() => validateRouteStructure(navData)).toThrow(duplicateError)
  })

  it('throws an error if a NavLeaf has a missing title', () => {
    const noTitleNode = { path: 'no-title' }
    const noTitleError = `Missing nav-data title. Please add a non-empty title to the node with the path "no-title".`
    expect(() => validateRouteStructure([noTitleNode])).toThrow(noTitleError)
    const emptyTitleNode = { title: '', path: 'empty-title' }
    const emptyTitleError = `Missing nav-data title. Please add a non-empty title to the node with the path "empty-title".`
    expect(() => validateRouteStructure([emptyTitleNode])).toThrow(
      emptyTitleError
    )
  })

  it('throws an error if a NavBranch has a missing title', () => {
    const navData = [
      {
        routes: [
          {
            title: 'Overview',
            path: 'some-directory',
          },
          {
            title: 'Some File',
            path: 'some-directory/some-file',
          },
        ],
      },
    ]
    const noTitleError = `Missing nav-data title on NavBranch. Please add a title to the node with the inferred path "some-directory".`
    expect(() => validateRouteStructure(navData)).toThrow(noTitleError)
  })

  it('throws an error if a NavDirectLink has a missing title', () => {
    const navData = [
      {
        href: '/some-direct-link',
      },
    ]
    const noTitleError = `Missing nav-data title on NavDirectLink. Please add a title to the node with href "/some-direct-link".`
    expect(() => validateRouteStructure(navData)).toThrow(noTitleError)
  })

  it('throws an error if a NavDirectLink has an empty href', () => {
    const navData = [
      {
        title: 'Empty Href Link',
        href: '',
      },
    ]
    const emptyHrefError = `Empty href value on NavDirectLink. href values must be non-empty strings. Node: ${JSON.stringify(
      navData[0]
    )}.`
    expect(() => validateRouteStructure(navData)).toThrow(emptyHrefError)
  })

  it('throws an error for unrecognized nodes', () => {
    const navData = [
      {
        foo: 'bar',
      },
    ]
    const emptyHrefError = `Unrecognized nav-data node. Please ensure all nav-data nodes are either NavLeaf, NavBranch, NavDirectLink, or NavDivider types. Invalid node: ${JSON.stringify(
      navData[0]
    )}.`
    expect(() => validateRouteStructure(navData)).toThrow(emptyHrefError)
  })
})
