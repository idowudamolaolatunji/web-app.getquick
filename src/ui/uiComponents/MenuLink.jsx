import React from 'react'
import { Link } from 'react-router-dom'

function MenuLink({ icon, title, link }) {
    return (
        <li className='dashboard--list-item'>
            <span className='dashboard--icon'>{icon}</span>
            <Link className='dashboard--link' to={`/dashboard${link}`}>{title}</Link>
        </li>
    )
}

export default MenuLink