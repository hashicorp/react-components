import React from 'react'
import { useRouter } from 'next/router'
import SelectInput from '@hashicorp/react-select-input'

import { getVersionFromPath, removeVersionFromPath } from './util'

interface Props {
  versions: { label: string; name: string }[]
}

/**
 * Component which accepts a list of versions and renders a select component. Navigates to the new version on select
 */
const VersionSelect: React.ComponentType<Props> = ({ versions }) => {
  const { asPath, push } = useRouter()
  const pathParts = asPath.split('/')

  const version = getVersionFromPath(asPath)

  const onVersionSelect = (newVersion: string) => {
    // If selecting version same as current version, noop
    if (newVersion === version) return
    // If selecting latest...
    if (newVersion === 'latest') {
      if (!version) {
        // If route is latest, noop
        return
      } else {
        // Else, remove version from path; Navigate to latest
        return push(removeVersionFromPath(asPath))
      }
    }

    // If selecting version different than current version
    pathParts.splice(2, 0, newVersion)
    push(pathParts.join('/'))
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
