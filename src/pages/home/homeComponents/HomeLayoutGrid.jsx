import React from 'react'
import SalesOverview from './SalesOverview'
import RecentOrders from './RecentOrders'
import QuickActions from './QuickActions';
import HomeInsightContainer from './HomeInsightContainer';
import TopSalesChannels from './TopSalesChannels'
import VisitorOverview from './VisitorOverview'
import TopProducts from './TopProducts'
import { useWindowSize } from 'react-use';
import { useDataContext } from '../../../context/DataContext';

function HomeLayoutGrid() {
    const { width } = useWindowSize();
    const { isMenuCollapsed } = useDataContext();

    console.log(width < 900 && width > 1000 )

    return (
        <div className="home--grid" style={ (!isMenuCollapsed && (width > 900 && width < 1000 )) ? { gridTemplateColumns: '1fr' } : { gridTemplateColumns: '4fr 1.8fr'} }>
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