import React from 'react'
import OverviewChart from './OverviewChart'
import { useWindowSize } from 'react-use'


function Overview() {


    return (
        <div className='card'>
            <span className='top'>
                <p>Yearly Business Progress</p>
                <select>
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </span>

            <OverviewChart />
        </div>
    )
}

export default Overview