import { useState } from 'react'

function DecoratorControl(Story, { args }) {
  const [activeTabIdx, setActiveTabIdx] = useState(-1)
  function setActiveTab(targetIdx) {
    setActiveTabIdx(activeTabIdx == targetIdx ? -1 : targetIdx)
  }
  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <Story args={{ ...args, activeTabIdx, setActiveTab }} />
    </div>
  )
}

export default DecoratorControl
