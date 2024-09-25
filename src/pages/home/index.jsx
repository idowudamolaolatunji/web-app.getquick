import React from 'react'
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import Line from '../../components/Line';
import InsightCards from './homeComponents/InsightCards';
import HomeRightSide from './homeComponents/HomeRightSide';
import HomeLeftSide from './homeComponents/HomeLeftSide';
import ProgressGrid from './homeComponents/ProgressGrid';
import SelectAutoWidthDropdown from '../../components/SelectAutoWidthDropdown';
import { getGreeting, todayDate } from '../../utils/helper';

import { TiStarburstOutline } from 'react-icons/ti';
import '../style.css';


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
                    <div className='top--upgrade'>
                        <p className='upgrade--text'>You're on a Free plan</p>
                        <Link to={'/dashboard/subscription'} className='upgrade--link'><TiStarburstOutline />Upgrade</Link>
                    </div>
                )}
            </div>


            {width > 500 && (
                <ProgressGrid />
            )}


            {width < 500 && <Line border={1.4} />}


            {/* MAIN INSIGHT LAYOUT */}
            <div className='insights--container'>
                <div className={`container--box ${width > 500 ? 'card' : ''}`}>
                    <div className="top">
                        <div className="section--heading">
                            <h2>Brief Overview</h2>
                            <p>This is what your business is up to today!</p>
                        </div>

                        <SelectAutoWidthDropdown menus={datePeriods} />
                    </div>

                    {/* THE CARDS THEMSELVES */}
                    <InsightCards />
                    {width <= 500 && (
                        <ProgressGrid />
                    )}
                </div>

                <div className='card'></div>
            </div>



            {/* HOME GRID LAYOUT */}
            <div className="home--grid">
                <div className="grid--left">
                    <HomeLeftSide />
                </div>

                <div className="grid--right">
                    <HomeRightSide />
                </div>
            </div>


        </section>
    )
}

export default index;