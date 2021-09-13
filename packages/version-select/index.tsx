import React from 'react'
import { useRouter } from 'next/router'
import SelectInput from '@hashicorp/react-select-input'

import { getVersionFromPath } from './util'

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
    const remove = version ? 1 : 0

    if (newVersion === 'latest' && version) {
      pathParts.splice(2, remove)
    } else {
      pathParts.splice(2, remove, newVersion)
    }

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
