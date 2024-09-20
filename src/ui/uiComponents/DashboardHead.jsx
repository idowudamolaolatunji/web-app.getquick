import React from 'react';

import logo_img from '../../assets/images/test-logo.png'
import { SlArrowLeft } from 'react-icons/sl';

function DashboardHead() {
    return (
        <header className='dashboard--header'>
            <div className='dashboard--logo-box'>
                <img src={logo_img} alt='' className='dashboard--logo' />
                <div className='dashboard--header-control'>
                    <SlArrowLeft className='header--arrow' />
                </div>
            </div>


            <div></div>
        </header>
    )
}

export default DashboardHead