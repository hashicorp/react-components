import React from 'react'
import AccordionItems, { AccordionItem } from './partials/AccordionItems'
import classNames from 'classnames'
import s from './style.module.css'

function Accordion({ heading, items, className }) {
  return (
    <section className={classNames(s.root, className)}>
      <div className="g-grid-container">
        {heading && (
          <h2 className={s.heading} data-testid="heading">
            {heading}
          </h2>
        )}
        <AccordionItems items={items} />
      </div>
    </section>
  )
}

export default Accordion

export { AccordionItems, AccordionItem }
