import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { MdOutlineDeliveryDining, MdOutlineShoppingBag, MdOutlineStorefront } from 'react-icons/md';
import { RiBankLine } from 'react-icons/ri';
import TooltipUI from '../../../components/TooltipUI';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { TbTruckDelivery } from 'react-icons/tb';
import Spinner from '../../../components/spinner/spinner_two'

function GetStarted() {
    const navigate = useNavigate();
    const { store } = useAuthContext();
    const [loading, setLoading] = useState({
        mainLoading: false,
        miniLoading: false
    });
    const [isCompletedSteps, setIsCompletedSteps] = useState(localStorage.getItem("q_step_progr") ? JSON.parse(localStorage.getItem("q_step_progr")) : [
        { name: 'Onboard', tipText: 'Store and Dashboard Created!', completed: true }, // This fisrt on is default
        { name: 'hasCustomisedStore', tipText: 'Store Customized!', text: 'Customize your online store.', completed: false, shortText: 'Customize Store' },
        { name: 'hasFirstProduct', tipText: 'First Product Added!', text: 'Add your first product', completed: false, shortText: 'First Product' },
        { name: 'hasShippingRates', tipText: 'Delivery Rates Added!', text: 'Add your delivery rates to your website', completed: false, shortText: 'Delivery Rates' },
        { name: 'hasBankDetails', tipText: 'Bank Details Updated!', text: 'Add bank details for payments', completed: false, shortText: 'Bank Details' }
    ]);

    const completedSteps = isCompletedSteps.filter(step => step.completed);
    const stepsSorted = isCompletedSteps.sort((a, b) => b.completed - a.completed);
    function handleFindStep(name) {
        return isCompletedSteps.find(step => (step.name === name && step.completed === true))
    }

    function CompletedTag() {
        return <>Completed <IoCheckmarkDone /></>
    }

    function updateState(name, completed) {
        setIsCompletedSteps(prevState =>
            prevState.map(step =>
                step.name === name ? { ...step, completed } : step
            )
        );
    };

    const handleLoading = function (key, value) {
        setLoading({
            ...loading, [key]: value,
        });
    }

    useEffect(function() {
        document.title = 'Final onboarding steps!!'
    }, []);

    useEffect(function() {
        localStorage.setItem("q_step_progr", JSON.stringify(isCompletedSteps));
    }, [isCompletedSteps]);

    useEffect(function() {
        handleLoading("mainLoading", true);

        const {
            hasShippingRates,
            hasBankDetails,
            hasFirstProduct,
            hasCustomisedStore
        } = store.storeOnboard;

        updateState("hasShippingRates", hasShippingRates);
        updateState("hasBankDetails", hasBankDetails);
        updateState("hasFirstProduct", hasFirstProduct);
        updateState("hasCustomisedStore", hasCustomisedStore);

        setTimeout(function() {
            handleLoading("mainLoading", false);
        }, 500);
    }, []);

    return (

        <>
            { loading.mainLoading && <Spinner /> }
        <div className="get-started">
            <h2 className='get-started-title'>Let get you started selling</h2>
            <p className='get-started-subtitle'>Finalize your setup to make your website visible to the world.</p>
            <span className='get-started-nums'>
                <p>{completedSteps.length} / 5 completed - <strong>Next Step 👉🏿</strong> {stepsSorted[completedSteps.length + 1]?.shortText}</p>

                <div className="get-started-tabs">
                    {stepsSorted.map((step, i) => (
                        (step.completed ? (
                            <TooltipUI title={step.tipText} key={i} placement='bottom'>
                                <span className='is-completed' />
                            </TooltipUI>
                        ) : (
                            <span key={i} />
                        )
                        )))}
                </div>
            </span>

            <div className="get-started-opts">
                <div className={`opts--items ${handleFindStep("Store") ? 'is-completed' : ''}`}>
                    <div className="opts--heading">
                        <span className='opts--icon'><MdOutlineStorefront /></span>
                        <h3>Customize your online store.</h3>
                    </div>
                    <p>Select a theme, upload your logo, choose colors, and add images to customize your website.</p>
                    <button onClick={() => navigate('/dashboard/store-info')}>{handleFindStep("Store") ? <CompletedTag /> : 'Customize store'}</button>
                </div>

                <div className={`opts--items ${handleFindStep("hasFirstProduct") ? 'is-completed' : ''}`}>
                    <div className="opts--heading">
                        <span className='opts--icon'><MdOutlineShoppingBag /></span>
                        <h3>Add your first product.</h3>
                    </div>
                    <p>Write a description, add photos, and set pricing for the products you plan to sell, you can always add more later from the sidebar.</p>

                    {handleFindStep("Product") ? (
                        <button><CompletedTag /></button>
                    ) : (
                        <div className="opts--btns">
                            <button onClick={() => navigate('/dashboard/products/add')}>Add product</button>
                            <div onClick={() => navigate('/dashboard/products/import/add')}>Import product</div>
                        </div>
                    )}
                </div>

                <div className={`opts--items ${handleFindStep("hasShippingRates") ? 'is-completed' : ''}`}>
                    <div className="opts--heading">
                        <span className='opts--icon'><TbTruckDelivery /></span>
                        <h3>Add your delivery rates to your website.</h3>
                    </div>
                    <p>Set up delivery areas and how much you charge so your customers can see their shipping costs at checkout.</p>
                    <button onClick={() => navigate('/dashboard/delivery')}>{handleFindStep("Delivery") ? <CompletedTag /> : ' Add delivery rates'}</button>
                </div>

                <div className={`opts--items ${handleFindStep("hasBankDetails") ? 'is-completed' : ''}`}>
                    <div className="opts--heading">
                        <span className='opts--icon'><RiBankLine /></span>
                        <h3>Add bank details for payments.</h3>
                    </div>
                    <p>Bank details is needed to allow you start collecting payment when you make sales through your website.</p>
                    <button onClick={() => navigate('/dashboard/bank-details')}>{handleFindStep("Payment") ? <CompletedTag /> : 'Set up payment'}</button>
                </div>
            </div>


            <button className={`get-started-btn ${completedSteps.length < 5 ? 'disabled' : ''}`} disabled>Finish!</button>
        </div>
        </>
    )
}

export default GetStarted