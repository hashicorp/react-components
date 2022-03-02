import React from 'react'
import { render } from '@testing-library/react'
import { renderMetaTags } from './seo'

describe('renderMetaTags', () => {
  const container = document.documentElement
  const renderHead = (component) => render(component, { container })

  test('should render empty <head> tag', () => {
    const { container } = renderHead(<head>{renderMetaTags([])}</head>)
    expect(container.firstChild).toMatchInlineSnapshot(`<head />`)
  })

  test('should render tags with content and no attributes', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: null,
            content: 'Vault by HashiCorp',
            tag: 'title',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <title>
          Vault by HashiCorp
        </title>
      </head>
    `)
  })

  test('should render tags with attributes and no content', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'description',
              property: 'og:description',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="og:description"
          content="description"
          property="og:description"
        />
      </head>
    `)
  })

  test('should render tags with unknown property values', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'random unknown content',
              property: 'random:tags',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'more unknown content',
              name: 'more:tags',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="random:tags"
          content="random unknown content"
          property="random:tags"
        />
        <meta
          _testkey="more:tags"
          content="more unknown content"
          name="more:tags"
        />
      </head>
    `)
  })

  test('should merge property and name fields for key', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'unknown content',
              property: 'more:random:tags',
              name: 'more:tags:random',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="more:random:tags-more:tags:random"
          content="unknown content"
          name="more:tags:random"
          property="more:random:tags"
        />
      </head>
    `)
  })

  test('should render multiple tags with attributes and no content', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'description',
              property: 'og:description',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'https://www.image.com',
              property: 'og:image',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="og:description"
          content="description"
          property="og:description"
        />
        <meta
          _testkey="og:image"
          content="https://www.image.com"
          property="og:image"
        />
      </head>
    `)
  })

  test('should merge known similar tags with same content', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'description',
              property: 'og:description',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'description',
              name: 'twitter:description',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'title',
              property: 'og:title',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'title',
              name: 'twitter:title',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'https://www.image.com',
              property: 'og:image',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'https://www.image.com',
              name: 'twitter:image',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              property: 'og:image:width',
              content: '2400',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              property: 'og:image:height',
              content: '1254',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="og:description"
          content="description"
          name="twitter:description"
          property="og:description"
        />
        <meta
          _testkey="og:title"
          content="title"
          name="twitter:title"
          property="og:title"
        />
        <meta
          _testkey="og:image"
          content="https://www.image.com"
          name="twitter:image"
          property="og:image"
        />
        <meta
          _testkey="og:image:width"
          content="2400"
          property="og:image:width"
        />
        <meta
          _testkey="og:image:height"
          content="1254"
          property="og:image:height"
        />
      </head>
    `)
  })

  test('should not merge known similar tags with different content', () => {
    const { container } = renderHead(
      <head>
        {renderMetaTags([
          {
            attributes: {
              content: 'og description',
              property: 'og:description',
            },
            content: null,
            tag: 'meta',
          },
          {
            attributes: {
              content: 'twitter description',
              name: 'twitter:description',
            },
            content: null,
            tag: 'meta',
          },
        ])}
      </head>
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <head>
        <meta
          _testkey="og:description"
          content="og description"
          property="og:description"
        />
        <meta
          _testkey="twitter:description"
          content="twitter description"
          name="twitter:description"
        />
      </head>
    `)
  })
})
