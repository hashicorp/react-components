function BgColor({ color }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: color,
      }}
    />
  )
}

export default BgColor
