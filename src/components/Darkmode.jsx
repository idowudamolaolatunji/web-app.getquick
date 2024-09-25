import React, { useState } from 'react'
import { useDataContext } from '../context/DataContext';
// import { Switch } from '@mui/material';
import ReactSwitch from 'react-switch';

function Darkmode() {
    const { onMode, isDarkMode } = useDataContext();

    // const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
        <ReactSwitch
            onChange={next => onMode(next)}
            checked={isDarkMode}
            className='mode--switch'
            onColor='#ddd'
            offColor='#f1f1f1'
            handleDiameter={10}
            height={16}
            width={44}
        />
    </div>
  )
}

export default Darkmode