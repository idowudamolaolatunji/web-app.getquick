import React, { useState } from 'react'
import AuthUi from '../authComponents/authUi';

import data_img from '../../assets/images/resources/micheal-ogungbe-pBR_6uEh6F0-unsplash.jpg'
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import AuthUserRating from '../authComponents/AuthUserRating';
import { Link, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'





const headingText = "The Power to Manage Your Business, at Your Fingertips."
const customStyle = {
    gridTemplateColumns: '1.65fr 3fr'
}

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
        password: '',
    });

    const [value, setValue] = useState()

    const { width } = useWindowSize();

    const handleFormChange = function (e, ex) {
        if(!e && ex) {
            setFormData({ ...formData, phone: ex });
            return;
        }
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

    const handleResetResponse = function () {
        setResponse({ status: '', message: '' });
    }

    async function handleSubmit(e) {

        try {

        } catch (err) {

        } finally {

        }
    }



    return (
        <>

            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            {isLoading.mainLoading && <Spinner />}


            <AuthUi backText="Back to home" backLink="https://www.getquicka.com" dataimg={data_img} heading={headingText} centered={false} overflowLeft={true}>
                <form className="auth--form" onSubmit={handleSubmit} style={{ padding: '8rem 0', width: '90%' }}>
                    <div>
                        <h2 className='form--heading'>Create an Account 🎉</h2>
                        {width <= 850 && (
                            <div className='auth--extra-info'>
                                <p className='auth--right-text'>Simplify, Automate, Dominate: Business Made Easy with easy-to-use tools designed for entrepreneurs like you. Trusted by 100+ businesses</p>
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


                    <div className="form--grid">
                        <div className="form--item">
                            <label className='form--label' htmlFor="firstname">First Name</label>
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
                            <label className='form--label' htmlFor="email">Last Name</label>
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
                        <label className='form--label' htmlFor="phone">Phone Number</label>

                        <PhoneInput
                            country={'ng'}
                            value={formData.phone}
                            inputProps={{ name: 'phone', id: 'phone' }}
                            onChange={phone => handleFormChange(null, phone)}
                            inputClass='phone-input'
                            onlyCountries={['gh', 'ng']}
                            buttonStyle={{ backgroundColor: 'transparent', border: 'none', paddingLeft: '.4rem', height: '4rem', margin: '.2rem 0' }}
                            countryCodeEditable={false}
                            dropdownStyle={{ top: '100%', marginTop: 0, borderRadius: '.4rem', padding: '.2rem' }}
                        />

                        <span className="form--error-message">
                            {formErrors.phone && formErrors.phone}
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


                    <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                        <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                            {isChecked && <FaCheck />}
                        </div>
                        <label className='form--text' htmlFor="checkbox">
                            I agree to the <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className='form--submit'>Continue</button>

                    <div className="form--info">
                        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
                    </div>

                    <div style={{ paddingBottom: '6rem'}} />
                </form>
            </AuthUi>
        </>
    )
}

export default index