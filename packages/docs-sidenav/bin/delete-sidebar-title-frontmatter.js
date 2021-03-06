#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const grayMatter = require('gray-matter')
const klawSync = require('klaw-sync')

/*

DELETE sidebar_title FROM ALL .mdx FRONTMATTER

USAGE

```
npx --package gray-matter --package klaw-sync --package @hashicorp/react-docs-sidenav@6.1.1-alpha.53 delete-sidebar-title-frontmatter ./content
```

*/

const CONTENT_DIR = path.join(process.cwd(), process.argv[2])

function fileFilter(f) {
  return path.extname(f.path) === '.mdx'
}

function processFrontmatter(frontmatter) {
  const processed = { ...frontmatter }
  delete processed.sidebar_title
  return processed
}

modifyFrontmatter(CONTENT_DIR, fileFilter, processFrontmatter).then(
  (processedEntries) => {
    console.log(processedEntries)
  }
)

async function modifyFrontmatter(inputDir, fileFilter, processFrontmatter) {
  // Traverse directories and parse frontmatter
  const targetFilepaths = klawSync(inputDir, {
    traverseAll: true,
    filter: fileFilter,
  }).map((f) => f.path)
  const withProcessedFrontmatter = await Promise.all(
    targetFilepaths.map(async (filePath) => {
      const rawFile = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = grayMatter(rawFile)
      const processedFrontmatter = processFrontmatter(frontmatter)
      const processedFile = grayMatter.stringify(content, processedFrontmatter)
      fs.writeFileSync(filePath, processedFile)
      return {
        filePath,
        after: processedFrontmatter,
      }
    })
  )
  return withProcessedFrontmatter
}
