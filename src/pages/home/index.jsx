import React from 'react'
import { getGreeting, todayDate } from '../../utils/helper';

import '../style.css';
import { Link } from 'react-router-dom';
import { TiStarburstOutline } from 'react-icons/ti';
import Overview from './homeComponents/Overview';
import RecentOrders from './homeComponents/RecentOrders';
import TopSales from './homeComponents/TopSales';
import { useWindowSize } from 'react-use';

const name = 'Idowu';


function index() {
    
    const { width } = useWindowSize();


    return (
        <section className='home--section'>
            <div className='home--top'>
                <div className='top--heading'>
                    {/* <p className='heading--name'>Welcome back, {name}</p> */}
                    <p className='heading--name'>{getGreeting()}, {name}!</p>
                    <p className='heading--date'>{todayDate()}</p>
                </div>

                {(width > 700) && (
                    <div className='top--info'>
                        <p className='info--text'>You're on a Free plan</p>
                        <Link to={'/dashboard/subscription'} className='info--link'><TiStarburstOutline />Upgrade</Link>
                    </div>
                )}
            </div>

            <div className="home--grid">
                <div className="grid--left">
                    <Overview />
                    <RecentOrders />
                </div>

                <div className="grid--right">
                    <TopSales />
                </div>
            </div>


        </section>
    )
}

export default index;