export default function StatusBar({ dark, active, timing }) {
  return (
    <div className={`progress-bar${dark ? ' dark' : ''}`}>
      <span
        className={`${active ? ' active' : ''} `}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: '0s' }
        }
      />
    </div>
  )
}
