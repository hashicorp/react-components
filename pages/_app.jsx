import './global.css'
import { TabProvider } from '../packages/tabs'
import MotionConfig from '../packages/motion-config'

export default function MyApp({ Component, pageProps }) {
  return (
    <MotionConfig>
      <TabProvider>
        <Component {...pageProps} />
      </TabProvider>
    </MotionConfig>
  )
}
