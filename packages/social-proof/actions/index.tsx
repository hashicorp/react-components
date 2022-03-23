import * as React from 'react'
import Button from '@hashicorp/react-button'
import slugify from 'slugify'
import s from './style.module.css'

export default function Actions({ ctas }): React.ReactElement {
  return (
    <div className={s.actions}>
      {ctas.map((cta, index) => {
        const key = `${slugify(cta.title)}-${index}`
        return (
          <Button
            key={key}
            title={cta.title}
            url={cta.url}
            linkType="inbound"
            theme={{
              variant: 'tertiary-neutral',
              brand: 'terraform',
            }}
          />
        )
      })}
    </div>
  )
}
