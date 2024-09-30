import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { validateForm } from '../../utils/helper';

import AuthsUI from '../authComponents/AuthsUI';
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import AuthUserRating from '../authComponents/AuthUserRating';
import data_img from '../../assets/images/resources/alex-robinson-rrI02QQ9GSQ-unsplash.jpg'

import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';


const headingText = "Manage your business online like the boss that you are."

function index() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState({
        authLoading: false,
        mainLoading: false
    });
    const [response, setResponse] = useState({
        status: '',
        message: ''
    })

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { user, handleChange } = useAuthContext();
    const smallHeight = width <= 600 && height <= 625;

    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoading = function (key, value) {
        setIsLoading({
            ...isLoading, [key]: value,
        });
    }

    const handleResetResponse = function() {
        setResponse({ status: '', message: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validateForm(formData, 'login');
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length >= 1) return;

        // NEXT, IMPLEMENT THE LOGIN REQUEST
        try {
            handleLoading('mainLoading', true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ ...formData })
            });
            if (!res.ok) {
                throw new Error("Something went wrong, Check internet connection");
			}
            
            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            if(data.status !== 'success') {
                if(data.message === "Account not verified!") {
                    localStorage.setItem("otp_user", JSON.stringify({ ...data.data.user, message: "not_verified" }));

                    setTimeout(function() {
                        navigate('/verify-otp');
                    }, 1000)
                }
                throw new Error(data.message);
            }

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: data.status, message: data.message });
            setTimeout(function() {
                handleChange(data.data.user, data.token);
            }, 2000);
        } catch (err) {
            console.log(err)
            setResponse({ status: 'error', message: err.message })
        } finally {
            handleLoading('mainLoading', false);
        }
    }

    useEffect(function() {
        if (user) {
            navigate("/");
        }
    }, [user])



    /*
    
        Extras
    
    
    */

    return (
        <> 
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            {isLoading.mainLoading && <Spinner /> }
            
            <AuthsUI backText="Back to home" backLink="https://www.getquicka.com" dataimg={data_img} heading={headingText} extras={{marginBottom: '5.6rem'}}>
                <form className="auth--form" onSubmit={handleSubmit}>
                    <div>
                        <h2 className='form--heading'>Welcome Back!👋🏿</h2>
                        {width <= 850 && (
                            <div className='auth--extra-info'>
                                <p className='auth--right-text'>Take Control, Grow, Manage, market, and succeed with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>
                                <AuthUserRating />
                            </div>
                        )}
                    </div>
                    <div className="form--item">
                        <label className='form--label' htmlFor="email">Email Adress</label>
                        <input
                            type="text"
                            id="email" name='email'
                            className='form--input'
                            placeholder='youremail@email.com'
                            onChange={handleFormChange}
                            value={formData.email}
                        />
                        <span className="form--error-message">
                            {formErrors.email && formErrors.email}
                        </span>
                    </div>

                    <div className="form--item">
                        <label className='form--label' htmlFor="password">Password</label>
                        <div className="form--input-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                id="password"
                                className='form--input'
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                value={formData.password}
                                onChange={handleFormChange}
                            />
                            <div className='form--input-icon' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <ImEye /> : <ImEyeBlocked />}
                            </div>
                        </div>
                        <span className="form--error-message">
                            {formErrors.password ? formErrors.password : ''}
                        </span>
                    </div>

                    <div className="form--flex">
                        <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                            <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                                {isChecked && <FaCheck />}
                            </div>
                            <label className='form--text' htmlFor="checkbox">Remember Password</label>
                        </div>

                        <Link to='/forgot-password'>Forgot Password</Link>
                    </div>

                    <button type="submit" className='form--submit'>Login</button>

                    <div className="form--info">
                        <p>Dont have an account? <Link to='/signup'>Create One</Link></p>
                    </div>
                </form>

            </AuthsUI>
        </>
    )
}

export default index