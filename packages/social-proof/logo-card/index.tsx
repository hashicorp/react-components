import Image from 'next/image'
import type { LogoCardProps } from './types'
import s from './style.module.css'

export default function LogoCard({ src, alt }: LogoCardProps) {
  return (
    <div className={s.logoCard}>
      <Image className={s.logo} src={src} width={120} height={90} alt={alt} />
    </div>
  )
}
