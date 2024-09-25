import React from 'react'
import TopSalesChannelsChart from './TopSalesChannelsChart'

function TopSalesChannels() {
    return (
        <div className='card'>
            <div className="section--heading">
                <h2>Top five sales channels</h2>
            </div>

            <TopSalesChannelsChart />
        </div>
    )
}

export default TopSalesChannels