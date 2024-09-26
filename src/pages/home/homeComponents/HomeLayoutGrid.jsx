import React from 'react'
import SalesOverview from './SalesOverview'
import RecentOrders from './RecentOrders'
import QuickActions from './QuickActions';
import HomeInsightContainer from './HomeInsightContainer';
import TopSalesChannels from './TopSalesChannels'
import VisitorOverview from './VisitorOverview'
import TopProducts from './TopProducts'

function HomeLayoutGrid() {
    return (
        <div className="home--grid">
            <div className="grid--left">
                <HomeInsightContainer />

                <SalesOverview />

                <RecentOrders />
            </div>

            <div className="grid--right">
                <QuickActions />
                <VisitorOverview />
                <TopProducts />
                <TopSalesChannels />
            </div>
        </div>
    )
}

export default HomeLayoutGrid