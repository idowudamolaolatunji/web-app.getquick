import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { getInitials } from '../utils/helper';

function UserIntialsImage() {
    const { user } = useAuthContext();
    const BASE_API_URL = import.meta.env.VITE_API_URL;

    return (
        <>
            {user.avatar ? (
                <img className='item--user-img' src={`${BASE_API_URL}/${user.avatar}`} alt={user.fullname} />
            ) : (
                <span className='item--user-img'>{getInitials(user?.fullname)}</span>
            )}
        </>
    )
}

export default UserIntialsImage