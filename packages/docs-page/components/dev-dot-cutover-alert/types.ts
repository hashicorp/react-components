import type { Products } from '@hashicorp/platform-product-meta'

export interface DevDotCutoverAlertProps {
  product: { name: string; slug: Products }
  devDotCutoverInfo: {
    cutoverDate: string
    baseUrl?: string
  }
  handleOptIn?: () => void
  devDotLink?: string
  description?: string
}
