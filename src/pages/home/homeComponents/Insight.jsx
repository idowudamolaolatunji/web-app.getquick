import React from 'react'
import { formatNumber } from '../../../utils/helper'
import { useNavigate } from 'react-router-dom'

function Insight({ title, value, icon, link }) {
    const navigate = useNavigate();

    return (
        <figure className='insight--figure' onClick={() => link && navigate(`/dashboard${link}`)} style={ !link ? { cursor: 'auto' } : { } }>
            <div className='insight--info'>
                <p className='text'>{title}</p>
                <span className='value'>{formatNumber(value)}</span>
            </div>
            <span className='insight--icon'>{icon}</span>
        </figure>
    )
}

export default Insight