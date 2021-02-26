import fs from 'fs'
import path from 'path'
import existsSync from 'fs-exists-sync'
import readdirp from 'readdirp'
import lineReader from 'line-reader'
import moize from 'moize'
import matter from 'gray-matter'
import { safeLoad } from 'js-yaml'
import renderToString from 'next-mdx-remote/render-to-string'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'
import generateComponents from './components'

export async function generateStaticPaths(subpath) {
  const paths = await getStaticMdxPaths(
    path.join(process.cwd(), 'content', subpath)
  )

  return { paths, fallback: false }
}

export async function generateStaticProps({
  subpath,
  productName,
  params,
  additionalComponents,
  scope,
  remarkPlugins,
}) {
  const docsPath = path.join(process.cwd(), 'content', subpath)
  const currentPath = params.page ? params.page.join('/') : '/'

  // get frontmatter from all other pages in the category, for the sidebar
  const allFrontMatter = await fastReadFrontMatter(docsPath)

  // render the current page path markdown
  const { mdxSource, frontMatter, filePath } = await renderPageMdx(
    docsPath,
    currentPath,
    generateComponents(productName, additionalComponents),
    scope,
    remarkPlugins
  )

  return {
    props: {
      data: allFrontMatter.map((p) => ({
        ...p,
        __resourcePath: `${subpath}/${p.__resourcePath}`,
      })),
      mdxSource,
      frontMatter,
      filePath: `${subpath}/${filePath}`,
      currentPath,
    },
  }
}

async function getStaticMdxPaths(root) {
  const files = await readdirp.promise(root, { fileFilter: ['*.mdx'] })

  return files.map(({ path: p }) => {
    return {
      params: {
        page: p
          .replace(/\.mdx$/, '')
          .split('/')
          .filter((p) => p !== 'index'),
      },
    }
  })
}

async function renderPageMdx(
  root,
  currentPath,
  components,
  scope,
  remarkPlugins = []
) {
  // get the page being requested - figure out if its index page or leaf
  // prefer leaf if both are present
  const leafPath = path.join(root, `${currentPath}.mdx`)
  const indexPath = path.join(root, `${currentPath}/index.mdx`)
  let page, filePath

  if (existsSync(leafPath)) {
    page = fs.readFileSync(leafPath, 'utf8')
    filePath = leafPath
  } else if (existsSync(indexPath)) {
    page = fs.readFileSync(indexPath, 'utf8')
    filePath = indexPath
  } else {
    // NOTE: if we decide to let docs pages render dynamically, we should replace this
    // error with a straight 404, at least in production.
    throw new Error(
      `We went looking for "${leafPath}" and "${indexPath}" but neither one was found.`
    )
  }

  const { data: frontMatter, content } = matter(page)
  const mdxSource = await renderToString(content, {
    mdxOptions: markdownDefaults({
      resolveIncludes: path.join(process.cwd(), 'content/partials'),
      addRemarkPlugins: remarkPlugins,
    }),
    components,
    scope,
  })

  return {
    mdxSource,
    frontMatter,
    filePath: filePath.replace(`${root}/`, ''),
  }
}

// We are memoizing this function as it does a non-trivial amount of I/O to read frontmatter for all mdx files in a directory
export const fastReadFrontMatter =
  process.env.NODE_ENV === 'production'
    ? moize(fastReadFrontMatterFn)
    : fastReadFrontMatterFn

async function fastReadFrontMatterFn(p) {
  const fm = []
  for await (const entry of readdirp(p, { fileFilter: '*.mdx' })) {
    let lineNum = 0
    const content = []
    fm.push(
      new Promise((resolve, reject) => {
        lineReader.eachLine(
          entry.fullPath,
          (line) => {
            // if it has any content other than `---`, the file doesn't have front matter, so we close
            if (lineNum === 0 && !line.match(/^---$/)) {
              console.warn(
                `WARNING: The file "${entry.path}" is missing front matter. Please add front matter to ensure the file's metadata is properly populated.`
              )
              content.push('---')
              content.push('page_title: "ERROR: Missing Frontmatter"')
              return false
            }
            // if it's not the first line and we have a bottom delimiter, exit
            if (lineNum !== 0 && line.match(/^---$/)) return false
            // now we read lines until we match the bottom delimiters
            content.push(line)
            // increment line number
            lineNum++
          },
          (err) => {
            if (err) return reject(err)
            content.push(`__resourcePath: "${entry.path}"`)
            resolve(safeLoad(content.slice(1).join('\n')), {
              filename: entry.fullPath,
            })
          }
        )
      })
    )
  }
  return Promise.all(fm)
}
