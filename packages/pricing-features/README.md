# Pricing Features

The `<PricingFeatures />` component is used to display an array of feature sections including a heading, optional footnote, and content. `content` can include either:

- feature tabs with table data
- table data on its own.

Note: Tabs _should_ display an svg icon but is shown as text in due to limitations in Swingset.

On mobile, a block is displayed that contains a pdf download button.

Each component is exported and available for use on their own:
` import { Table, Tabs, DownloadBlock } from '@hashicorp/react-pricing-features'`

This package also exports a helper function used to format incoming data from DatoCMS `normalizeTableData`.

## Installation

```sh
npm install @hashicorp/react-pricing-features
```
