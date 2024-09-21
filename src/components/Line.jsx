import React from 'react'

function Line({ where=null, value=0 }) {

    const customStyle = {
        [where && `margin${where}`]: value,
    }

  return (
    <div className='line' style={customStyle} />
  )
}

export default Line