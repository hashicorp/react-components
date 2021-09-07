import classNames from 'classnames'
import s from './status-bar.module.css'

export default function StatusBar({ dark, active, timing }) {
  return (
    <div
      className={classNames(s.root, { [s.dark]: dark })}
      data-testid="progress-bar"
    >
      <span
        className={classNames(s.bar, { [s.active]: active })}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: '0s' }
        }
      />
    </div>
  )
}
