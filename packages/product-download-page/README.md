# Product Downloads Page

The `<ProductDownloadsPage>` is a _page component_ that is intended to drop in and represent the `/downloads` route for HashiCorp product documentation websites

## Installation

```sh
npm install @hashicorp/react-product-downloads-page
```

## Usage

Below is a full example of how the component can be implemented, including all props. Check out [props.js](props.js) for more detail on specific props.

```jsx
import ProductDownloadsPage from '@hashicorp/react-product-downloads-page'
import { generateStaticProps } from '@hashicorp/react-product-download-page/server'

export default function DownloadsPage(staticProps) {
  return (
    <ProductDownloadsPage
      logo={<img alt="Vault" src={require('./img/logo.svg')} />}
      merchandisingSlot={<p>...</p>}
      tutorialLink={{
        label: 'Example',
        href: '<url>',
      }}
      getStartedDescription="Follow step-by-step tutorials on the essentials of Vault."
      getStartedLinks={[
        {
          label: 'Example',
          href: '<url>',
        },
      ]}
      containers={[
        {
          label: 'Example',
          href: '<url>',
        },
      ]}
      tutorials={[
        {
          label: 'Example',
          href: '<url>',
        },
      ]}
      changelog="<url>"
      {...staticProps}
    />
  )
}

export const getStaticProps = generateStaticProps({
  product: 'vault',
  latestVersion: '1.0.0',
})
```
