import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useWindowSize } from 'react-use';

import { FaCheck } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

import logo_image from '../../assets/images/logo/logo.png'
import img_user1 from '../../assets/images/resources/user-img.jpg'
import img_user2 from '../../assets/images/resources/user-img2.jpg'
import img_user3 from '../../assets/images/resources/user-img3.jpg'
import img_user0 from '../../assets/images/resources/user-img4.jpg'
import '../auth.css'
import { div } from 'framer-motion/client';

function index() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const { width } = useWindowSize();


    return (
        <section className='auth__section'>
            <div className="auth--left">
                <div className='auth--left-top'>
                    {width <= 850 && (
                        <div className="auth--logo">
                            <img src={logo_image} alt="" />
                        </div>
                    )}
                    <a href='https://www.getquicka.com' className='auth--left-link'>
                        <MdArrowBackIosNew />
                        <p>Back to home</p>
                    </a>
                </div>


                <div className="auth--left-container">
                    <form className="auth--form">
                        <div>
                            <h2 className='form--heading'>Welcome Back!👋🏿</h2>
                            {width <= 850 && (
                                <div className='auth--extra-info'>
                                    <p className='auth--right-text'>Take Control, Grow, Manage, market, and succeed with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>

                                    <div className='auth--right-details'>
                                        <div className="auth--right-users">
                                            <img src={img_user0} alt="" />
                                            <img src={img_user1} alt="" />
                                            <img src={img_user2} alt="" />
                                            <img src={img_user3} alt="" />
                                        </div>

                                        <span className='auth--right-rating'>
                                            <span>
                                                <Rating name="read-only" value={5} readOnly />
                                                <p>5.0</p>
                                            </span>
                                            <p>from 20+ businesses</p>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="form--item">
                            <label className='form--label' htmlFor="email">Email Adress</label>
                            <input type="email" id="email" className='form--input' placeholder='youremail@email.com' />
                        </div>
                        <div className="form--item">
                            <label className='form--label' htmlFor="password">Password</label>

                            <div className="form--input-box">
                                <input
                                    type={showPassword ? "text" : "password"} id="password" className='form--input' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                />

                                <div className='form--input-icon' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                </div>
                            </div>
                        </div>

                        <div className="form--flex">
                            <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                                <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                                    {isChecked && <FaCheck />}
                                </div>
                                <label className='form--text' htmlFor="checkbox">Remember Me</label>
                            </div>

                            <Link to='/'>Forgot Password</Link>
                        </div>

                        <button type="submit" className='form--submit'>Login</button>

                        <div className="form--info">
                            <p>Dont have an account? <Link to='/signup'>Create One</Link></p>
                        </div>
                    </form>
                </div>
            </div>

            <div className="auth--right">
                <div className="auth--logo">
                    <img src={logo_image} alt="" />
                </div>
                <h3 className="auth--right-heading">Manage your business online like the boss that you are.</h3>
                <p className='auth--right-text'>Take Control, Grow, Manage, market, and succeed with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>

                <div className='auth--right-details'>
                    <div className="auth--right-users">
                        <img src={img_user0} alt="" />
                        <img src={img_user1} alt="" />
                        <img src={img_user2} alt="" />
                        <img src={img_user3} alt="" />
                    </div>

                    <span className='auth--right-rating'>
                        <span>
                            <Rating name="read-only" value={5} readOnly />
                            <p>5.0</p>
                        </span>
                        <p>from 20+ businesses</p>
                    </span>
                </div>
            </div>

        </section>
    )
}

export default index