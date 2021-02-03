# Hero

Basic full page hero with a lot of customization options.

### Params

- `centered` (bool): [optional] centers all content if true
- `data` (obj): data passed in from datocms
- `theme` (str): defaults to dark theme; `light` changes to light theme
- `backgroundImage` (obj): [optional] url prop contains link to image
- `titleLogo` (obj): [optional] url prop contains link to image. sits above
  headline.
- `title` (str): main title
- `description` (str): smaller text under the subtitle, HTML is supported
- `buttons` (arr): [optional] array of link objects
  - `title` (str): primary button text
  - `url` (str): where the button links to
- `helpText` (str): [optional] HTML supported, usually used for a small link at bottom
- `videos` (arr): [optional] array of videos to be played in a carousel
  - `name` (str): name to be displayed above progress bar
  - `playbackRate` (int): [optional] defaults to 1; video's playback speed
  - `src` (arr): url for video source
    - `srcType` (str): type of video source
    - `url` (str): url of video source
- `centered` (bool): centers all content if true

### Depends On

- hashi-button
- hashi-image
- hashi-alert
