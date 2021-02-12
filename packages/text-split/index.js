import ButtonGroup from './partials/button-group/index.js'
import CheckboxList from './partials/checkbox-list/index.js'
function TextSplit({
  heading,
  content,
  theme,
  product,
  checkboxes,
  links,
  linkStyle,
  textSide,
  children,
}) {
  if (!heading && !content) {
    throw new Error('<TextSplit /> requires either heading or content')
  }

  const hasStringContent = content && typeof content === 'string'
  const hasReactContent = content && !hasStringContent

  return (
    <div className={`g-text-split background-${theme}`}>
      <div className={`g-grid-container text-at-${textSide}`}>
        <div className="children">{children}</div>
        <div className="text">
          {heading && (
            <h2
              data-testid="heading"
              className={`heading g-type-display-3 theme-${theme}`}
            >
              {heading}
            </h2>
          )}
          {hasStringContent ? (
            <ContentString contentString={content} theme={theme} />
          ) : hasReactContent ? (
            content
          ) : null}

          <CheckboxList items={checkboxes} product={product} theme={theme} />
          <ButtonGroup
            links={links}
            linkStyle={linkStyle}
            product={product}
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}

function ContentString({ contentString, theme }) {
  const paragraphs = contentString.split('\n')
  return (
    <div data-testid="content">
      {paragraphs.map((paragraph, stableIdx) => {
        // Avoid rendering empty <p>, caused by eg `\n\n`
        if (paragraph === '') return null
        return (
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          <p key={stableIdx} className={`g-type-body theme-${theme}`}>
            {paragraph}
          </p>
        )
      })}
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
