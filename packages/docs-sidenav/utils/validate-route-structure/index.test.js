import validateRouteStructure from './'

describe('<DocsSidenav /> - validate-route-structure', () => {
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
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid path depth. At depth 1, found path \\"directory/some-nested-dir/some-file\\". Please move this path to the correct depth of 2."`
    )
  })

  it('throws an error if an empty array is passed', () => {
    expect(() => validateRouteStructure([])).toThrowErrorMatchingInlineSnapshot(
      `"Found empty array of navNodes at depth 0. There must be more than one route."`
    )
  })

  it('throws an error if a NavBranch has has an empty array of routes', () => {
    const navData = [
      {
        title: 'Directory',
        routes: [],
      },
    ]
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Found empty array of navNodes at depth 1. There must be more than one route."`
    )
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
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Found mismatched paths at depth 1, with paths: [\\"directory\\",\\"directory/some-file\\",\\"another-directory/another-file\\"]. Implies mismatched parent directories: [\\"directory\\",\\"another-directory\\"]."`
    )
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
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Duplicate routes found for \\"directory\\". Please resolve duplicates."`
    )
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
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Missing nav-data title on NavBranch. Please add a title to the node with the inferred path \\"some-directory\\"."`
    )
  })

  it('throws an error if a NavDirectLink has a missing title', () => {
    const navData = [
      {
        href: '/some-direct-link',
      },
    ]
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Missing nav-data title on NavDirectLink. Please add a title to the node with href \\"/some-direct-link\\"."`
    )
  })

  it('throws an error if a NavDirectLink has an empty href', () => {
    const navData = [
      {
        title: 'Empty Href Link',
        href: '',
      },
    ]
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Empty href value on NavDirectLink. href values must be non-empty strings. Node: {\\"title\\":\\"Empty Href Link\\",\\"href\\":\\"\\"}."`
    )
  })

  it('throws an error for unrecognized nodes', () => {
    const navData = [
      {
        foo: 'bar',
      },
    ]
    expect(() =>
      validateRouteStructure(navData)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Unrecognized nav-data node. Please ensure all nav-data nodes are either NavLeaf, NavBranch, NavDirectLink, NavHeading, or NavDivider types. Invalid node: {\\"foo\\":\\"bar\\"}."`
    )
  })

  it('does not throw an error for a valid nav-data tree with a direct-links-only branch', () => {
    const navData = [
      {
        title: 'Why Use Packer?',
        path: 'why',
      },
      {
        title: 'Direct Link',
        href: 'https://www.hashicorp.com',
      },
      {
        title: 'Direct Links Only Branch',
        routes: [
          {
            title: 'Install',
            href: '/intro/getting-started/install',
          },
          {
            title: 'Build An Image',
            href: '/intro/getting-started/build-image',
          },
        ],
      },
    ]
    expect(() => validateRouteStructure(navData)).not.toThrow()
  })
})
