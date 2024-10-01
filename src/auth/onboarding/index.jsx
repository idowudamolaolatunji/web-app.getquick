import React, { useEffect, useState } from 'react'

import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/spinner/spinner_two'
import TooltipUI from '../../components/TooltipUI';
import Asterisk from '../../components/Asterisk';

import logo_demo from '../../assets/images/resources/logo-demo.png'
import { useNavigate } from 'react-router-dom';
import { validateOnboardForm } from '../../utils/helper';
import { useAuthContext } from '../../context/AuthContext';


function index() {
    const navigate = useNavigate();
    const { handleChange } = useAuthContext()
    const [isReturned, setIsReturned] = useState(false);
    const [storeCategories, setStoreCategories] = useState([]);
    const [onboardingErrors, setOnboardingErrors] = useState({});
    const [isCopied, setIsCopied] = useState(false);
    const [response, setResponse] = useState({
        status: null,
        message: null
    });

    const [onboardingData, setOnboardingData] = useState({
        name: "",
        url: "",
        category: ""
    });
    
    const [onboardTabNum, setOnboardTabNum] = useState(localStorage.getItem("tab_num") ? JSON.parse(localStorage.getItem("tab_num")) : 1);
    const [image, setImage] = useState({
        file: null,
        preview: null
    });

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
        setIsReturned(false);
        if(onboardTabNum === 1) return;
        setOnboardTabNum(prev => prev - 1)
    }

    function handleNextTab(e) {
        setIsReturned(false);
        if(onboardTabNum === 1) {
            const newErrors = validateOnboardForm(onboardingData);
            console.log(newErrors)
            setOnboardingErrors(newErrors);

            if (Object.keys(newErrors).length >= 1) return;
        }
        if(onboardTabNum === 3) {
            handleSubmit(e);
            return;
        };
        setOnboardTabNum(prev => prev + 1);
    }


    
    useEffect(function() {
        const userId = localStorage.getItem('user_id');
        if(!userId) navigate(-1);
        if(userId.endsWith("-setup")) {
            setIsReturned(true);
            localStorage.setItem('user_id', userId.replace("-setup", ""));
        }
    }, []);


    // GET THE STORE CATEGORIES
    useEffect(function() {
        if(!storeCategories  || storeCategories.length < 1) {
            getStoreCategories()
        }
    }, []);

    // SANITIZE THE NAME AS THE LINK, REPLACING SPACES WITH -
    useEffect(function () {
        const sanitizedUrl = onboardingData?.name?.replace(/\s+/g, '-').toLowerCase();
        setOnboardingData({ ...onboardingData, url: sanitizedUrl })
    }, [onboardingData?.name]);


    // ONLY WHEN WE RE-WRITE OUR LINK BEFORE WE CAN RECOPY IT
    useEffect(function () {
        // BAD PRACTICE
        handleResetResponse();
        setIsCopied(false);
    }, [onboardingData?.url]);

    
    // KEEP TRACK OF THE TAB NUMBER
    useEffect(function() {
        localStorage.setItem("tab_num", JSON.stringify(onboardTabNum));
    }, [onboardTabNum]);


    async function getStoreCategories() {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/stores/category`);
            const data = await res.json();
            setStoreCategories(data.data.categories);
        } catch(err) {
            console.log(err.message);
        }
    }

    async function handleSubmit(e) {
        console.log(e)
        try {

            // your logic....
            
            localStorage.setItem(`${import.meta.env.VITE_CONGRATS_KEY}`, "access");

            setTimeout(function() {
                localStorage.removeItem("tab_num");
                navigate('/congratulations?next=dashboard');
            }, 1000);

            handleChange(userId, userId);
            

        } catch(err) {

        } finally {

        }
    }


    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}
            <section className='onboarding--section'>
                <div className="onboarding--container">

                    <div className="onboarding--top">
                        <span className='returned--box'>
                            <p className='onboarding--numbering'>{onboardTabNum}/3 👈🏿</p>
                            {isReturned && <p className='returned--text'>You have to set up your store</p>}
                        </span>
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
                                    <label className="form--label" htmlFor='logo'>Business Logo (Optional)</label>
                                    <div className="form--element">
                                        <span>
                                            <img src={image.preview ? image.preview : logo_demo} alt="brand logo" />
                                        </span>
                                        
                                        <div className='form--item'>
                                            <input type='file' id='logo' name='image' onChange={handleImageChange} accept="image/*" />
                                            <label htmlFor="logo" className='form--upload-btn'>Upload Image</label>
                                            <p style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>png, jpeg and jpg up to 2MB. Recommended size 256x256 (png)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form--item">
                                    <label htmlFor="name" className="form--label">Business Name <Asterisk /></label>
                                    <input type="text" className="form--input" placeholder='Business Name' onChange={handleOnboardDataChange} name="name" id='name' value={onboardingData.name} />
                                    <span className="form--error-message">
                                        {onboardingErrors.name && onboardingErrors.name}
                                    </span>
                                </div>

                                <div className="form--item">
                                    <label htmlFor="url" className="form--label">Store URL</label>
                                    <div className="form--input-box">
                                        <input type="text" id='url' className="form--input" placeholder='Store url' value={onboardingData.url} name='url' onChange={handleOnboardDataChange} />

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
                                    <label htmlFor="category" className="form--label">What category best describes your business <Asterisk /></label>

                                    <select className='form--select' value={onboardingData.category} name='category' id='category' onChange={handleOnboardDataChange}>
                                        <option disabled defaultValue hidden>Pick a category / industry</option>
                                        {(storeCategories.length > 0) && storeCategories.map((storeCategory) => (
                                            <option value={storeCategory?.slug} key={storeCategory.slug}>{storeCategory?.name}</option>
                                        ))}
                                    </select>
                                    <span className="form--error-message">
                                        {onboardingErrors.category && onboardingErrors.category}
                                    </span>
                                </div>
                            </>
                        )}


                        {onboardTabNum === 2 && (
                            <>
                                {/* remove soon */}
                               <p className='returned--text'>coming soon...</p> 
                            </>
                        )}


                        {onboardTabNum === 3 && (
                            <>
                                <iframe style={{ borderRadius: '.62rem' }} width="auto" height="350" src="https://www.youtube.com/embed/Siwlj-n1S6I?si=nFgeM6FI0OwAV2vQ&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                            </>
                        )}

                        <div className="form--item">
                            <span className='onboarding--actions'>
                                {onboardTabNum > 1 ? (
                                    <button className='onboard--prev' onClick={handlePrevTab}>Go Back</button>
                                ) : <p></p>}

                                <button className='onboard--next' type='submit' onClick={handleNextTab}>{onboardTabNum === 3 ? 'Finish' : 'Next Step'}</button>
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

