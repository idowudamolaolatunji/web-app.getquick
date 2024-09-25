import React from 'react'
import { getGreeting, todayDate } from '../../utils/helper';

import '../style.css';
import { Link } from 'react-router-dom';
import { TiStarburstOutline } from 'react-icons/ti';
import Overview from './homeComponents/Overview';
import RecentOrders from './homeComponents/RecentOrders';
import TopSales from './homeComponents/TopSales';
import { useWindowSize } from 'react-use';
import InsightCards from './homeComponents/InsightCards';
import Line from '../../components/Line';
import SelectAutoWidthDropdown from '../../components/SelectAutoWidthDropdown';

const name = 'Idowu';
const datePeriods = [
    { value: 'today', title: 'Today' },
    { value: 'this-week', title: 'This Week' },
    { value: 'this-month', title: 'This Month' },
    { value: 'this-year', title: 'This Year' },
]


function index() {
    const { width } = useWindowSize();

    return (
        <section className='home--section'>
            <div className='home--top'>
                <div className='top--heading'>
                    <p className='heading--name'>{getGreeting()}, {name}!</p>
                    <p className='heading--date'>{todayDate()}.</p>
                </div>

                {(width > 700) && (
                    <div className='top--info'>
                        <p className='info--text'>You're on a Free plan</p>
                        <Link to={'/dashboard/subscription'} className='info--link'><TiStarburstOutline />Upgrade</Link>
                    </div>
                )}
            </div>


            {width < 500 && <Line border={1.4} />}

            <div className='insights--container'>
                <div className={`container--box ${width > 500 ? 'card' : ''}`}>
                    <div className="top">
                        <div className="section--heading">
                            <h2>Brief Overview</h2>
                            <p>This is what your business is up to today!</p>
                        </div>

                        <SelectAutoWidthDropdown menus={datePeriods} />
                    </div>

                    <InsightCards />
                </div>

                <div className='card'></div>
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