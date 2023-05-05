import { promises } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { globSync } from 'glob'

const pExec = promisify(exec)

async function emitRaw(filepath) {
  const contents = await promises.readFile(filepath, 'utf-8')
  const filename = basename(filepath)
  const dir = dirname(filepath)
  const outputFilepath = join(dir, filename.replace('.svg', '.raw.ts'))
  await promises.writeFile(
    outputFilepath,
    `const svg = ${JSON.stringify(contents)};\nexport default svg;`
  )
}

const folder = resolve(process.argv[2])
const svgFiles = globSync(join(folder, '**/*.svg'), {
  ignore: 'node_modules/**',
})
await Promise.all(svgFiles.map(emitRaw))
await pExec(`npx prettier --write ${folder}`)
