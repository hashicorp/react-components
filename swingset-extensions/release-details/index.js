import React, { useEffect, useState } from 'react'
import Icon from '../usage-details/partials/icon'
import Button from '../../packages/button'
import PackageVersion from '../usage-details/partials/package-version'
import TopBar from '../usage-details/partials/top-bar'
import semverSort from 'semver/functions/sort'
import s from './style.module.css'

const API_URL = '/api/fetch-registry-data'

function ReleaseDetails({ packageJson = {} }) {
  const [{ error, versions, loaded }, setData] = useState({})
  const { name, version } = packageJson

  const latestMajor = version
    ? parseInt(version.match(/(\d+)\.(\d+)\.(.+)$/)[1])
    : -1
  const majorVersionInts = [...Array(latestMajor + 1).keys()]

  // Effect to fetch data from the npm registry, via API route
  useEffect(() => {
    // Ensure we don't try to set state while un-mounting
    let isMounted = true
    // Set up fn to call API route
    async function getDetails() {
      const dataToSet = { loaded: true }
      const response = await fetch(API_URL + `/${name}`)
      const [error, registryData] = await response.json()
      if (error) {
        let msg = `Error fetching registry data for ${name}. `
        msg += `error.toString(): ${JSON.stringify(error)}`
        console.error(msg)
        dataToSet.error = error
      } else {
        // Sort stable versions in descending order
        const versions = registryData.versions || {}
        const sortedStableVersions = semverSort(Object.keys(versions)).filter(
          (v) => {
            const z = v.match(/(\d+)\.(\d+)\.(.+)$/)[3]
            const isStable = parseInt(z).toString() === z
            return isStable
          }
        )
        dataToSet.versions = sortedStableVersions
      }
      //  Avoid trying to setData if the component is not mounted
      if (isMounted) setData(dataToSet)
    }
    // Call getDetails
    getDetails()
    return () => (isMounted = false)
  }, [name])

  return (
    <section>
      <TopBar
        heading="Releases"
        packageJson={packageJson}
        linkSlot={
          <Button
            url={`http://registry.npmjs.org/${name}`}
            title="registry.npmjs.org"
            theme={{ variant: 'tertiary' }}
            linkType="outbound"
          />
        }
      />
      <div>
        {majorVersionInts.map((majorInt) => {
          const matchingVersions =
            versions &&
            versions.filter((v) => {
              const x = v.match(/(\d+)\.(\d+)\.(.+)$/)[1]
              return parseInt(x) == majorInt
            })
          return (
            <VersionSection
              key={majorInt}
              label={`${majorInt}.x.x`}
              name={name}
              error={error}
              isLoading={!loaded}
              versions={matchingVersions}
            />
          )
        })}
      </div>
    </section>
  )
}

function VersionSection({ label, versions, isLoading, name, error }) {
  return (
    <div className={s.versionSection}>
      <div className={s.versionSectionLabel}>
        <PackageVersion version={label} linked={false} name={name} />
      </div>
      {versions && versions.length > 0 ? (
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
          {isLoading ? <Icon icon={error ? 'x' : 'loading'} /> : null}
          <span>
            {isLoading
              ? `Loading ${label} releases...`
              : error
              ? error
              : `No matching versions found for ${label}.`}
          </span>
        </div>
      )}
    </div>
  )
}
export default ReleaseDetails
