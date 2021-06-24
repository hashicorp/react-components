import { render } from '@testing-library/react'

describe('<Head />', () => {
  const container = document.documentElement
  const renderHead = (component) => render(component, { container })
  const metaHttpEquivHTML =
    '<meta http-equiv="x-ua-compatible" content="ie=edge">'
  const metaDefaultTagsHTML =
    '<meta property="og:locale" content="en_US"><meta property="og:type" content="website"><meta property="article:publisher" content="https://www.facebook.com/HashiCorp/"><meta name="twitter:site" content="@HashiCorp"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#000">'
  let Head

  beforeEach(async () => {
    jest.resetModules()
    jest.mock('next/head', () => 'head')
    const { default: MockedHead } = await import('./')
    Head = MockedHead
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should render and display <head> tags', () => {
    const { container } = renderHead(<Head />)

    expect(container.innerHTML).toBe(
      ['<head>', metaHttpEquivHTML, metaDefaultTagsHTML, '</head>'].join('')
    )
  })

  it('should render and display <title> tag', () => {
    const { container } = renderHead(<Head title="Page Title" />)

    expect(container.innerHTML).toBe(
      [
        '<head>',
        '<title>Page Title</title>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '</head>',
      ].join('')
    )
  })

  it('should render and display <meta name="description"> tag', () => {
    const { container } = renderHead(<Head description="Page Description" />)

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<meta name="description" property="og:description" content="Page Description">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <meta name="og:site_name"> tag', () => {
    const { container } = renderHead(<Head siteName="Hashicorp" />)

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<meta property="og:site_name" content="Hashicorp">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <meta name="og:title"> tag', () => {
    const { container } = renderHead(<Head pageName="Page Title" />)

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<meta property="og:title" content="Page Title">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <meta name="og:image"> tag', () => {
    const { container } = renderHead(<Head image="/site-image.jpg" />)

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<meta property="og:image" content="/site-image.jpg">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <link rel="preload"> tags', () => {
    const { container } = renderHead(
      <Head preload={[{ href: '/style.css', as: 'stylesheet' }]} />
    )

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<link href="/style.css" as="stylesheet" rel="preload">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <link rel="icon"> tags', () => {
    const { container } = renderHead(
      <Head icon={[{ href: '/favicon.gif', type: 'image/gif' }]} />
    )

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<link href="/favicon.gif" type="image/gif" rel="icon">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display <link rel="stylesheet"> tags', () => {
    const { container } = renderHead(
      <Head
        stylesheet={[
          { href: '/style.css' },
          { href: '/print.css', media: 'print' },
        ]}
      />
    )

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<link href="/style.css" rel="stylesheet">',
        '<link href="/print.css" media="print" rel="stylesheet">',
        '</head>',
      ].join('')
    )
  })

  it('should render and display children', () => {
    const { container } = renderHead(
      <Head>
        <meta property="article:section" content="Technology" />
      </Head>
    )

    expect(container.innerHTML).toBe(
      [
        '<head>',
        metaHttpEquivHTML,
        metaDefaultTagsHTML,
        '<meta property="article:section" content="Technology">',
        '</head>',
      ].join('')
    )
  })
})
