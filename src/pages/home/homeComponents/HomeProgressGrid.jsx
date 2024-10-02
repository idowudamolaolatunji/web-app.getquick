import React from 'react'
import { GiPayMoney } from 'react-icons/gi'
import HomeProgressCard from './HomeProgressCard'
import { LuArchiveRestore } from 'react-icons/lu'
import { MdAddChart } from 'react-icons/md'

function ProgressGrid() {
    return (
        <div className='prog--grid'>
            <HomeProgressCard title='Total Sales' icon={<MdAddChart />} value={0} percent={0} days={7} />
            <HomeProgressCard title='Total Settlements' icon={<GiPayMoney />} value={0} percent={0} days={7} />
            <HomeProgressCard title='Offline Sales' icon={<LuArchiveRestore />} value={0} upTrend={true} percent={0} days={7} />
        </div>
    )
}

export default ProgressGrid