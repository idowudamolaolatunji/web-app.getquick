import React from 'react'
import { FaStoreAltSlash } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import { PiPresentationChartBold } from 'react-icons/pi'
import HomeProgCard from './HomeProgCard'

function ProgressGrid() {
    return (
        <div className='prog--grid'>
            <HomeProgCard title='Total Sales' icon={<PiPresentationChartBold />} value={230500} percent={12} days={30} />
            <HomeProgCard title='Total Settlements' icon={<GiReceiveMoney />} value={100300} percent={7.1} days={7} />
            <HomeProgCard title='Offline Sales' icon={<FaStoreAltSlash />} value={45000} upTrend={false} percent={2.17} days={14} />
        </div>
    )
}

export default ProgressGrid