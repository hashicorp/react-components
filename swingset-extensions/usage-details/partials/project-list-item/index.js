import React, { useState, useEffect } from 'react'
import Icon from '../icon'
import useHover from '../../hooks/use-hover'
import PackageVersion from '../package-version'
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
          icon={isLoading ? 'loading' : versionUsed ? 'github' : 'x'}
          isHovered={isHovered}
        />
        <div
          className={styles.repoLabel}
          data-hovered={isHovered}
          data-not-used={!versionUsed}
        >
          {repoLabel}
        </div>

        {errorMsg && <div className={styles.error}>FAILED</div>}
      </a>
      {versionUsed && (
        <PackageVersion version={versionUsed} name={packageName} />
      )}
    </li>
  )
}

export default ProjectListItem
