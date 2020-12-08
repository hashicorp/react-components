import ProjectListItem from './partials/project-list-item'
import TopBar from './partials/top-bar'
import styles from './usage-details.module.css'
import PROJECT_LIST from './project-list'

export default function UsageDetails({ packageName }) {
  return (
    <section className={styles.root}>
      <TopBar packageName={packageName} />
      <ul className={styles.list}>
        {PROJECT_LIST.map(({ repo, dir }) => {
          return (
            <ProjectListItem
              key={`${repo}${dir}`}
              packageName={packageName}
              repo={repo}
              dir={dir}
            />
          )
        })}
      </ul>
    </section>
  )
}
