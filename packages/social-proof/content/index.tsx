import s from './style.module.css'

export default function Content({ eyebrow, heading, description, actions }) {
  return (
    <div className={s.content}>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h2 className={s.heading}>{heading}</h2>
      <p className={s.description}>{description}</p>
    </div>
  )
}
