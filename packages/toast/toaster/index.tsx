import { Toaster as ReactHotToaster } from 'react-hot-toast'

export default function Toaster() {
  return (
    <ReactHotToaster
      position="bottom-left"
      gutter={16}
      containerStyle={{
        inset: 24,
      }}
    />
  )
}
