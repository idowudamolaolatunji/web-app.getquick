import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';

import TooltipUI from '../../components/TooltipUI';



function MenuLink({ icon, title, link }) {
    const { isMenuCollapsed } = useDataContext();
    const { pathname } = useLocation();
    const { width } = useWindowSize();

    
    // const isActiveClass = `menu--link ${(title === 'Dashboard' && (pathname === '/dashboard' || pathname === '/')) ? 'is-active' : pathname === `/dashboard${link}` ? 'is-active' : ''}`;
    const isActiveClass = `menu--link ${(title === 'Dashboard' && (pathname === '/dashboard' || pathname === '/' || pathname === '/dashboard/')) && 'is-active' || (title !== "Dashboard" && pathname?.includes(link)) ? 'is-active' : ''}`;


    return (
        <>
            {(width > 900) ? (
                <>
                    {isMenuCollapsed ? (
                       <TooltipUI title={title}>
                            <Link className={isActiveClass} to={`/dashboard${link}`}>
                                <span className='menu--icon'>{icon}</span>
                            </Link>
                        </TooltipUI>
                    ) : (
                        <Link className={isActiveClass} to={`/dashboard${link}`}>
                            <span className='menu--icon'>{icon}</span>
                            <p className='menu--text'>{title}</p>
                        </Link>
                    )}
                </>
            ) : (
                <Link className={isActiveClass} to={`/dashboard${link}`}>
                    <span className='menu--icon'>{icon}</span>
                    <p className='menu--text'>{title}</p>
                </Link>
            )}
        </>
    )
}

export default MenuLink