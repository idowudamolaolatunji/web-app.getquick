import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatNumber } from '../utils/helper';

function Insight({ title, value, icon, link }) {
    const navigate = useNavigate();

    return (
        <figure className='insight--figure' 
            onClick={() => link && navigate(`/dashboard${link}`)}
            style={!link ? { cursor: 'auto' } : {}}
        >
            <div className='insight--info'>
                <p className='text'>{title}</p>
                <span className='value'>{formatNumber(value, 1)}</span>
            </div>
            <span className='insight--icon'>{icon}</span>
        </figure>
    )
}

export default Insight