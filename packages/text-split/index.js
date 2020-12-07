import ButtonGroup from './partials/button-group/index.js'
import CheckboxList from './partials/checkbox-list/index.js'
function TextSplit(props) {
  const {
    heading,
    content,
    reactContent,
    theme,
    brand,
    checkboxes,
    links,
    linkStyle,
    textSide,
    children,
  } = props
  if (!heading && !content && !reactContent) {
    throw new Error('<TextSplit /> requires either heading or content')
  }

  if (content && reactContent) {
    throw new Error(
      'Using both "content" and "reactContent" within <TextSplit /> is not allowed. Please choose only one.'
    )
  }

  return (
    <div className={`g-text-split background-${theme}`}>
      <div className={`g-grid-container text-at-${textSide}`}>
        <div className="children">{children}</div>
        <div className="text">
          {heading && (
            <h2
              data-testid="heading"
              className={`heading g-type-display-2 theme-${theme}`}
            >
              {heading}
            </h2>
          )}
          {content && (
            <div data-testid="content">
              {content.split('\n').map((paragraph, stableIdx) => {
                // Avoid rendering empty <p>, caused by eg `\n\n`
                if (paragraph === '') return null
                // eslint-disable-next-line react/no-array-index-key
                return (
                  <p key={stableIdx} className={`g-type-body theme-${theme}`}>
                    {paragraph}
                  </p>
                )
              })}
            </div>
          )}
          {reactContent ? reactContent : null}
          <CheckboxList items={checkboxes} brand={brand} theme={theme} />
          <ButtonGroup
            links={links}
            linkStyle={linkStyle}
            brand={brand}
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}

TextSplit.defaultProps = {
  textSide: 'left',
  theme: 'light',
  brand: 'hashicorp',
  linkStyle: 'links',
}

export default TextSplit
