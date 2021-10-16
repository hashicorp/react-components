import React from 'react'
import s from './style.module.css'

function TwoColumnLayout({ columnOne, columnTwo }) {
  return (
    <div className={s.twoColumnLayout}>
      <div>{columnOne}</div>
      <div></div>
      <div>{columnTwo}</div>
    </div>
  )
}

export default TwoColumnLayout
