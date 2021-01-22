import ProjectListItem from './partials/project-list-item'
import TopBar from './partials/top-bar'
import styles from './usage-details.module.css'
import PROJECT_LIST from './project-list'

export default function UsageDetails({ packageJson }) {
  return (
    <section className={styles.root}>
      <TopBar packageJson={packageJson} />
      {packageJson ? (
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
          component hasn't been published to <code>npm</code>?
        </p>
      )}
    </section>
  )
}
