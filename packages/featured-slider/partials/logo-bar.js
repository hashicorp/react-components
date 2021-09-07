import StatusBar from './status-bar'
import Image from '@hashicorp/react-image'
import classNames from 'classnames'
import s from './logo-bar.module.css'

function LogoBar({ features, numFrames, dark, active, timing, handleClick }) {
  return (
    <div className={s.logoBarContainer}>
      {features.map((feature, i) => {
        return (
          <div
            className={classNames(s.logoBar, {
              [s.double]: numFrames === 2,
            })}
            onClick={() => handleClick(i)}
            key={feature.logo.url}
            data-testid="logo-bar"
          >
            <div className={s.logoContainer}>
              <Image url={feature.logo.url} alt={feature.logo.alt} />
            </div>
            <StatusBar dark={dark} active={active === i} timing={timing} />
          </div>
        )
      })}
    </div>
  )
}

export default LogoBar
