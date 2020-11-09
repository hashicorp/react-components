### Image

> ⚠️Avoid using this component to render images local to your project. This component expects image source URLs to be from DatoCMS (e.g coming from 'https://www.datocms-assets.com`) as it appends query parameters to control various image attributes like format and sizing. Dato is using [Imgix](https://docs.imgix.com/apis/url) under the hood. ⚠️

Super optimized image element, pulls from dato and formats for 7 screen sizes in
two formats. Skips optimization for SVGs.

### Props

- `url` (str): url of the image [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-src)
- `alt` (str): [optional] alt text for the image [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt)
- `format` (str): [optional] format of the image, for example `svg`, `jpg`, `png`, etc.
- `steps` (arr): [optional] array of screen sizes to optimize for
- `sizes` (str): [optional] same as sizes on an img tag [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
- `aspectRatio` (arr): [optional] automatically crops to aspect ratio. first two items in the array are the ratio (ex. `[16,9]`), and the third is the base width that images will be cropped to in IE, which doesn't support srcset (ex. `[16,9,500]`).
- `imgixOptions` (obj): [optional] params passed directly to imgix, [reference here](https://docs.imgix.com/apis/url)

See [the props file](props.js) for more details.

### Dependents:

- `hero`
- `logo-grid`
- `nav`
- `person-list`
- `resource-list`
- `text-and-image`
