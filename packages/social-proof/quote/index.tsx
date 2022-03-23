import AuthorByline from '../author-byline'
import s from './style.module.css'

export default function Quote({ text, avatar, name, role }) {
  return (
    <figure className={s.quote}>
      <blockquote className={s.text}>
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.32 0.459961H3.16L0 11.54H5.56L7.32 0.459961ZM14.96 0.459961H10.76L7.64 11.54H13.2L14.96 0.459961Z"
            fill="currentColor"
          />
        </svg>
        <p>{text}</p>
      </blockquote>
      <figcaption className={s.caption}>
        <AuthorByline avatar={avatar} name={name} role={role} />
      </figcaption>
    </figure>
  )
}
