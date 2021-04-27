import React, { useEffect, useState } from 'react'
import Icon from '../usage-details/partials/icon'
import PackageVersion from '../usage-details/partials/package-version'
import TopBar from '../usage-details/partials/top-bar'
import s from './style.module.css'

const API_URL = '/api/fetch-release-details'

function ReleaseDetails({ packageJson }) {
  if (!packageJson) return null
  const [data, setData] = useState(false)
  const { name, version } = packageJson

  const latestMajor = parseInt(version.match(/(\d+)\.(\d+)\.(.+)$/)[1])
  const majorVersionInts = [...Array(latestMajor + 1).keys()]

  const isLoading = data == false
  const error = !isLoading && data.error
  const sortedVersions = !isLoading ? data.sortedVersions : []

  // Effect to fetch data from the npm registry, via API route
  useEffect(() => {
    // Ensure we don't try to set state while un-mounting
    let isMounted = true
    // Set up fn to call API route
    async function getDetails() {
      const requestData = { packageName: name }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })
      const data = await response.json()
      if (data.error) {
        let msg = `Error fetching release details for ${name}. `
        msg += `Full error: ${JSON.stringify(data.error)}`
        console.error(msg)
      }
      //  Avoid trying to setData if the component is not mounted
      if (isMounted) setData(data)
    }
    // Call getDetails
    getDetails()
    return () => (isMounted = false)
  }, [name])

  return (
    <section>
      <TopBar
        heading="Release notes"
        packageJson={packageJson}
        hideSourcegraph
      />
      <div>
        {majorVersionInts.map((majorInt) => {
          return (
            <VersionSection
              key={majorInt}
              label={`${majorInt}.x.x`}
              name={name}
              error={error}
              versions={sortedVersions.filter((v) => {
                const x = v.match(/(\d+)\.(\d+)\.(.+)$/)[1]
                return parseInt(x) == majorInt
              })}
            />
          )
        })}
      </div>
    </section>
  )
}

function VersionSection({ label, versions, name, error }) {
  return (
    <div className={s.versionSection}>
      <div className={s.versionSectionLabel}>
        <PackageVersion version={label} linked={false} name={name} />
      </div>
      {versions && versions.length ? (
        <ul className={s.versionList}>
          {versions.map((version) => {
            return (
              <li key={version} className={s.versionListItem}>
                <PackageVersion version={version} name={name} />
              </li>
            )
          })}
        </ul>
      ) : (
        <div className={s.loadingList}>
          <Icon icon={error ? 'x' : 'loading'} />
          <span>
            {error
              ? 'Error fetching registry data. Check the console.'
              : `Loading ${label} releases...`}
          </span>
        </div>
      )}
    </div>
  )
}
export default ReleaseDetails
