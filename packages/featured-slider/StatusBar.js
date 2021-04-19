export default function StatusBar({ theme, active, timing }) {
  return (
    <div className={`progress-bar ${theme}`}>
      <span
        className={`${active ? ' active' : ''}`}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: '0s' }
        }
      />
    </div>
  )
}
