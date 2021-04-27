import ProjectListItem from './partials/project-list-item'
import TopBar from './partials/top-bar'
import styles from './usage-details.module.css'
import ReleaseDetails from '../release-details'
import PROJECT_LIST from './project-list'
import SourcegraphLink from './partials/sourcegraph-link'

export default function UsageDetails({ packageJson = {} }) {
  return (
    <div>
      <section className={styles.root}>
        <TopBar
          heading="Where it's used"
          packageJson={packageJson}
          linkSlot={<SourcegraphLink packageName={packageJson.name} />}
        />
        {packageJson.name ? (
          <ul className={styles.list}>
            {PROJECT_LIST.map(({ repo, dir }) => {
              return (
                <ProjectListItem
                  key={`${repo}${dir}`}
                  packageName={packageJson.name}
                  repo={repo}
                  dir={dir}
                />
              )
            })}
          </ul>
        ) : (
          <p>
            No <code>package.json</code> detected for this component. Maybe this
            component hasn&apos;t been published to <code>npm</code>?
          </p>
        )}
      </section>
      <ReleaseDetails packageJson={packageJson} />
    </div>
  )
}
