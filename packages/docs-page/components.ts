import defaultMdxComponents from '@hashicorp/platform-docs-mdx'
import { MDXProviderComponentsProp } from '@mdx-js/react'

export default function generateComponents(
  productName: string,
  additionalComponents: MDXProviderComponentsProp = {}
): MDXProviderComponentsProp {
  return defaultMdxComponents({
    product: productName,
    additionalComponents,
  })
}
