import React, { useState, useEffect } from 'react'
import useHover from '../../hooks/use-hover'
import svgGitHubIcon from '../../svg/github-icon.svg.js'
import svgXIcon from '../../svg/x-icon.svg.js'
import svgLoadingSpinner from '../../svg/loading-spinner.svg.js'
import InlineSvg from '@hashicorp/react-inline-svg'
import qs from '../../utils/query-string'
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
    async function getDetails() {
      /**
       * @TODO
       * Would prefer to send a POST request here,
       * but POST requests to `/api` routes don't
       * seem to work with `next-remote-watch`
       * For details, see:
       * https://github.com/hashicorp/next-remote-watch/pull/10
       *
       * In the meantime, we don't have tons of request data,
       * so we can just send it as a query string
       */
      const requestData = { packageName, repo, dir }
      const params = { json: JSON.stringify(requestData) }
      const response = await fetch(`${API_URL}?${qs(params)}`)
      const data = await response.json()
      if (data.error) {
        let msg = `Error fetching usage data from ${repo}. `
        msg += `This might be an issue with the GITHUB_API_TOKEN env variable, `
        msg += `which should be present in .env.local for local development. `
        msg += `Full error: ${JSON.stringify(data.error)}`
        console.error(msg)
      }
      setData(data)
    }
    getDetails()
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
    return <InlineSvg className={styles.loadingIcon} src={svgLoadingSpinner} />
  }
  if (versionUsed) {
    return (
      <InlineSvg
        className={styles.githubIcon}
        src={svgGitHubIcon}
        data-hovered={isHovered}
      />
    )
  }
  return (
    <InlineSvg
      className={styles.xIcon}
      src={svgXIcon}
      data-hovered={isHovered}
    />
  )
}

export default ProjectListItem
