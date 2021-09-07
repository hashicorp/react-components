import Button from '@hashicorp/react-button'
import classNames from 'classnames'
import s from './style.module.css'

function ButtonGroup({ product, links, linkStyle, theme }) {
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.text || !l.url).length > 0) {
    throw new Error(
      '<TextSplit /> <ButtonGroup /> `links` must have both a title and a URL'
    )
  }
  if (!hasLinks) return null
  return (
    <div
      data-testid="links"
      className={classNames(s.buttonGroup, s[`as-${linkStyle}`])}
    >
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
            className={s.button}
            theme={{
              variant: buttonVariant,
              brand: product,
              background: buttonBackground,
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
