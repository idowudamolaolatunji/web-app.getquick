import React, { useEffect, useRef, useState } from 'react'
import Switch from "react-switch";
import { Link } from 'react-router-dom';

import { CgProfile } from 'react-icons/cg'
import { LuSettings } from 'react-icons/lu'
import { TbLogout2 } from 'react-icons/tb'
import { MdDarkMode, MdLightMode, MdOutlineDarkMode, MdOutlineDisplaySettings } from 'react-icons/md';
import { useOutsideClick } from '../hooks/useOutsideClick';


function Dropdown({ setIsShown }) {
    const ref = useOutsideClick(handleClose);
    
    function handleClose() {
        setIsShown(false);
    }

    return (
        <div className={`dropdown`} ref={ref}>
            <Link className='dropdown--item' to='/dashboard/profile'><CgProfile /> Profile</Link>
            <div className='dropdown--item'><MdOutlineDisplaySettings /> Maintenance Status</div>
            <Link className='dropdown--item' to='/dashboard/settings'><LuSettings /> Settings</Link>
            <div className='dropdown--item'><TbLogout2 /> Logout</div>
        </div>
    )
}

export default Dropdown