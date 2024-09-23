import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';



function MenuLink({ icon, title, link }) {
    const { isMenuCollapsed, handleShowSidemenu } = useDataContext();
    const { pathname } = useLocation();
    const { width } = useWindowSize()

    return (
        <>
            {(width > 900) ? (
                <Link className={`menu--link ${(title === 'Dashboard' && (pathname === '/dashboard' || pathname === '/')) ? 'is-active' : pathname === `/dashboard${link}` ? 'is-active' : ''}`} to={`/dashboard${link}`}>
                    <span className='menu--icon'>{icon}</span>
                    {isMenuCollapsed ? (
                        <span className='show-text'>{title}</span>
                    ) : (
                        <p className='menu--text'>{title}</p>
                    )}
                </Link>
            ) : (
                <Link className={`menu--link ${(title === 'Dashboard' && (pathname === '/dashboard' || pathname === '/')) ? 'is-active' : pathname === `/dashboard${link}` ? 'is-active' : ''}`} to={`/dashboard${link}`}>
                    <span className='menu--icon'>{icon}</span>
                    <p className='menu--text'>{title}</p>
                </Link>
            )}
        </>
    )
}

export default MenuLink