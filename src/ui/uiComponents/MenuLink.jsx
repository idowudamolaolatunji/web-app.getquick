import React from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';

function MenuLink({ icon, title, link }) {
    const { isMenuCollapsed } = useDataContext();

    return (
        <Link className='menu--link' to={`/dashboard${link}`}>
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