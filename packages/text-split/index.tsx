import classNames from 'classnames'
import type { ReactNode } from 'react'
import type { Products } from '@hashicorp/platform-product-meta'
import ButtonGroup from './partials/button-group/index.js'
import CheckboxList from './partials/checkbox-list/index.js'
import s from './style.module.css'

export interface TextSplitProps {
  heading?: string
  content?: ReactNode
  theme?: 'light' | 'dark'
  product?: Products
  checkboxes?: string[]
  links?: {
    type: 'inbound' | 'outbound' | 'anchor' | 'download'
    text: string
    url: string
  }[]
  linkStyle?: 'buttons' | 'links'
  textSide?: 'left'
  children?: ReactNode
  className?: string
}

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
  className,
}: TextSplitProps) {
  if (!heading && !content) {
    throw new Error('<TextSplit /> requires either heading or content')
  }

  const hasStringContent = content && typeof content === 'string'
  const hasReactContent = content && !hasStringContent

  return (
    <div className={classNames(s.root, className, s[`background-${theme}`])}>
      <div className={classNames(s.container, s[`text-at-${textSide}`])}>
        <div className={s.childrenSide}>{children}</div>
        <div className={s.contentSide}>
          {heading && (
            <h2 data-testid="heading" className={s.heading}>
              {heading}
            </h2>
          )}
          {hasStringContent ? (
            <ContentString contentString={content} />
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

function ContentString({ contentString }) {
  const paragraphs = contentString.split('\n')
  return (
    <div data-testid="content">
      {paragraphs.map((paragraph, stableIdx) => {
        // Avoid rendering empty <p>, caused by eg `\n\n`
        if (paragraph === '') return null
        return (
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          <p key={stableIdx} className={s.bodyParagraph}>
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
