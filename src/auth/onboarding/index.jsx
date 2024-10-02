import React, { useEffect, useState } from 'react'

import Line from '../../components/Line';
import Spinner from '../../components/spinner/spinner_two'
import TooltipUI from '../../components/TooltipUI';
import Asterisk from '../../components/Asterisk';
import CustomAlert from '../../components/CustomAlert';
import logo_demo from '../../assets/images/resources/logo-demo.png'

import { useNavigate } from 'react-router-dom';
import { validateOnboardForm } from '../../utils/helper';
import { useAuthContext } from '../../context/AuthContext';


const goalOptions = [
    { id: 'automate', label: 'Automate my sales and orders' },
    { id: 'detailed', label: 'Get well-detailed analytics' },
    { id: 'notification', label: 'Instant notification on new order' },
    { id: 'website', label: 'Create store website and run sales' },
    { id: 'customer', label: 'Record new customer for future sales' },
    { id: 'visitor', label: 'Track store visitor and purchases' },
    { id: 'sales', label: 'Record Daily sales and expenses' },
    { id: 'inventory', label: 'Manage inventory and track low stocks' },
];


function index() {
    const navigate = useNavigate();
    const { handleChange } = useAuthContext();
    const [storeCategories, setStoreCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [goalsChoosen, setGoalsChoosen] = useState([]);
    const [isCopied, setIsCopied] = useState(false);

    const [onboardingErrors, setOnboardingErrors] = useState({});
    const [response, setResponse] = useState({
        status: null,
        message: null
    });

    const [onboardingData, setOnboardingData] = useState({
        name: "",
        storeUrl: "",
        category: "",
        isCoperated: "no",
        type: "",
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
        } else if (name === "storeUrl") {
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
        if (onboardingData.storeUrl) {
            const url = onboardingData.storeUrl + ".quicka.store";

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

    // HNADLE GOING TO THE PREVIOUS FORM TAB
    function handlePrevTab() {
        if (onboardTabNum === 1) return;
        setOnboardTabNum(prev => prev - 1)
    }

    // HNADLE GOING TO THE NEXT FORM TAB
    function handleNextTab(e) {
        const isCoperated = onboardingData.isCoperated == "yes" ? true : false;
        if (onboardTabNum === 1) {
            // DO SOME VALIDATION AND IF ISCOPREATED IS YES, VALIDATE THE CONDITIONAL FIELD
            const newErrors = validateOnboardForm(onboardingData, isCoperated);
            console.log(newErrors)
            setOnboardingErrors(newErrors);

            if (Object.keys(newErrors).length >= 1) return;
        }
        if (onboardTabNum === 2) {
            if(goalsChoosen.length < 3) { 
                return setResponse({ status: "error", message: `Select ${goalsChoosen.length < 1 ? '' : `more than ${goalsChoosen.length}`} at least 3 goal options!` });
            } else {
                return handleOnboading();
            }
        };
        setOnboardTabNum(prev => prev + 1);
    }

    
    // HANDLE THE GOALS CHOOSEN
    function handleGoalsChoosen(goal) {
        const isGoalAlreadyIncluded = goalsChoosen.includes(goal);

        if (isGoalAlreadyIncluded) {
            setGoalsChoosen(goalsChoosen.filter((item) => item !== goal));
        } else {
            setGoalsChoosen([...goalsChoosen, goal]);
        }
    }


    const userId = localStorage.getItem('user_id');
    useEffect(function () {
        document.title = "Quicka | Store Onboarding 🏪";

        if(!userId) navigate(-1);
    }, []);
    
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [onboardTabNum]);


    useEffect(function() {
        handleResetResponse()
    }, [goalsChoosen]);

    useEffect(function() {
        if(onboardingData.isCoperated == "no") {
            setOnboardingData({ ...onboardingData, type: "" })
        }
    }, [onboardingData.isCoperated])

    // GET THE STORE CATEGORIES
    useEffect(function () {
        if (!storeCategories || storeCategories.length < 1) {
            getStoreCategories()
        }
    }, []);

    // SANITIZE THE NAME AS THE LINK, REPLACING SPACES WITH -
    useEffect(function () {
        const sanitizedUrl = onboardingData?.name?.replace(/\s+/g, '-').toLowerCase();
        setOnboardingData({ ...onboardingData, storeUrl: sanitizedUrl })
    }, [onboardingData?.name]);


    // ONLY WHEN WE RE-WRITE OUR LINK BEFORE WE CAN RECOPY IT
    useEffect(function () {
        // BAD PRACTICE
        handleResetResponse();
        setIsCopied(false);
    }, [onboardingData?.storeUrl]);


    // KEEP TRACK OF THE TAB NUMBER
    useEffect(function () {
        localStorage.setItem("tab_num", JSON.stringify(onboardTabNum));
    }, [onboardTabNum]);


    async function getStoreCategories() {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/stores/category`);
            const data = await res.json();
            setStoreCategories(data.data.categories);
        } catch (err) {
            console.log(err.message);
        }
    }


    async function handleOnboading() {
        // RESET THE RESPONSE STATE HERE
        handleResetResponse();

        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/users/onboarding-store/${userId}`
            , {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(onboardingData)
            });

            if(!res.ok) throw new Error('Something went wrong! Check intenet connection');

            const data = await res.json();
            if(data.status !== 'success') throw new Error(data.message);

            // SET THE ACCESS STORAGE FOR THE CONGRATS PAGE
            localStorage.setItem(`${import.meta.env.VITE_CONGRATS_KEY}`, "access");
            setResponse({ status: data.status, message: data.message });
            
            setTimeout(function () {
                handleChange(data.data.user, data.token);
                localStorage.removeItem("tab_num");
                navigate('/congratulations?next=dashboard');
            }, 1000);
        } catch (err) {
            setResponse({ status: "error", message: err.message });
        } finally {
            setIsLoading(true);
        }
    }


    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}
            
            { isLoading && <Spinner /> }

            <section className='onboarding--section'>
                <div className="onboarding--container">

                    <div className="onboarding--top">
                        <p className='onboarding--numbering'>{onboardTabNum}/2 👈🏿</p>
                        <p className='onboarding--subtitle'>
                            You are almost done
                            <picture style={{ marginTop: '-1rem' }}>
                                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.webp" type="image/webp" />
                                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif" alt="🎉" width="24" height="24" />
                            </picture>
                        </p>
                        <h2 className='form--heading' style={{ marginBottom: '1rem', lineHeight: '1.2' }}>
                            {onboardTabNum === 1 && "Let's setup your store and dashboard."}
                            {onboardTabNum === 2 && "Choose important goals you need Quicka to achieve."}
                        </h2>
                        <p className='auth--right-text'>
                            {onboardTabNum === 1 && "Tell us a bit about your business so that we can provide you a personalised experienced tailored to your business needs and prefenece."}
                            {onboardTabNum === 2 && `What are the important things you want to use Quicka for. We need this data to create a perfect experience for you.`}
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
                                    <label htmlFor="storeUrl" className="form--label">Store URL</label>
                                    <div className="form--input-box">
                                        <input type="text" id='storeUrl' className="form--input" placeholder='Store url' value={onboardingData.storeUrl} name='storeUrl' onChange={handleOnboardDataChange} />

                                        {(onboardingData.storeUrl && !isCopied) ? (
                                            <TooltipUI title="Copy URL" placement="top">
                                                <span className='url--box' onClick={handleCopyLink}>.quicka.store</span>
                                            </TooltipUI>
                                        ) : (
                                            <span className='url--box' onClick={handleCopyLink}>.quicka.store</span>
                                        )}
                                    </div>
                                    <span className="form--error-message">
                                        {onboardingErrors.storeUrl && onboardingErrors.storeUrl}
                                    </span>
                                </div>

                                <div className="form--item">
                                    <label htmlFor="type" className="form--label">Is your business incorporated with the Corporate Affairs Commission (CAC)?</label>

                                    <div className="form--clicks">
                                        <div className={
                                            `form--click ${onboardingData.isCoperated == "yes" ? 'is-selected' : ''}`}
                                            onClick={() => setOnboardingData({ ...onboardingData, isCoperated: "yes" })}
                                        >Yes <span></span></div>
                                        <div className={`
                                            form--click ${onboardingData.isCoperated == "no" ? 'is-selected' : ''}`}
                                            onClick={() => setOnboardingData({ ...onboardingData, isCoperated: "no" })}
                                        >No <span></span></div>
                                    </div>
                                </div>

                                {onboardingData.isCoperated == "yes" && (
                                    <div className="form--item">
                                        <label htmlFor="type" className="form--label">Business registration type <Asterisk /></label>

                                        <select className='form--select' name='type' id='type' onChange={handleOnboardDataChange} value={onboardingData.type}>
                                            <option hidden>Select type</option>
                                            <option value="limited-company">Limited Company</option>
                                            <option value="sole-propreitorship">Sole Proprietorship</option>
                                        </select>
                                        <span className="form--error-message">
                                            {onboardingErrors.type && onboardingErrors.type}
                                        </span>
                                    </div>

                                )}

                                <div className="form--item">
                                    <label htmlFor="category" className="form--label">What category best describes your business <Asterisk /></label>

                                    <select className='form--select' value={onboardingData.category} name='category' id='category' onChange={handleOnboardDataChange}>
                                        <option hidden>Pick a category / industry</option>
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
                                <div className="form--item">
                                    <p className="form--label" style={{ marginBottom: '1.2rem', opacity: '.65' }}>Choose all that apply: (At least 3)</p>
                                    <div className="form--click-opts">
                                        {goalOptions.map((goal) => (
                                            <div
                                                key={(goal.id)}
                                                className={`form--click ${goalsChoosen.includes((goal.id)) ? 'is-selected' : ''}`}
                                                onClick={() => handleGoalsChoosen((goal.id))}
                                            >
                                                <p>{goal.label}</p>
                                                <span></span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Line where="Top" value="3rem" border={1.4} />

                                <div className="form--item">
                                    <label className="form--label" style={{ fontSize: '1.8rem' }}>
                                        One more thing, Before you go..
                                        <picture>
                                            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp" type="image/webp" />
                                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif" alt="🥳" width="24" height="24" />
                                        </picture>
                                    </label>
                                    <p className='auth--right-text'>What plan has the features that suits your needs</p>
                                </div>
                            </>
                        )}


                        <div className="form--item">
                            <span className='onboarding--actions'>
                                {onboardTabNum > 1 ? (
                                    <button className='onboard--prev'
                                        onClick={handlePrevTab}>Go Back
                                    </button>
                                ) : <p></p>}

                                <button className='onboard--next'
                                    onClick={handleNextTab}>{onboardTabNum === 2 ? 'Finish' : 'Next Step'}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default index
