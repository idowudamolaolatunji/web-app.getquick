import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import Spinner from './spinner/spinner_two'

import { CgProfile } from 'react-icons/cg'
import { LuSettings } from 'react-icons/lu'
import { TbLogout2 } from 'react-icons/tb'
import { MdOutlineDisplaySettings } from 'react-icons/md';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useAuthContext } from '../context/AuthContext';


function Dropdown({ setIsShown }) {
    const [isLoading, setIsLoading] = useState(false);
    const ref = useOutsideClick(handleClose);
    const { signoutUser } = useAuthContext();
    
    function handleClose() {
        setIsShown(false);
    }

    function handleLogout() {
        setIsLoading(true);
        setTimeout(function() {
            signoutUser();
            setIsLoading(false);
        }, 3000);
    }

    return (
        <>
            {isLoading && <Spinner />}
            <div className={`dropdown`} ref={ref}>
                <Link className='dropdown--item' to='/dashboard/profile'><CgProfile /> Profile</Link>
                <div className='dropdown--item'><MdOutlineDisplaySettings /> Maintenance Status</div>
                <Link className='dropdown--item' to='/dashboard/settings'><LuSettings /> Settings</Link>
                <div className='dropdown--item' onClick={handleLogout}><TbLogout2 /> Logout</div>
            </div>
        </>
    )
}

export default Dropdown