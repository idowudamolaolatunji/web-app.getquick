import React from 'react'
import Switch from "react-switch";

import { CgProfile } from 'react-icons/cg'
import { LuSettings } from 'react-icons/lu'
import { TbLogout2 } from 'react-icons/tb'
import { useDataContext } from '../context/DataContext';
import { MdLightMode, MdOutlineDarkMode, MdOutlineDisplaySettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Dropdown({ isShown }) {
    const { onMode, isDarkMode } = useDataContext();

  return (
    <div className={`dropdown ${isShown ? 'is-shown' : ''}`}>
        <div className='dropdown--item' style={{ cursor: 'auto' }}>
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