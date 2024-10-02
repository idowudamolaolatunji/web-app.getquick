import React, { useEffect, useState } from 'react'
import AuthsUI from '../authComponents/AuthsUI';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom';

import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import AuthUserRating from '../authComponents/AuthUserRating';
import { validateForm } from '../../utils/helper';

import { useWindowSize } from 'react-use';
import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import data_img from '../../assets/images/resources/micheal-ogungbe-pBR_6uEh6F0-unsplash.jpg'
import Asterisk from '../../components/Asterisk';


const headingText = "The Power to Manage Your Business, at Your Fingertips."

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
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        phoneNumber: '',
        dialCode: '',
        countryCode: '',
        country: '',
        password: '',
        passwordConfirm: ''
    });
    
    const { width } = useWindowSize();
    const navigate = useNavigate();

    const handleFormChange = function (e, val, opts) {
        console.log(e, val, opts)
        if (!e && (val || opts)) {
            let num = val?.slice(0, 4).includes("0") ? opts?.dialCode + val?.slice(4) : val;
            console.log(num)
            setFormData({ ...formData, phone: num, phoneNumber: val?.slice(3), dialCode: opts?.dialCode, countryCode: opts?.countryCode, country: opts?.name });
            return;
        }
        const { name, value } = e?.target;
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

    const handleResetResponse = function () {
        setResponse({ status: '', message: '' });
    }


    const storeInUserInStorage = function() {
        const otpUser = { email: formData.email, name: formData.firstname }
        localStorage.setItem("otp_user", JSON.stringify(otpUser));
    }

    

    useEffect(function() {
        document.title = "Quicka | Create an Account 🎉";
    }, [])


    useEffect(function () {
        setFormData(prev => ({ ...prev, passwordConfirm: prev.password }));
    }, [formData.password]);


    useEffect(function() {
        if(isLoading.mainLoading) {
            handleResetResponse()
        }
    }, [isLoading.mainLoading]);


    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validateForm(formData, 'signup');
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length >= 1) return;
        

        // NEXT, IMPLEMENT THE LOGIN REQUEST
        try {
            if(!isChecked) {
                // IF THE CHECKED IS NOT CHECKED
                setResponse({ status: "error", message: "Accept terms and conditions" });
                setTimeout(() => handleResetResponse(), 2000);
                return;
            }

            // RUN THE LOADING SPINNER
            handleLoading('mainLoading', true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/signup`, {
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
            if (data.status !== 'success') {
                throw new Error(data.message);
            }

            // SAVE USER NEEDED INFO IN LOCALSTORAGE
            storeInUserInStorage();

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: data.status, message: data.message });
            setTimeout(function () {
                navigate('/verify-otp');
            }, 1000);
        } catch (err) {
            console.log(err.message)
            setResponse({ status: 'error', message: err.message })
        } finally {
            handleLoading('mainLoading', false);
        }
    }


    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            {isLoading.mainLoading && <Spinner />}

            <AuthsUI backText="Back to home" backLink="https://www.getquicka.com" dataimg={data_img} heading={headingText} centered={false} overflowLeft={true}>

                <form className="auth--form" onSubmit={handleSubmit} style={{ padding: '8rem 0', width: '90%' }}>
                    <div>
                        <h2 className='form--heading' style={width > 850 ? { color: '#ff7a49' } : { color: 'inherit' }}>Create Account 🎉</h2>
                        {width <= 850 && (
                            <div className='auth--extra-info'>
                                <p className='auth--right-text'>Simplify, Automate, Dominate: Business Made Easy with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>
                                <AuthUserRating />
                            </div>
                        )}
                    </div>

                    <div className="form--item">
                        <label className='form--label' htmlFor="email">Business Email <Asterisk /></label>
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


                    <div className="form--grid">
                        <div className="form--item">
                            <label className='form--label' htmlFor="firstname">First Name <Asterisk /></label>
                            <input
                                type="text"
                                id="firstname" name='firstname'
                                className='form--input'
                                placeholder='John'
                                onChange={handleFormChange}
                                value={formData.firstname}
                            />
                            <span className="form--error-message">
                                {formErrors.firstname && formErrors.firstname}
                            </span>
                        </div>
                        <div className="form--item">
                            <label className='form--label' htmlFor="email">Last Name <Asterisk /></label>
                            <input
                                type="text"
                                id="lastname" name='lastname'
                                className='form--input'
                                placeholder='Doe'
                                onChange={handleFormChange}
                                value={formData.lastname}
                            />
                            <span className="form--error-message">
                                {formErrors.lastname && formErrors.lastname}
                            </span>
                        </div>
                    </div>


                    <div className="form--item">
                        <label className='form--label' htmlFor="phone">Phone Number <Asterisk /></label>

                        <PhoneInput
                            country={'ng'}
                            defaultErrorMessage="Only Nigeria and Ghana"
                            value={formData.phone}
                            inputProps={{ name: 'phone', id: 'phone' }}
                            onChange={(phone, country) => handleFormChange(null, phone, country)}
                            inputClass='phone-input'
                            onlyCountries={['gh', 'ng']}
                            buttonStyle={{ backgroundColor: 'transparent', border: 'none', paddingLeft: '.4rem', height: '4rem', margin: '.2rem 0' }}
                            countryCodeEditable={true}
                            dropdownStyle={{ top: '100%', marginTop: 0, borderRadius: '.4rem', padding: '.2rem' }}
                        />

                        <span className="form--error-message">
                            {formErrors.phone && formErrors.phone}
                        </span>
                    </div>


                    <div className="form--item">
                        <label className='form--label' htmlFor="password">Password <Asterisk /></label>
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


                    <div className="form--item-flex">
                        <div id="checkbox" className={isChecked ? 'is-selected' : ''} onClick={() => setIsChecked(!isChecked)}>
                            {isChecked && <FaCheck />}
                        </div>
                        <p className='form--info'>
                            I agree to the <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a>
                        </p>
                    </div>

                    <button type="submit" className='form--submit'>Continue</button>

                    <div className="form--info">
                        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
                    </div>

                    {width > 450 && <div style={{ paddingBottom: '6rem' }} />}
                </form>

            </AuthsUI>
        </>
    )
}

export default index