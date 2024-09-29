import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import AuthUserRating from './AuthUserRating';

import { MdArrowBackIosNew } from 'react-icons/md';
import logo_black from '../../assets/images/logo/logo-black.png'
import logo_white from '../../assets/images/logo/logo-white.png'
import '../auth.css'

function AuthsUI({ heading, backText, backLink, dataimg, centered=true, overflowLeft=false, children }) {
    const { width } = useWindowSize();

    const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${dataimg})`
    }

    return (
        <section className='auth__section'>
            <div className="auth--left" style={ overflowLeft ? { overflow: 'auto' } : {}}>
                <div className='auth--left-top'>
                    {width <= 850 && (
                        <div className="auth--logo">
                            <img src={logo_black} alt="quicka logo" />
                        </div>
                    )}
                    {backLink.startsWith('https://') ? (
                        <a href={backLink} className='auth--left-link'>
                            <MdArrowBackIosNew />
                            <p>{backText}</p>
                        </a>
                    ) : (
                        <Link to={backLink} className='auth--left-link'>
                            <MdArrowBackIosNew />
                            <p>{backText}</p>
                        </Link>
                    )}
                </div>

                <div className={`auth--left-container ${centered ? 'centered' : ''}`}>
                    {children}
                </div>
            </div>

            <div className="auth--right" style={style}>
                <div className="auth--logo">
                    <img src={logo_white} alt="quicka logo" />
                </div>
                <h3 className="auth--right-heading">{heading}</h3>
                <p className='auth--right-text'>Take Control, Grow, Manage, market, and succeed with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>

                <AuthUserRating />
            </div>
        </section>
    )
}

export default AuthsUI;