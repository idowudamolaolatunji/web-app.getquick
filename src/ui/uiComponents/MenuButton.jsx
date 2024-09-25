import React from 'react'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Button, styled } from '@mui/material';
import Darkmode from '../../components/Darkmode';
import { MdOutlineLight, MdOutlineLightMode } from 'react-icons/md';


const Tooltip11 = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        boxShadow: theme.shadows[1],
        fontSize: 11,
        fontWeight: 500,
        fontFamily: 'inherit'
    },
}));

function MenuButton({ title, icon, action }) {
    const { isMenuCollapsed, isDarkMode, onMode } = useDataContext();
    const { width } = useWindowSize();
    const modifiedTitle = title === 'Dark Mode' ? (isDarkMode ? 'Turn Off ' : 'Turn On ') + title : title;

    return (
        <>
            {(width > 900) && (
                <>
                    {isMenuCollapsed ? (
                        <Tooltip11
                            title={modifiedTitle}
                            TransitionComponent={Zoom}
                            enterDelay={250}
                            enterNextDelay={150}
                            placement="right"
                            disableInteractive
                        >
                            <button className='menu--button' onClick={() => (title === 'Dark Mode') ? onMode(): action()}>
                                {title === 'Dark Mode' ? (
                                    isDarkMode ? <span className='menu--icon'>{<MdOutlineLightMode />}</span> : <span className='menu--icon'>{icon}</span>
                                ) : (
                                    <span className='menu--icon'>{icon}</span>
                                )}

                            </button>
                        </Tooltip11>
                    ) : (
                        <button className='menu--button' style={{ alignItems: 'center'}} onClick={action}>
                            <span className='menu--icon'>{icon}</span>
                            <p className='menu--text'>{title}</p>
                            {title === 'Dark Mode' && (
                                <Darkmode />
                            )}
                        </button>
                    )}
                </>
            )}
        </>
    )
}

export default MenuButton

// openWidget