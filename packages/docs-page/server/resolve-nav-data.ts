import path from 'path'
import fs from 'fs'

import { validateNavData } from './validate-nav-data'
import type { NavNode } from 'packages/docs-sidenav/types'

export async function resolveNavData(
  filePath: string,
  localContentDir: string
): Promise<NavNode[]> {
  const navDataFile = path.join(process.cwd(), filePath)
  const navDataRaw = JSON.parse(fs.readFileSync(navDataFile, 'utf8'))
  const withFilePaths = await validateNavData(navDataRaw, localContentDir)
  return withFilePaths
}
