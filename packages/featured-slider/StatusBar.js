export default function StatusBar({ theme, active, timing, productClass }) {
  return (
    <div className={`progress-bar ${theme}`}>
      <span
        className={`${active ? ' active' : ''} ${productClass || ''}`}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: '0s' }
        }
      />
    </div>
  )
}
