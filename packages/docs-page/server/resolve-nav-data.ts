import path from 'path'
import fs from 'fs'
import _debug from 'debug'

import { validateNavData } from './validate-nav-data'

const debug = _debug('FileSystemLoader')

export async function resolveNavData(filePath, localContentDir) {
  debug(`resolveNavData`, { filePath, localContentDir })
  const navDataFile = path.join(process.cwd(), filePath)
  debug(`navDataFile`, navDataFile)

  if (!fs.existsSync(navDataFile)) {
    const error = new Error(`Nav data file not found: ${navDataFile}`)
    debug(`resolveNavData`, 'process.cwd()', process.cwd(), {
      filePath,
      localContentDir,
    })
    throw error
  }

  const navDataRaw = JSON.parse(fs.readFileSync(navDataFile, 'utf8'))
  const withFilePaths = await validateNavData(navDataRaw, localContentDir)
  return withFilePaths
}
