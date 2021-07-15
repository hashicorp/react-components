import defaultMdxComponents from '@hashicorp/platform-docs-mdx'

export default function generateComponents(
  productName,
  additionalComponents = {}
) {
  return defaultMdxComponents({
    product: productName,
    additionalComponents,
  })
}
