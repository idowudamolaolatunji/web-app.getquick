import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getExpression, getGreeting, todayDate } from '../../../utils/helper';
import { TiStarburstOutline } from 'react-icons/ti';
import { useWindowSize } from 'react-use';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { useAuthContext } from '../../../context/AuthContext';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { LuCheckCircle } from 'react-icons/lu';


function HomeTop() {
    const { user, store } = useAuthContext();
    const { width } = useWindowSize();
    const navigate = useNavigate();

    const [showSub, setShowSub] = useState(true);

    ///////////////////////////////////////////////////////
    const dateCreated = new Date(user.createdAt).getTime();
    const todaysDate = Date.now();
    const oneDayAgo = todaysDate - (24 * 60 * 60 * 1000) / 2;
    ///////////////////////////////////////////////////////

    return (

        <>

            {(!store.isPremium && showSub) && (
                <div className='home--sub'>
                    <div className="sub--mini">
                        <p className='sub--text'>Select a plan and get your first year for 75% discount</p>
                        <RiDiscountPercentFill style={{ fontSize: '2.4rem' }} />
                    </div>

                    <div className="sub--mini" style={{ gap: '2rem' }}>
                        <button onClick={() => navigate('/dashboard/subscription')}className='sub--btn'>Select a plan</button>
                        <AiOutlineClose style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setShowSub(false)} /> 
                    </div>
                </div>
            )}


            <div className='home--top'>
                <div className='top--heading'>
                    {(dateCreated > oneDayAgo) ? (
                        <p className='heading--name'>Welcome Back, {user.firstname}! 👋🏿</p>
                    ) : (
                        <p className='heading--name'>{getGreeting()},{" "}{user.firstname}! {getExpression()}</p>
                    )}
                    <p className='heading--date'>{todayDate()}.</p>
                </div>


                
                {(width > 650 && !store.isPremium && !showSub) && (
                    <div className='top--upgrade'>
                        <p className='upgrade--text'>You're on a free plan</p>
                        <Link to='/dashboard/subscription' className='upgrade--link'><LuCheckCircle />Upgrade</Link>
                    </div>
                )}

                {(width <= 650 && !store.isPremium && !showSub) && (
                    <p className='upgrade--link' onClick={() => navigate('/dashboard/subscription')}><LuCheckCircle />You're on a free plan</p>
                )}
            </div>
        </>
    )
}

export default HomeTop