import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner/simple'
import ConfettiUI from '../components/ConfettiUI';
import { GiPartyPopper } from 'react-icons/gi';

function NextCongratsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [nextData, setNextData] = useState({
        title: "",
        text: "",
        link: "",
        buttonText: ""
    });

    const navigate = useNavigate();
    const { search } = useLocation();

    function handleClick() {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigate(nextData.link);
            localStorage.removeItem(`${import.meta.env.VITE_CONGRATS_KEY}`);
        }, 1500);
    }


    useEffect(function() {
        const userId = localStorage.getItem("q_user_id");
        const accessKey = localStorage.getItem(`${import.meta.env.VITE_CONGRATS_KEY}`);

        if(!userId && !accessKey) navigate(-1);
    }, []);


    useEffect(function() {
        if(search.includes("?next=onboarding")) setNextData({
            link: "/onboarding",
            title: "Congrats",
            text:`Your Quicka account is successfully created! Set up your store in the next page 👉🏿`,
            buttonText: "Continue"
        });
        if(search.includes("?next=dashboard")) setNextData({
            link: "/dashboard",
            title: "Congrats",
            text: "Your store dashboard and website is ready!",
            buttonText: "Go to Dashboard"
        });

        if(!search) navigate(-1)
    }, []);

    return (
        <>
            <ConfettiUI />

            <section className='congrats--section'>
                {nextData.title && (
                    <div className="congrats--container">
                        <GiPartyPopper style={{ fontSize: '7rem' }} />
                        <h4 className='congrats--title'>{nextData.title}</h4>
                        <p className='congrats--text'>{nextData.text}</p>
                        <button className='general--btn' onClick={handleClick}>{isLoading ? <Spinner /> : nextData.buttonText}</button>
                    </div>
                )}
            </section>
        </>
    )
}

export default NextCongratsScreen