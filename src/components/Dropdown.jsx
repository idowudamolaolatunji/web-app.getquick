import React, { useRef, useState } from 'react'
import Switch from "react-switch";
import { Link } from 'react-router-dom';

import { CgProfile } from 'react-icons/cg'
import { LuSettings } from 'react-icons/lu'
import { TbLogout2 } from 'react-icons/tb'
import { useDataContext } from '../context/DataContext';
import { MdLightMode, MdOutlineDarkMode, MdOutlineDisplaySettings } from 'react-icons/md';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Classic } from "@theme-toggles/react";


function Dropdown({ isShown, setIsShown }) {
    // const [isToggled, setToggle] = useState(false)
    const { onMode, isDarkMode } = useDataContext();
    
    const ref = useOutsideClick(handleClose);
    
    function handleClose() {
        setIsShown(false);
    }

    return (
        <div className={`dropdown ${isShown ? 'is-shown' : ''}`} ref={ref}>
            <div className='dropdown--item' style={{ cursor: 'auto' }}>
                {/* <Classic toggled={isToggled} toggle={setToggle} /> */}
                
                <Switch
                    onChange={next => onMode(next)}
                    checked={isDarkMode}
                    className="mode--switch"
                    uncheckedHandleIcon={<MdLightMode />}
                    uncheckedIcon={<MdOutlineDarkMode />}
                    checkedIcon={<MdLightMode />}
                    checkedHandleIcon={<MdOutlineDarkMode />}
                    onColor='#eee'
                    offColor='#eee'
                    handleDiameter={18}
                    height={24}
                />
               
                Switch to{' '}{isDarkMode ? 'Light' : 'Dark'}{' '} Mode
            </div>
            <Link className='dropdown--item' to='/dashboard/profile'><CgProfile /> Profile</Link>
            <div className='dropdown--item'><MdOutlineDisplaySettings /> Maintenance Status</div>
            <Link className='dropdown--item' to='/dashboard/settings'><LuSettings /> Settings</Link>
            <div className='dropdown--item'><TbLogout2 /> Logout</div>
        </div>
    )
}

export default Dropdown