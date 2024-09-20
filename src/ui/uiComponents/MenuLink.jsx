import React from 'react'
import { Link } from 'react-router-dom'
import { useDataContext } from '../../context/DataContext';

function MenuLink({ icon, title, link }) {
    const { isMenuCollapsed } = useDataContext();

    return (
        <>
            {isMenuCollapsed ? (
                <Link className='dashboard--menu-link' to={`/dashboard${link}`}>
                    <span className='dashboard--menu-icon'>{icon}</span>
                </Link>
            ) : (
                <Link className='dashboard--menu-link' to={`/dashboard${link}`}>
                    <span className='dashboard--menu-icon'>{icon}</span>
                    <p>{title}</p>
                </Link>
            )}
        
        </>
    )
}

export default MenuLink