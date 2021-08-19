import InlineSvg from '@hashicorp/react-inline-svg'
import IconEnter from './img/search-legend-enter.svg.js'
import IconPage from './img/search-legend-page.svg.js'
import IconEscape from './img/search-legend-escape.svg.js'
import s from './legend.module.css'
import VisuallyHidden from '@reach/visually-hidden'

export default function SearchLegend() {
  return (
    <div className={s.searchLegend}>
      <figure className={s.legendItem}>
        <InlineSvg src={IconEnter} aria-hidden={true} />
        <p className={s.legendLabel}>
          <VisuallyHidden>Enter</VisuallyHidden>
          to select
        </p>
      </figure>
      <figure className={s.legendItem}>
        <InlineSvg src={IconPage} aria-hidden={true} />
        <p className={s.legendLabel}>
          <VisuallyHidden>Tab</VisuallyHidden>
          to navigate
        </p>
      </figure>
      <figure className={s.legendItem}>
        <InlineSvg src={IconEscape} aria-hidden={true} />
        <p className={s.legendLabel}>
          <VisuallyHidden>Escape</VisuallyHidden>
          to dismiss
        </p>
      </figure>
    </div>
  )
}
