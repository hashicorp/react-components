import marked from 'marked'
import { eliminateOrphans } from '@hashicorp/js-utils'
import fragment from './fragment.graphql'

function SectionHeader({ headline, description, useH1 }) {
  return (
    <div className="g-section-header">
      {headline &&
        (useH1 ? (
          <h1
            className="g-type-display-1"
            data-testid="h1"
            dangerouslySetInnerHTML={{
              __html: eliminateOrphans(marked.inlineLexer(headline, [])),
            }}
          />
        ) : (
          <h2
            className="g-type-display-2"
            data-testid="h2"
            dangerouslySetInnerHTML={{
              __html: eliminateOrphans(marked.inlineLexer(headline, [])),
            }}
          />
        ))}

      {description && (
        <p
          className="g-type-body-large"
          data-testid="description"
          dangerouslySetInnerHTML={{
            __html: eliminateOrphans(marked.inlineLexer(description, [])),
          }}
        />
      )}
    </div>
  )
}

SectionHeader.fragmentSpec = { fragment }

export default SectionHeader
