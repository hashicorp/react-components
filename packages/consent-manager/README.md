# Consent Manager

A GDPR-compliant consent manager.

### Props

- `version` (integer) - version number, bump up to override previous consent preferences
- `container` (string) - id of container where the consent manager should live
- `companyName` (string) - your company name to be inserted in various copy
- `privacyPolicyLink` (string) - link to your company's privacy policy
- `segmentWriteKey` (string) - your production segment write key
- `segmentServices` (array of objects) - use this to override the category or description of a service provided by Segment
  - `name` - name of the Segment integration, must match the integration you are overriding
  - `category` _[optional]_ - new category name
  - `description` _[optional]_ - new description
- `categories` (array) - State of toggle
  - `name` - name of category
  - `description` - description for the category
- `additionalServices` (array of objects) - additional integrations outside of Segment that you wish to include in the consent manager
  - `name` - name of service
  - `description` - description of service
  - `category` - category of service
  - `body` _[optional]_ - javascript body associated with service _If present, overrides `url` below_
  - `url` _[optional]_ - url of js file associated with service
  - `async` (bool) _[optional]_ - add `async` property to script element
  - `addToBody` (bool) _[optional]_ - inject script before closing `<body>` tag
  - `dataAttrs` (arr) _[optional]_ - array of `data-` attributes to add to script tag
    - `name` (str) - name of data attribute (`data-name`)
    - `value` (str) - value of `data` attribute to set

# Upgrading from `v8` to `v9`

```
npm install @hashicorp/react-consent-manager@latest
```

> **Warning**: `v9` is technically not a breaking change, but there are some significant changes to be aware of with regards to our analytics.

As of `v9.0.0`, the Segment CDN hostname has been replace with a HashiCorp hostname via `analytics._cdn`. A custom Segment Analytics.js URL is also being used. There is no breaking change to the react component API.

## `SegmentPreloadScript`

In `v9.0.0`, ConsentManager now exports a `SegmentPreloadScript` component. Why? ConsentManager uses a very similar Segment script to the current preloading script that we use in our `_document.tsx/js` files.

Now that we're updating both with a custom Segment AJS URL and CDN hostname, it makes sense for the two to be co-located.

Expect the new change to look like the following:

```diff
// pages/_document.tsx


  import Document, { Html, Head, Main, NextScript } from 'next/document'
  import HashiHead from '@hashicorp/react-head'
+ import { SegmentPreloadScript } from '@hashicorp/react-consent-manager/scripts/segment'
  // other imports

  export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }

    render() {
      return (
        <Html lang="en">
          <Head>
            <HashiHead />
          </Head>
          <body>
-           <script
-             dangerouslySetInnerHTML={{
-               __html: `!function(){var analytics=window... ... ...`
-             }}
-           />
+           <SegmentPreloadScript />

// etc...
```

No additional updates are necessary!
