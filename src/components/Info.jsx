import React from 'react'

function Info({ icon, text}) {
  return (
    <span className='info--item'>
        {icon}
        <p>{text}</p>
    </span>
  )
}

export default Info