# Logo Grid

A grid showcasing company logos

### Props

- `size` (str) [default='small'] - 'small', 'medium', or 'large'
- `color` (str) [default='color'] - can also be 'monochrome' or 'white'
- `details` (bool) - creates a popup with company details when clicked if true
- `hash-url` (bool) - hashes the url with the company slug when clicked if true
- `integration-link` (bool) - links to integration page (if available - see `data.integrationPage`)
- `data` (arr) - array of companies
  - `name` (str) - Company name
  - `logo` (obj) - object with a url prop linking to the image
  - `description` (str) - markdown enabled description
  - `link` (str) - link to the company's website
  - `integrationPage` (obj) - an integration page

### Dependents

- sales-form

### Depends On

- hashi-button
- hashi-image
