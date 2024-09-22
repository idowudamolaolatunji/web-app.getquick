import React from 'react';

import logo_img from '../../assets/images/alloura-removebg-preview.png'
import { SlArrowDown, SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useDataContext } from '../../context/DataContext';
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi2';
import { IoChevronDownSharp } from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri';
import { LuBell, LuUser } from 'react-icons/lu';

function DashboardHead() {

    const { isMenuCollapsed, handleMenuCollapse } = useDataContext();

    return (
        <header className='dashboard--header'>
            <div className='logo--container' style={isMenuCollapsed ? { borderBottomColor: '#eeeff1' } : {} }>
                <img src={logo_img} alt='Quick logo' />

                <span className='hamburger--icon' onClick={handleMenuCollapse}>
                    { isMenuCollapsed ? <RiMenu3Fill /> : <RiCloseFill /> }
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

                    <span className='nav--user'>
                        <div className="nav--icon user--icon">
                            <LuUser />
                        </div>
                        <div className='user--info'>
                            <p className='user--name'>Idowu Olatunji</p>
                            <IoChevronDownSharp />
                        </div>
                    </span>
                </div>

            </div>
        </header>
    )
}

export default DashboardHead