import classNames from 'classnames'
import Content from './content'
import LogoGrid from './logo-grid'
import Quote from './quote'
import type { SocialProofProps } from './types'
import s from './style.module.css'

export default function SocialProof(props: SocialProofProps) {
  const { layout = 'default', quote, content, logos } = props
  return (
    <section className={classNames(s.socialProof, s[layout])}>
      <div className={s.one}>
        {'quote' in props ? (
          <Quote
            text={quote.text}
            avatar={quote.avatar}
            name={quote.name}
            role={quote.role}
          />
        ) : (
          <Content
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.description}
            actions={[]}
          />
        )}
      </div>
      <div className={s.two}>
        <LogoGrid logos={logos} />
      </div>
    </section>
  )
}
