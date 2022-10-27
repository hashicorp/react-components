import classNames from 'classnames'
import { VideoFeatureProps } from './types'
import s from './style.module.css'

export default function VideoFeature({
  children,
  textSide = 'left',
}: VideoFeatureProps) {
  return (
    <div className={classNames(s.videoFeature, s[textSide])}>{children}</div>
  )
}
