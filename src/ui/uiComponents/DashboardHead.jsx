import React, { useEffect, useState } from 'react';

import logo_img from '../../assets/images/logo.png'
import { useDataContext } from '../../context/DataContext';
// import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi2';
import { IoChevronDownSharp } from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri';
import { LuBell, LuPanelLeftClose, LuPanelRightClose, LuUser } from 'react-icons/lu';

import { useWindowSize } from 'react-use';
import Dropdown from '../../components/Dropdown';
import { Link } from 'react-router-dom';

function DashboardHead() {

    const [isShownDropdown, setIsShownDropdown] = useState(false);

    const { isMenuCollapsed, handleMenuCollapse, handleShowSidemenu } = useDataContext();
    const { width } = useWindowSize();

    function handleShowDropdown() {
        setIsShownDropdown(true)
    }


    return (
        <header className='dashboard--header'>
            <div className='logo--container' style={isMenuCollapsed ? { borderBottomColor: '#eeeff1' } : {} }>
                <Link to='/'>
                    <img src={logo_img} alt='Quick logo' />
                </Link>

                <span className='hamburger--icon' onClick={(width > 900) ? handleMenuCollapse : handleShowSidemenu}>
                    {(width > 900) ? (
                        isMenuCollapsed ? <LuPanelRightClose style={{ fontSize: '2rem' }} /> : <LuPanelLeftClose style={{ fontSize: '2rem' }} /> 
                    ) : (
                        <RiMenu3Fill />
                    )}
                </span>
            </div>


            <div className='nav--container'>
                <div className=""></div>
                
                <div className="nav--others">
                    <a href="https://www.luxeware.quicka.shop" target='_blank' className='store--btn'>
                        View Store <MdOutlineStorefront />
                    </a>

                    
                    <div className="nav--icon notification--icon">
                        <LuBell />
                    </div>

                    <div className='nav--user' onClick={handleShowDropdown}>
                        <div className="nav--icon user--icon">
                            <LuUser />
                        </div>
                        <div className='user--info'>
                            <p className='user--name'>Idowu Olatunji</p>
                            <IoChevronDownSharp />
                        </div>
                    </div>

                    {isShownDropdown && (
                        <Dropdown isShown={isShownDropdown} setIsShown={setIsShownDropdown} />
                    )}
                </div>

            </div>
        </header>
    )
}

export default DashboardHead