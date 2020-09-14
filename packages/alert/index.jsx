import ArrowIcon from './arrow-icon'
import fragment from './fragment.graphql'

function Alert({ url, tag, text, tagColor, textColor }) {
  return (
    <a href={url} className={`g-alert ${tagColor || ''} ${textColor || ''}`}>
      <span className="g-type-tag-label" data-testid="tag">
        {tag}
      </span>
      <p className="g-type-body-small" data-testid="text">
        {text}
        <ArrowIcon />
      </p>
    </a>
  )
}

Alert.fragmentSpec = { fragment }

export default Alert
