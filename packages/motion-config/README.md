# MotionConfig

MotionConfig handles lazing loading [Framer Motion features](https://www.framer.com/docs/guide-reduce-bundle-size/#available-features). By default, we are including `domMax` to enable layout animations.

## Usage

```tsx
// _app.tsx
import MotionConfig from '@hashicorp/react-motion-config'

export default function App({ Component, pageProps }) {
  return (
    <MotionConfig>
      <Component {...pageProps} />
    </MotionConfig>
  )
}
```
