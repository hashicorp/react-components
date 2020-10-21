export default function StatusBar({ dark, active, timing, brand }) {
  return (
    <div className={`progress-bar${dark ? ' dark' : ''}`}>
      <span
        className={`${active ? ' active' : ''} ${brand ? brand : ''}`}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: '0s' }
        }
      />
    </div>
  )
}
