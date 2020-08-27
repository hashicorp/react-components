import React from 'react'
import Button from '@hashicorp/react-button'

function ButtonGroup(props) {
  const { brand, links, linkStyle, theme } = props
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter(l => !l.text || !l.url).length > 0) {
    throw new Error(
      '<TextSplit /> <ButtonGroup /> `links` must have both a title and a URL'
    )
  }
  if (!hasLinks) return null
  return (
    <div data-testid="links" className={`links as-${linkStyle}`}>
      {links.map((link, stableIdx) => {
        const buttonVariant =
          linkStyle === 'buttons'
            ? stableIdx === 0
              ? 'primary'
              : 'secondary'
            : 'tertiary-neutral'
        const buttonBackground = { gray: 'light' }[theme] || theme
        return (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={stableIdx}
            theme={{
              variant: buttonVariant,
              brand: brand,
              background: buttonBackground
            }}
            linkType={link.type || 'inbound'}
            title={link.text}
            url={link.url}
          />
        )
      })}
    </div>
  )
}
export default ButtonGroup
