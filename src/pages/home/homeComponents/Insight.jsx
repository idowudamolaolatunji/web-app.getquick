import React from 'react'
import { formatNumber } from '../../../utils/helper'

function Insight({ title, value, icon, link }) {
  return (
    <figure className='insight--figure'>
        <div className='insight--info'>
            <p>{title}</p>
            <span>{formatNumber(value)}</span>
        </div>
        <span className='insight--icon'>{icon}</span>
    </figure>
  )
}

export default Insight