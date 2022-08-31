# Pricing Features

The `<PricingFeatures />` component is used to display an array of feature sections including a heading, optional footnote, and content. `content` can include either:

- feature tabs with table data
- table data on its own

Note: Tabs _should_ display an icon image but is shown as text due to Swingset limitations. In practice, we use our `<Icon />` component.

On mobile, a block is displayed that contains a pdf download button.

Each content component is exported and available for use on their own:
`import { Table, Tabs, DownloadBlock } from '@hashicorp/react-pricing-features'`

StickyTiers and DownloadBlock are also exported.
`import { StickyTiers, DownloadBlock } from '@hashicorp/react-pricing-features'`

This package also exports a helper function used to format incoming data from DatoCMS `normalizeTableData`.
`import { normalizeTableData } from '@hashicorp/react-pricing-features'`

## Installation

```sh
npm install @hashicorp/react-pricing-features
```
