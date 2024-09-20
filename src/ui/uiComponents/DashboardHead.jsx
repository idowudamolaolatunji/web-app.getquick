import React from 'react';

import logo_img from '../../assets/images/alloura-removebg-preview.png'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useDataContext } from '../../context/DataContext';

function DashboardHead() {

    const { isMenuClosed, handleMenuClose } = useDataContext();

    return (
        <header className='dashboard--header'>
            <div className='dashboard--logo-box'>
                <img src={logo_img} alt='' className='dashboard--logo' />
                <div className='dashboard--header-control' onClick={handleMenuClose}>
                    {isMenuClosed ? (
                        <SlArrowRight className='header--arrow' />
                    ) : (
                        <SlArrowLeft className='header--arrow' />
                    )}
                </div>
            </div>


            <div></div>
        </header>
    )
}

export default DashboardHead