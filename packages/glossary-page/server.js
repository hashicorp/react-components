import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { validateFilePaths } from '@hashicorp/react-docs-page/server'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import generateSlug from '@hashicorp/remark-plugins/generate_slug'

export default async function generateStaticProps({
  navDataFile,
  product,
  mainBranch = 'main',
}) {
  const docsPath = path.join(process.cwd(), 'content', 'docs')

  //  Read in the nav-data.json file
  const navDataFilePath = path.join(process.cwd(), navDataFile)
  const navDataRaw = JSON.parse(fs.readFileSync(navDataFilePath, 'utf8'))
  const navData = await validateFilePaths(navDataRaw, docsPath)

  //  Construct the mdxSource from the provided terms
  const { terms, mdxBlob } = await getGlossaryTerms()
  const mdxSource = await serialize(mdxBlob, {
    mdxOptions: markdownDefaults({
      resolveIncludes: path.join(process.cwd(), 'content/partials'),
    }),
  })

  // Construct the githubFileUrl, used for "Edit this page" link
  const githubFileUrl = `https://github.com/hashicorp/${product.slug}/blob/${mainBranch}/website/content/glossary`

  return {
    props: {
      terms,
      mdxSource,
      navData,
      githubFileUrl,
    },
  }
}

async function getGlossaryTerms() {
  const glossaryDir = path.join(process.cwd(), 'content', 'glossary')

  // get a list of paths to all term files
  const termFiles = (await fs.promises.readdir(glossaryDir)).map((filename) =>
    path.join(glossaryDir, filename)
  )

  let mdxBlob = ''

  // read the mdx files, add heading elements to the markdown, and sort
  const terms = (
    await Promise.all(
      termFiles.map(async (filePath) => {
        const source = await fs.promises.readFile(filePath, {
          encoding: 'utf-8',
        })
        const { content, data } = matter(source)

        return {
          title: data.title,
          slug: generateSlug(data.title),
          content: `## ${data.title}\n${content}`,
        }
      })
    )
  ).sort(({ titleA }, { titleB }) => titleA > titleB)

  // create a single mdx blob so we only have a single call out to next-mdx-remote. This reduces generated boilerplate code
  for (const term of terms) {
    mdxBlob = mdxBlob.concat('\n', term.content)
  }

  return { terms, mdxBlob }
}
