# Case Study Slider

A slider component that can display up to three case studies and allow a visitor to toggle between them, and click through to read.

### Props

- `_data` (obj) - data from the CMS
  - `caseStudies` (array, max items: 3) Collection of case study objects
    - `company` (obj) - company object from Dato
      - `monochromeLogo` (obj)
        - `url` (string) URL to logo
        - `alt` (string) alt text for logo
        - `format` (string) type of image (png, svg, etc)
      - `whiteLogo` (obj)
        - `url` (string) URL to logo
        - `alt` (string) alt text for logo
        - `format` (string) type of image (png, svg, etc)
    - `caseStudyResource` (obj)
      - `slug` (string) Path to resource page
      - `image` (obj)
        - `url` (string) URL to image
        - `alt` (string) alt text for image
        - `format` (string) type of image (png, svg, etc)
    - `headline` (string) headline text of the case study
    - `description` (string) body copy for the case study
- `timing` (integer) - timing value for slide duration in seconds
- `dark` (boolean) - controls button color, progress bar color and logo color
