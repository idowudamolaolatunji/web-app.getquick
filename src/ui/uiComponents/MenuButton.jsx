import React from 'react'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Button, styled } from '@mui/material';
import Darkmode from '../../components/Darkmode';


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
    const { isMenuCollapsed } = useDataContext();
    const { width } = useWindowSize();

    return (
        <>
            {(width > 900) && (
                <>
                    {isMenuCollapsed ? (
                        <Tooltip11
                            title={title}
                            TransitionComponent={Zoom}
                            enterDelay={250}
                            enterNextDelay={150}
                            placement="right"
                            disableInteractive
                        >
                            <button className='menu--button' onClick={action}>
                                <span className='menu--icon'>{icon}</span>
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