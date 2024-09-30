import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useWindowSize } from 'react-use';
import { Link, useNavigate } from 'react-router-dom';
import AuthsUI from '../authComponents/AuthsUI';
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import { countdownTimer, validateForm } from '../../utils/helper';

import { HiFingerPrint } from 'react-icons/hi';
import data_img from '../../assets/images/resources/good-faces-lhMdsnK_KWk-unsplash.jpg'

const headingText = "Take Control of Your Business, Anywhere, Anytime"

function index() {
    const [timeLeft, setTimeLeft] = useState('02:00');
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({
        status: '',
        message: ''
    })

    const navigate = useNavigate();
    const otpUser = localStorage.getItem("otp-user") ? JSON.parse(localStorage.getItem("otp-user")) : null;

    const handleResetResponse = function () {
        setResponse({ status: null, message: null });
    }

    const handleChangeOtp = function(value) {
        setFormData({ ...formData, otp: value });
    }

    useEffect(function() {
        if(!otpUser) navigate('/signup');
        else {
            countdownTimer(120, setTimeLeft);
            setFormData({ ...formData, email: otpUser?.email})
        }
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validateForm(formData, 'verifyOtp');
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length >= 1) return;

        try {
            setIsLoading(true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/verify-otp`, {
                method: 'PATCH',
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
            console.log(data);
            if (data.status !== 'success') {
                throw new Error(data.message);
            }

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: data.status, message: data.message });
            localStorage.removeItem("otp-user");
            setTimeout(function() {
                navigate('/')
            }, 1500);
        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setIsLoading(false);
        }
    }


    async function handleResend() {
        try {
            setIsLoading(true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/request-otp`, {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!res.ok) {
                throw new Error("Something went wrong, Check internet connection");
            }

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            console.log(data);
            if (data.status !== 'success') {
                throw new Error(data.message);
            }

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: data.status, message: data.message });

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            {isLoading && <Spinner />}


            <AuthsUI backText="Back to signup" backLink="/signup" dataimg={data_img} heading={headingText} extras={{ marginBottom: '5.6rem' }}>
                <form className="auth--form" onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    <div>
                        <HiFingerPrint style={{ fontSize: '3.4rem', marginBottom: '2rem' }} />

                        <h2 className='form--heading' style={{ fontSize: '2.8rem' }}>Welcome Back! {otpUser?.firstname}</h2>

                        <p className='form--info'>We sent a 4-digit code to <span style={{ fontWeight: '700' }}>{otpUser?.email}</span> <br />and it expires in <span style={{ fontWeight: '700', color: '#ff7a49' }}>{timeLeft} mins</span></p>
                    </div>

                    <div className="form--item otp--item">
                        <OtpInput
                            value={formData.otp}
                            onChange={handleChangeOtp}
                            numInputs={4}
                            renderSeparator={<span>{" "}</span>}
                            renderInput={(props) => <input {...props} />}
                            containerStyle={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}
                        />
                        <span className="form--error-message">
                            {formErrors.otp && formErrors.otp}
                        </span>
                    </div>

                    <button type="submit" className='form--submit'>Continue</button>

                    <div className="form--info">
                        <p>Didn't Recieve an OTP or OTP Expired? <button onClick={handleResend}>Resend!</button></p>
                    </div>
                </form>
            </AuthsUI>
        </>
    )
}

export default index