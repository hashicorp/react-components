import * as fs from 'fs'
import * as path from 'path'

import { serialize } from 'next-mdx-remote/serialize'
import { anchorLinks } from '@hashicorp/platform-remark-plugins'
import jumpToSection from '@hashicorp/platform-remark-plugins/plugins/jump-to-section'

import { GetStaticPropsContext } from 'next'

const loadSampleMdx = async (ctx: GetStaticPropsContext, staticProps) => {
  if (ctx.params.swingset?.includes('docspage')) {
    const sampleMdxSource = fs.readFileSync(
      path.join(process.cwd(), 'packages/docs-page/__fixtures__/sample.mdx'),
      'utf-8'
    )

    const headings = []
    const { compiledSource, scope } = await serialize(sampleMdxSource, {
      mdxOptions: {
        remarkPlugins: [[anchorLinks, { headings }], jumpToSection],
      },
      scope: { headings },
    })

    staticProps.props.mdxSource.scope.componentProps.staticProps.properties.mdxSource.testValue = {
      compiledSource,
      scope,
    }

    return staticProps
  }

  return staticProps
}

export default loadSampleMdx
