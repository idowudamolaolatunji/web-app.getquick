import React, { useEffect, useState } from 'react'

import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import TooltipUI from '../../components/TooltipUI';
import Asterisk from '../../components/Asterisk';

import logo_demo from '../../assets/images/resources/logo-demo.png'
import ConfettiUI from '../../components/ConfettiUI';
import { useNavigate } from 'react-router-dom';


function index() {
    const [isCopied, setIsCopied] = useState(false);
    const [response, setResponse] = useState({
        status: '',
        message: ''
    })
    const [onboardingData, setOnboardingData] = useState({
        name: "",
        url: "",
        category: ""
    });
    // const [onboardingData, setOnboardingData] = useState({
    //     step1: {
    //         name: "",
    //         url: "",
    //         category: ""
    //     },
    //     step2: {

    //     }
    // });
    const [onboardTabNum, setOnboardTabNum] = useState(1);
    const [image, setImage] = useState({
        file: null,
        preview: null
    });

    const navigate = useNavigate()

    const handleResetResponse = function () {
        setResponse({ status: null, message: null });
    }

    const handleOnboardDataChange = function (e) {
        const { name, value } = e?.target;
        let sanitizedValue;

        // HERE SANITIZES THE TEXT AND THE URL
        if (name === "name") {
            sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '').replace(/^\s+/, '');
        } else if (name === "url") {
            sanitizedValue = value.replace(/[^a-zA-Z0-9-]/g, '').replace(/^\s+|\s+$/g, '');
        } else {
            sanitizedValue = value;
        }

        setOnboardingData({
            ...onboardingData,
            [name]: sanitizedValue,
        });
    };

    function handleCopyLink() {
        handleResetResponse();
        if (onboardingData.url) {
            const url = onboardingData.url + ".quicka.store";

            navigator.clipboard.writeText(url);
            setIsCopied(true)
            setResponse({ status: "success", message: "Store URL Copied!" });
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage({ ...image, file: file });
            
            const imageUrl = URL.createObjectURL(file);
            setImage({ ...image, preview: imageUrl });
        }
    };

    function handlePrevTab() {
        if(onboardTabNum === 1) return;
        setOnboardTabNum(prev => prev - 1)
    }


    function handleNextTab() {
        if(onboardTabNum === 3) {
            navigate('/congratulations?next=dashboard');
        };
        setOnboardTabNum(prev => prev + 1)
    }


    useEffect(function () {
        const sanitizedUrl = onboardingData?.name?.replace(/\s+/g, '-').toLowerCase();
        setOnboardingData({ ...onboardingData, url: sanitizedUrl })
    }, [onboardingData?.name]);


    useEffect(function () {
        // BAD PRACTICE
        handleResetResponse();
        setIsCopied(false)
    }, [onboardingData?.url]);





    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}
            <section className='onboarding--section'>
                <div className="onboarding--container">

                    <div className="onboarding--top">
                        <p className='onboarding--numbering'>{onboardTabNum}/3 👈🏿</p>
                        <p className='onboarding--subtitle'>You are almost done</p>
                        <h2 className='form--heading' style={{ marginBottom: '.8rem' }}>
                            {onboardTabNum === 1 && "Let's setup your store and dashboard."}
                            {onboardTabNum === 2 && "Lorem ipsum dolor sit amet consectetur."}
                            {onboardTabNum === 3 && "Dolor sit consectetur amet lorem ipsum."}
                        </h2>
                        <p className='auth--right-text'>
                            {onboardTabNum === 1 && "Tell us a bit about your business so that we can provide you a personalised experienced tailored to your business needs and prefenece."}
                            {onboardTabNum === 2 && `What are 2 important things you want Quicka to do for ${onboardingData.name}'s unique business need met consectetur dolor sit amet adipisicing.`}
                            {onboardTabNum === 3 && "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque ipsam, molestias cupiditate corporis dolor sit amet consectetu eos."}
                        </p>
                    </div>

                    <div className="auth--form" style={{ width: '100%', gap: '2.4rem' }}>
                        {onboardTabNum === 1 && (
                            <>
                                <div className="form--item">
                                    <label className="form--label">Business Logo (Optional)</label>
                                    <div className="form--element">
                                        <span>
                                            <img src={image.preview ? image.preview : logo_demo} alt="brand logo" />
                                        </span>
                                        
                                        <div className='form--item'>
                                            <input type='file' id='form--logo' name='image' onChange={handleImageChange} accept="image/*" />
                                            <label htmlFor="form--logo" className='form--upload-btn'>Upload Image</label>
                                            <p style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>png, jpeg and jpg up to 2MB. Recommended size 256x256 (png)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form--item">
                                    <label htmlFor="" className="form--label">Business Name <Asterisk /></label>
                                    <input type="text" className="form--input" placeholder='Business Name' onChange={handleOnboardDataChange} name="name" value={onboardingData.name} />
                                </div>

                                <div className="form--item">
                                    <label htmlFor="" className="form--label">Store URL</label>
                                    <div className="form--input-box">
                                        <input type="text" className="form--input" placeholder='Store url' value={onboardingData.url} name='url' onChange={handleOnboardDataChange} />

                                        {(onboardingData.url && !isCopied) ? (
                                            <TooltipUI title="Copy URL" placement="top">
                                                <span className='url--box' onClick={handleCopyLink}>.quicka.store</span>
                                            </TooltipUI>
                                        ) : (
                                            <span className='url--box' onClick={handleCopyLink}>.quicka.store</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form--item">
                                    <label htmlFor="" className="form--label">What category best describes your business <Asterisk /></label>

                                    <select className='form--select'>
                                        <option disabled selected hidden>Pick a category / industry</option>
                                        <option>Animals & Pets</option>
                                        <option>Baby Products</option>
                                        <option>Books and Media</option>
                                        <option>Arts and Crafts</option>
                                        <option>Beauty and Skincare</option>
                                        <option>Building and Construction</option>
                                        <option>Education</option>
                                        <option>Groceries</option>
                                        <option>Drinks</option>
                                        <option>Mens Fashion</option>
                                        <option>Gym and Fitness</option>
                                        <option>Electronics</option>
                                        <option>Food & Beverages</option>
                                        <option>Others</option>
                                        <option>Home & Kitchen</option>
                                        <option>Gaming</option>
                                        <option>Health & Pharmaceuticals</option>
                                        <option>Makeup and Cosmetics</option>
                                        <option>Kids Fashion</option>
                                        <option>Office Equipment</option>
                                        <option>Personal Care</option>
                                        <option>Phones and Tablets</option>
                                        <option>Professional Services</option>
                                        <option>Restaurant</option>
                                        <option>Toys & Games</option>
                                        <option>Womens Fashion</option>
                                    </select>
                                </div>
                            </>
                        )}


                        {onboardTabNum === 2 && (
                            <>
                                coming...
                            </>
                        )}


                        {onboardTabNum === 3 && (
                            <>
                                <iframe style={{ borderRadius: '.62rem' }} width="auto" height="350" src="https://www.youtube.com/embed/Siwlj-n1S6I?si=nFgeM6FI0OwAV2vQ&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </>
                        )}

                        <div className="form--item">
                            <span className='onboarding--actions'>
                                {onboardTabNum > 1 ? (
                                    <button className='onboard--prev' onClick={handlePrevTab}>Go Back</button>
                                ) : <p></p>}

                                <button className='onboard--next' onClick={handleNextTab}>{onboardTabNum === 3 ? 'Finish' : 'Next Step'}</button>
                            </span>
                        </div>

                    </div>
                </div>

            </section>
        </>

    )
}

export default index



/*

<div className="">
<h2>Business Location </h2>
<div className="form--grid">
    <div className="form--item">
        <label htmlFor="" className="form--label">Country</label>
        <input type="text" className="form--input" placeholder='Country' />
    </div>
    <div className="form--item">
        <label htmlFor="" className="form--label">State</label>
        <input type="text" className="form--input" placeholder='State' />
    </div>
</div>
</div>
*/

