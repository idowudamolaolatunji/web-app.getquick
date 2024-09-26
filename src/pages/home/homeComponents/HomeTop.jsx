import React from 'react';
import { Link } from 'react-router-dom';
import { getExpression, getGreeting, todayDate } from '../../../utils/helper';
import { TiStarburstOutline } from 'react-icons/ti';
import { useWindowSize } from 'react-use';
import { MdOutlineWorkspacePremium } from 'react-icons/md';


const user = {
    firstname: 'Idowu',
    storeUrl: 'https://luxeware.quicka.store',
};

function HomeTop() {
    const { width } = useWindowSize();
    
    return (
        <div className='home--top'>
            <div className='top--heading'>
                <p className='heading--name'>{getGreeting()},{" "}{user.firstname}! {getExpression()}</p>
                <p className='heading--date'>{todayDate()}.</p>
            </div>

            {(width > 700) && (
                <div className='top--upgrade'>
                    <p className='upgrade--text'>You're on a Free plan</p>
                    <Link to={'/dashboard/subscription'} className='upgrade--link'><MdOutlineWorkspacePremium />Upgrade</Link>
                </div>
            )}
        </div>
    )
}

export default HomeTop