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
  const hasError = !isLoading && data.error
  const hasDependency = !isLoading && data.versionUsed

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
      if (data.error)
        console.error(
          `Error fetching usage data from ${repo}. This might be an issue with the GITHUB_API_TOKEN env variable, which should be present in .env.local for local development. Full error: ${JSON.stringify(
            data.error
          )}`
        )
      setData(data)
    }
    getDetails()
  }, [packageName])

  return (
    <li className={styles.root} data-not-used={!hasDependency}>
      <a
        ref={linkRef}
        className={styles.linkContainer}
        href={repoUrl}
        data-loading={!data}
        data-not-used={!hasDependency}
      >
        {isLoading ? (
          <InlineSvg className={styles.loadingIcon} src={svgLoadingSpinner} />
        ) : hasDependency ? (
          <InlineSvg
            className={styles.githubIcon}
            src={svgGitHubIcon}
            data-hovered={isHovered}
          />
        ) : (
          <InlineSvg
            className={styles.xIcon}
            src={svgXIcon}
            data-hovered={isHovered}
            data-has-error={hasError}
          />
        )}
        <div
          className={styles.repoLabel}
          data-hovered={isHovered}
          data-not-used={!hasDependency}
        >
          {repoLabel}
        </div>
        {data && hasDependency ? (
          <div className={styles.versionUsed}>{data.versionUsed}</div>
        ) : data && hasError ? (
          <div
            className={styles.error}
            title="There was an error fetching usage data. You might need to add an .env.local file with a valid GITHUB_API_TOKEN."
          >
            FAILED
          </div>
        ) : null}
      </a>
    </li>
  )
}

export default ProjectListItem
