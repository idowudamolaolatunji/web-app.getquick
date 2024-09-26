import React from 'react'
import { GiPayMoney } from 'react-icons/gi'
import HomeProgressCard from './HomeProgressCard'
import { LuArchiveRestore } from 'react-icons/lu'
import { MdAddChart } from 'react-icons/md'

function ProgressGrid() {
    return (
        <div className='prog--grid'>
            <HomeProgressCard title='Total Sales' icon={<MdAddChart />} value={230500} percent={12} days={30} />
            <HomeProgressCard title='Total Settlements' icon={<GiPayMoney />} value={100300} percent={7.1} days={7} />
            <HomeProgressCard title='Offline Sales' icon={<LuArchiveRestore />} value={45000} upTrend={false} percent={2.17} days={14} />
        </div>
    )
}

export default ProgressGrid