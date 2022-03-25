import * as React from 'react'
import classNames from 'classnames'
import Intro from './intro'
import LogoGrid from './logo-grid'
import Quote from './quote'
import type { SocialProofProps } from './types'
import s from './style.module.css'

export default function SocialProof(
  props: SocialProofProps
): React.ReactElement {
  const { layout = 'default', quote, intro, logos } = props
  return (
    <section className={classNames(s.socialProof, s[layout])}>
      <div className={s.container}>
        <div className={s.one}>
          {'quote' in props ? (
            quote ? (
              <Quote
                text={quote.text}
                avatar={quote.avatar}
                name={quote.name}
                role={quote.role}
              />
            ) : null
          ) : intro ? (
            <Intro
              eyebrow={intro.eyebrow}
              heading={intro.heading}
              description={intro.description}
              ctas={intro.ctas}
            />
          ) : null}
        </div>
        <div className={s.two}>
          <LogoGrid
            logos={logos}
            layout={layout === 'stacked' ? 'inline' : 'grid'}
          />
        </div>
      </div>
    </section>
  )
}
