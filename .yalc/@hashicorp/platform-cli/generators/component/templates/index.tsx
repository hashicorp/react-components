import s from './style.module.css'
import { <%= componentClass %>Props } from './types'

export default function <%= componentClass %>({}: <%= componentClass %>Props) {
  return (
    <div className={s.root}'>
      <%= component %>
    </div>
  )
}
