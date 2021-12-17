import React from 'react'
import { useRouter } from 'next/router'
import SelectInput from '@hashicorp/react-select-input'

import {
  getVersionFromPath,
  removeVersionFromPath,
  getTargetPath,
} from './util'

interface Props {
  versions: { label: string; name: string }[]
  basePath: string
}

/**
 * Component which accepts a list of versions and renders a select component. Navigates to the new version on select
 */
const VersionSelect: React.ComponentType<Props> = ({ versions, basePath }) => {
  const { asPath, push } = useRouter()
  const version = getVersionFromPath(asPath)

  const onVersionSelect = (newVersion: string) => {
    // If selecting a version same as current version, noop
    if (newVersion === version) return

    // If selecting latest...
    if (newVersion === 'latest') {
      if (!version) {
        // While on latest, noop
        return
      } else {
        // While on version X,
        // Remove version from path; Navigate to latest
        return push(removeVersionFromPath(asPath))
      }
    }

    // If selecting a version...
    if (!version) {
      // While on latest,
      const target = getTargetPath({ basePath, asPath, version: newVersion })
      return push(target)
    } else {
      // While on a different version,
      const target = getTargetPath({ basePath, asPath, version: newVersion })
      return push(target)
    }
  }

  const selectedVersion =
    versions.find((ver) => ver.name === version) || versions[0]

  return (
    <SelectInput
      size="small"
      options={versions}
      value={selectedVersion}
      defaultLabel="Version"
      onValueChange={onVersionSelect}
      label="Version"
    />
  )
}

export default VersionSelect
