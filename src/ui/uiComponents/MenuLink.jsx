import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';

function MenuLink({ icon, title, link }) {
    const { isMenuCollapsed } = useDataContext();
    const { pathname } = useLocation();
    
    return (
        <Link className={`menu--link ${pathname === `/dashboard${link}` ? 'is-active' : ''}`} to={`/dashboard${link}`}>
            <span className='menu--icon'>{icon}</span>
            {isMenuCollapsed ? (
                <span className='show-text'>{title}</span>
            ) : (
                <p className='menu--text'>{title}</p>
            )}
        </Link>
    )
}

export default MenuLink