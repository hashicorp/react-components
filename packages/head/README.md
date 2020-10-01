# Hashicorp Head

The **Hashicorp Head** component lets you create a Hashicorp branded `<head>` in NextJS projects.

```shell
npm install @hashicorp/react-head
```

## Usage

```jsx
// usage in custom documents
import { Head } from 'next/document'
import HashiHead from '@hashicorp/react-head'

<HashiHead is={Head} />

// becomes
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>About | Hashicorp</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="article:publisher" content="https://www.facebook.com/HashiCorp/"/>
  <meta name="twitter:site" content="@HashiCorp" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

```jsx
// usage in pages
import Head from 'next/head'
import HashiHead from '@hashicorp/react-head'

<HashiHead is={Head} title="About | Hashicorp" />

// becomes
<head>
  <meta charset="utf-8" />
  <title>About | Hashicorp</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta name="twitter:site" content="@HashiCorp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="article:publisher" content="https://www.facebook.com/HashiCorp/"/>
</head>
```

---

## Props

### is

The `is` prop defines the **Head** tag being used, which might be [`next/head`](https://nextjs.org/docs/api-reference/next/head) or [`head` from custom document](https://nextjs.org/docs/advanced-features/custom-document).

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'
import HashiHead from '@hashicorp/react-head'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <HashiHead is={Head} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

### title

The `title` property sets page name used by the browser. It may include branding such as the site name.

```jsx
<HashiHead is={Head} title="Page Name | Site Name" />

// becomes
<title>Page Name | Site Name</title>
```

For the external page name use the `pageName` property, which does not include any branding such as the site name. For the site name use the `siteName` property.

### description

The `description` property sets the page description used externally.

```jsx
<HashiHead is={Head} description="Page Description" />

// becomes
<meta property="og:description" name="description" content="Page Description">
```

### image

The `image` property sets the page image used externally.

```jsx
<HashiHead is={Head} image="/img/share/share.png" />

// becomes
<meta property="og:image" content="/img/share/share.png">
```

See https://developers.facebook.com/docs/sharing/webmasters/#basic for details and best practices.

### pageName

The `pageName` property sets the page name used externally without any branding such as the site name.

```jsx
<HashiHead is={Head} title="Page Title | Hashicorp" pageName="Page Title" />

// becomes
<title>Page Title | Hashicorp</title>
<meta property="og:title" content="Page Title" />
```

For the browser page name use the `title` property. For the site name use the `siteName` property.

See https://developers.facebook.com/docs/sharing/webmasters/#basic for details and best practices.

### siteName

The `siteName` property sets site name used externally.

```jsx
<HashiHead is={Head} siteName="Hashicorp" />

// becomes
<meta property="og:site_name" content="Hashicorp" />
```

See https://ogp.me/#optional for details.

---

## presentational props

### stylesheet

The `stylesheet` property defines one or more `<link rel="stylesheet">` tags.
Use it to add global styles to the page.

```jsx
<HashiHead is={Head} stylesheet={[
  { href: '/css/critical.css' },
  { href: '/css/style.css' },
  { href: '/css/print.css', media: 'print' }
]} />

// becomes
<link rel="stylesheet" href="/css/critical.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/print.css" media="print">
```

### preload

The `preload` property defines one or more `<link rel="preload">` tags.
Use it when you’ll need a resource soon.

```jsx
<HashiHead is={Head} preload={[{
  href: '/css/style.css', as: 'style',
  href: '/fonts/gilmer/regular.woff2', as: 'font',
  href: '/videos/short', as: 'video', type: 'video/mp4'
}]} />

// becomes
<link rel="preload" href="/css/style.css" as="style">
<link rel="preload" href="/fonts/gilmer/regular.woff2" as="font">
<link rel="preload" href="/videos/short.mp4" as="video" type="video/mp4">
```

### icon

The `icon` property defines one or more `<link rel="icon">` tags.

```jsx
<HashiHead is={Head} icon={[
  { href: '/favicon.ico', type: 'image/x-icon' },
  { href: '/favicon.gif', type: 'image/gif' },
  { href: '/favicon@32x32.png', sizes: '32x32' },
  { href: '/favicon@64x64.png', sizes: '64x64' }
]} />

// becomes
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.gif" type="image/gif">
<link rel="icon" href="favicon@32x32.png" sizes="32x32">
<link rel="icon" href="favicon@64x64.png" sizes="64x64">
```

---

## children

Additional children may also be appended as regular elements.

```jsx
<HashiHead is={Head}>
  <meta property="article:section" content="Technology" />
</HashiHead>

// becomes
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>About | Hashicorp</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="article:publisher" content="https://www.facebook.com/HashiCorp/"/>
  <meta name="twitter:site" content="@HashiCorp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="article:section" content="Technology" />
</head>
```
