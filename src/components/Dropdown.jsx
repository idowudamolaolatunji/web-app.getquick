import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import CustomAlert from './CustomAlert';
import Spinner from './spinner/spinner_two'
import { ImDisplay } from 'react-icons/im';
import { getInitials } from '../utils/helper';
import { useAuthContext } from '../context/AuthContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';


function Dropdown({ setIsShown }) {
    const { user, signoutUser } = useAuthContext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const ref = useOutsideClick(handleClose);
    
    function handleClose() {
        setIsShown(false);
    }

    function handleCloseByLink(e) {
        if(e.target.closest('.dropdown--item').tagName === 'A') {
            setIsShown(false);
        };
    }

    function handleLogout() {
        // LOGOUT LOGIC
        setIsLoading(true);
        setIsSuccess(true);
        setTimeout(function() {
            signoutUser();
        }, 2000);
    }

    return (
        <>
            {isLoading && <Spinner />}
            {isSuccess && <CustomAlert type="success" message="Logout successful!" />}


            <div className={`dropdown`} ref={ref} onClick={handleCloseByLink}>
                <Link className='dropdown--item' to='/dashboard/profile'>
                    <span className='item--user'>
                        {user.avatar ? (
                            <img className='item--user-img' src={`${import.meta.env.VITE_SERVER_ASSET_URL}/users/${user.avatar}`} alt="" />
                        ) : (
                            <span className='item--user-img'>{getInitials(user?.fullname)}</span>
                        )}
                        <span className='item--user-info'>
                            <p>{user?.fullname}</p>
                            <p>{user.email}</p>
                        </span>
                    </span>
                </Link>
                <div className='dropdown--item'><ImDisplay /> Maintenance Status</div>
                <Link className='dropdown--item' to='/dashboard/settings'><IoSettingsOutline /> Settings</Link>
                <div className='dropdown--item' onClick={handleLogout}><IoLogOutOutline /> Logout</div>
            </div>
        </>
    )
}

export default Dropdown