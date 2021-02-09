import { eliminateOrphans } from '@hashicorp/js-utils'
import fragment from './fragment.graphql'
import s from './style.module.css'

function SectionHeader({ headline, description, useH1 }) {
  return (
    <div className={`g-section-header ${s.root}`}>
      {headline &&
        (useH1 ? (
          <h1
            className={s.headlineOne}
            data-testid="h1"
            dangerouslySetInnerHTML={{
              __html: eliminateOrphans(headline),
            }}
          />
        ) : (
          <h2
            className={s.headlineTwo}
            data-testid="h2"
            dangerouslySetInnerHTML={{
              __html: eliminateOrphans(headline),
            }}
          />
        ))}

      {description && (
        <div
          className={s.description}
          data-testid="description"
          dangerouslySetInnerHTML={{
            __html: eliminateOrphans(description.trim()),
          }}
        />
      )}
    </div>
  )
}

SectionHeader.fragmentSpec = { fragment }

export default SectionHeader
