import './global.css'
import { TabProvider } from '../packages/tabs'

export default function MyApp({ Component, pageProps }) {
  return (
    <TabProvider>
      <Component {...pageProps} />
    </TabProvider>
  )
}
