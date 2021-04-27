import React from 'react'
import s from './style.module.css'

function packageVersion({ name, version, linked = true }) {
  const Tag = linked ? 'a' : 'div'
  const releaseUrl =
    linked && name && version ? toReleaseUrl(name, version) : undefined
  return (
    <Tag href={releaseUrl} className={s.root} target="_blank" rel="noopener">
      {version}
    </Tag>
  )
}

function toReleaseUrl(name, version) {
  const [x, y, z] = version.match(/(\d+)\.(\d+)\.(.+)$/).slice(1)
  const tagName = `${name}@${x}.${y}.${z}`
  const baseUrl = 'https://www.github.com/hashicorp/react-components'
  const githubUrl = `${baseUrl}/releases/tag/${encodeURIComponent(tagName)}`
  return githubUrl
}

export default packageVersion
