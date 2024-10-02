import React from 'react'
import TopSalesChannelsChart from './TopSalesChannelsChart'


const sales = false;


function TopSalesChannels() {
    return (
        <div className='card sales-channel-section'>

            <div className="section--top">
                <div className="section--heading">
                    <h2>Top five sales channels</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            {sales ? (
                <TopSalesChannelsChart />
            ) : (
                
                <div className="no--channel">
                    <button>Record new sales</button>
                    <p className="">There's no sales data yet!</p>
                </div>
            )}
        </div>
    )
}

export default TopSalesChannels