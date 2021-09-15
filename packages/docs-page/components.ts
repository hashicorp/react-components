import defaultMdxComponents from '@hashicorp/platform-docs-mdx'
import { MDXProviderComponentsProp } from '@mdx-js/react'

export default function generateComponents(
  productName: string,
  additionalComponents: MDXProviderComponentsProp = {}
): Record<string, (p: any) => JSX.Element> {
  return defaultMdxComponents({
    product: productName,
    additionalComponents,
  })
}
