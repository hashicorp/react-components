import path from 'path'
import fs from 'fs'
import { Debugger } from 'debug'

import { validateNavData } from './validate-nav-data'

export async function resolveNavData(
  filePath,
  localContentDir,
  debug?: Debugger
) {
  const log = debug?.extend('resolveNavData')
  log?.(`input %O`, { filePath, localContentDir })

  const navDataFile = path.join(process.cwd(), filePath)
  log?.(`navDataFile %O`, { navDataFile })

  const navDataRaw = JSON.parse(fs.readFileSync(navDataFile, 'utf8'))
  log?.(`navDataRaw %O`, { navDataRaw })

  const withFilePaths = await validateNavData(navDataRaw, localContentDir)
  log?.(`withFilePaths %O`, { withFilePaths })

  return withFilePaths
}
