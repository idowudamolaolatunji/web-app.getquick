import React from 'react';

import logo_img from '../../assets/images/alloura-removebg-preview.png'
import { SlArrowDown, SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useDataContext } from '../../context/DataContext';
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi2';
import { IoChevronDownSharp } from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri';

function DashboardHead() {

    const { isMenuCollapsed, handleMenuCollapse } = useDataContext();

    return (
        <header className='dashboard--header'>
            <div className='dashboard--logo-box' style={isMenuCollapsed ? { borderBottomColor: '#eeeff1' } : {} }>
                <img src={logo_img} alt='' className='dashboard--logo' />

                <span className='hamburger--icon-box' onClick={handleMenuCollapse}>
                    {isMenuCollapsed ? (
                        <RiMenu3Fill className='hamburger--icon' />
                    ) : (
                        <RiCloseFill className='hamburger--icon' />
                    ) }
                </span>

                {/* <div className='dashboard--header-control' onClick={handleMenuCollapse}>
                    {isMenuCollapsed ? (
                        <SlArrowRight className='header--arrow' />
                    ) : (
                        <SlArrowLeft className='header--arrow' />
                    )}
                </div> */}
            </div>


            <div className='dashboard--header-nav'>
                <div className=""></div>
                
                <div className="nav--others">
                    <a href="#" className='nav--store-btn'>
                        View Store <MdOutlineStorefront className='icon' />
                    </a>
                    <div className="nav--icon-box notification--icon-box">
                        <HiOutlineBell className='nav--icon' />
                    </div>

                    <span className='nav--user'>
                        <div className="nav--icon-box user--icon-box">
                            <HiOutlineUser className='nav--icon' />
                        </div>
                        <div className='user--info'>
                            <p className='user--name'>Idowu Olatunji</p>
                            <IoChevronDownSharp className='user--icon' />
                        </div>
                    </span>
                </div>

            </div>
        </header>
    )
}

export default DashboardHead