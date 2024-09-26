import React from 'react'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';

import Darkmode from '../../components/Darkmode';
import { MdOutlineLightMode } from 'react-icons/md';
import TooltipUI from '../../components/TooltipUI';

function MenuButton({ title, icon, action }) {
    const { isMenuCollapsed, isDarkMode, onMode } = useDataContext();
    const { width } = useWindowSize();
    const modifiedTitle = title === 'Dark Mode' ? (isDarkMode ? 'Turn Off ' : 'Turn On ') + title : title;

    return (
        <>
            {(width > 900) && (
                <>
                    {isMenuCollapsed ? (
                        <TooltipUI title={modifiedTitle}>
                            <button className='menu--button' onClick={() => (title === 'Dark Mode') ? onMode(): action()}>
                                {title === 'Dark Mode' ? (
                                    isDarkMode ? <span className='menu--icon'>{<MdOutlineLightMode />}</span> : <span className='menu--icon'>{icon}</span>
                                ) : (
                                    <span className='menu--icon'>{icon}</span>
                                )}

                            </button>
                        </TooltipUI>
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