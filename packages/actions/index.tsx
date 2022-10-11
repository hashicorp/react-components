import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import StandaloneLink from '@hashicorp/react-standalone-link'
import type { ActionsProps } from './types'
import s from './style.module.css'

export default function Actions({
  appearance = 'light',
  layout = 'inline',
  theme = 'hashicorp',
  size = 'medium',
  ctas,
  links,
  cta,
  link,
}: ActionsProps) {
  return (
    <div className={classNames(s.actions, s[layout])} data-testid="actions">
      {ctas && ctas.length > 0 ? (
        <Buttons
          appearance={appearance}
          theme={theme}
          size={size}
          ctas={ctas}
        />
      ) : null}
      {links && links.length > 0 ? (
        <StandaloneLinks appearance={appearance} links={links} />
      ) : null}
      {cta && link ? (
        <ButtonAndStandaloneLink
          appearance={appearance}
          theme={theme}
          size={size}
          cta={cta}
          link={link}
        />
      ) : null}
    </div>
  )
}

const StandaloneLinks = ({ appearance, links }) => {
  return (
    <>
      {links.map((link, index) => {
        const linkTheme = index === 0 ? 'primary' : 'secondary'
        return (
          <StandaloneLink
            key={index}
            theme={linkTheme}
            appearance={appearance}
            href={link.href}
          >
            {link.children}
          </StandaloneLink>
        )
      })}
    </>
  )
}

const Buttons = ({ appearance, theme, size, ctas }) => {
  return (
    <>
      {ctas.map((cta, index) => {
        const variant = index === 0 ? 'primary' : 'secondary'
        return (
          <Button
            key={index}
            title={cta.title}
            linkType={undefined}
            url={cta.url}
            onClick={cta.onClick}
            size={size}
            theme={{
              brand: theme,
              variant: variant,
              background: appearance === 'dark' ? 'dark' : undefined,
            }}
          />
        )
      })}
    </>
  )
}

const ButtonAndStandaloneLink = ({ appearance, theme, size, cta, link }) => {
  return (
    <>
      <Button
        title={cta.title}
        linkType={cta.variant === 'tertiary-neutral' ? 'inbound' : undefined}
        url={cta.url}
        onClick={cta.onClick}
        size={size}
        theme={{
          brand: theme,
          variant: 'primary',
          background: appearance === 'dark' ? 'dark' : undefined,
        }}
      />
      <StandaloneLink
        theme={'secondary'}
        appearance={appearance}
        href={link.href}
      >
        {link.children}
      </StandaloneLink>
    </>
  )
}
