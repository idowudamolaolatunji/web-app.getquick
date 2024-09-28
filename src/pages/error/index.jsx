import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Styles from './error.module.css';
import { IoIosLink } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import logo_img from '../../assets/images/logo/logo-black.png'

function index() {
    return (
        <div className={Styles.error__container}>
            <img src={logo_img} alt='Logo' style={{ width: '10rem' }} />
            <h1 className={Styles.error__heading}>404 <MdErrorOutline /></h1>
            <p className={Styles.error__text}>Sorry! That page you are trying to access cannot be found, It is either broken or doesn't exist.</p>
            <Link to={'/dashboard'} className={Styles.error__btn}> <IoIosLink className="icon" /> Go Home</Link>
        </div>
    )
}

export default index
