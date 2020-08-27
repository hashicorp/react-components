import React from 'react'
import ButtonGroup from './partials/button-group/index.js'
import CheckboxList from './partials/checkbox-list/index.js'

function TextSplit(props) {
  const {
    heading,
    content,
    theme,
    brand,
    checkboxes,
    links,
    linkStyle,
    textSide,
    children
  } = props
  if (!heading && !content) {
    throw new Error('<TextSplit /> requires either heading or content')
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
  headingLevel: 2
}

export default TextSplit
