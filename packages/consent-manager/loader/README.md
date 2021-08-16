# Consent Manager Loader

The consent manager component is large and complex, with many configurable options. The consent manager loader interface makes a bunch of assumptions and strips down the number of configurable options to very few, which is enough to do the trick for most of our web properties.

The loader also ships with a couple **presets**, which load in standard sets of tracking scripts that we tend to adhere towards. Currently, the available options are `oss` and `enterprise`.

## Usage

Code block below shows basic usage:

```js
import createConsentManager from '@hashicorp/react-consent-manager/loader'

const { ConsentManager, openConsentManager } = createConsentManager({
  preset: 'oss',
})

// sample implementation
export default function SomePage() {
  return (
    <>
      <p>my page content</p>
      <ConsentManager />
    </>
  )
}
```

Check out the [types](types.ts) to get an overview of the full options that can be passed in!
