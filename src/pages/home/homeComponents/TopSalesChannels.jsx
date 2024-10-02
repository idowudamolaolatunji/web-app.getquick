import React, { useState } from 'react'
import TopSalesChannelsChart from './TopSalesChannelsChart'
import { useNavigate } from 'react-router-dom';




function TopSalesChannels() {
    const navigate = useNavigate();
    const [salesChannels, setSalesChannels] = useState(false);

    return (
        <div className='card sales-channel-section'>
            <div className="section--top">
                <div className="section--heading">
                    <h2>Top five sales channels</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            {salesChannels ? (
                <TopSalesChannelsChart />
            ) : (
                <div className="no--channel">
                    <button onClick={() => navigate('/dashboard/order/add')}>Record new sales</button>
                    <p className="">There's no sales data yet!</p>
                </div>
            )}
        </div>
    )
}

export default TopSalesChannels