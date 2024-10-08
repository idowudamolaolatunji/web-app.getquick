import React from 'react'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';

import Darkmode from '../../components/Darkmode';
import { MdOutlineLightMode } from 'react-icons/md';
import TooltipUI from '../../components/TooltipUI';
import DefaultButton from '../../components/button/DefaultButton';

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
                            <DefaultButton>
                            <button className='menu--button' onClick={() => (title === 'Dark Mode') ? onMode(): action()}>
                                {title === 'Dark Mode' ? (
                                    isDarkMode ? <span className='menu--icon'>{<MdOutlineLightMode />}</span> : <span className='menu--icon'>{icon}</span>
                                ) : (
                                    <span className='menu--icon'>{icon}</span>
                                )}

                            </button>
                            </DefaultButton>
                        </TooltipUI>
                    ) : (
                        <DefaultButton customStyle={{ width: '100%', fontFamily: "inherit" }}>
                            <button className='menu--button' style={{ alignItems: 'center'}} onClick={action}>
                                <span className='menu--icon'>{icon}</span>
                                <p className='menu--text'>{title}</p>
                                {title === 'Dark Mode' && (
                                    <Darkmode />
                                )}
                            </button>
                        </DefaultButton>
                    )}
                </>
            )}
        </>
    )
}


export default MenuButton