import React, { useState, useEffect } from 'react'
import useHover from '../../hooks/use-hover'
import InlineSvg from '@hashicorp/react-inline-svg'
import styles from './project-list-item.module.css'

const API_URL = '/api/fetch-usage-details'

function ProjectListItem({ packageName, repo, dir }) {
  const [linkRef, isHovered] = useHover()
  const [data, setData] = useState(false)
  const repoUrl = `https://www.github.com/${repo}`
  const repoLabel = `${repo.replace('hashicorp/', '')}${dir ? dir : ''}`

  const isLoading = !data
  const errorMsg = !isLoading && data.error
  const versionUsed = !isLoading && data.versionUsed

  useEffect(() => {
    let isMounted = true

    async function getDetails() {
      const requestData = { packageName, repo, dir }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })
      const data = await response.json()
      if (data.error) {
        let msg = `Error fetching usage data from ${repo}. `
        msg += `This might be an issue with the GITHUB_API_TOKEN env variable, `
        msg += `which should be present in .env.local for local development. `
        msg += `Full error: ${JSON.stringify(data.error)}`
        console.error(msg)
      }
      //  Avoid trying to setData if the component is not mounted
      if (isMounted) setData(data)
    }

    getDetails()

    return () => (isMounted = false)
  }, [packageName])

  return (
    <li className={styles.root}>
      <a ref={linkRef} className={styles.linkContainer} href={repoUrl}>
        <Icon
          isLoading={isLoading}
          versionUsed={versionUsed}
          isHovered={isHovered}
        />
        <div
          className={styles.repoLabel}
          data-hovered={isHovered}
          data-not-used={!versionUsed}
        >
          {repoLabel}
        </div>
        {versionUsed && <div className={styles.versionUsed}>{versionUsed}</div>}
        {errorMsg && <div className={styles.error}>FAILED</div>}
      </a>
    </li>
  )
}

function Icon({ isLoading, versionUsed, isHovered }) {
  if (isLoading) {
    return (
      <InlineSvg
        className={styles.loadingIcon}
        src={require('../../svg/loading-spinner.svg?include')}
      />
    )
  }
  if (versionUsed) {
    return (
      <InlineSvg
        className={styles.githubIcon}
        src={require('../../svg/github-icon.svg?include')}
        data-hovered={isHovered}
      />
    )
  }
  return (
    <InlineSvg
      className={styles.xIcon}
      src={require('../../svg/x-icon.svg?include')}
      data-hovered={isHovered}
    />
  )
}

export default ProjectListItem
