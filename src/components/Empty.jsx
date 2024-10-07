import React from 'react';

import empty from '../assets/images/resources/orange-charts-and-calculations-for-business-analytics-1.png'

function Empty({ customStyle, text }) {
  return (
    <div className="empty--box" style={customStyle}>
        <img src={empty} alt='' />
        <p>No {text}</p>
    </div>
  )
}

export default Empty