import React from 'react'
import { Link } from 'react-router-dom'

function MenuLink({ icon, title, link }) {
    return (
        <Link className='dashboard--menu-link' to={`/dashboard${link}`}>
            <span className='dashboard--menu-icon'>{icon}</span>
            <p>{title}</p>
        </Link>
    )
}

export default MenuLink