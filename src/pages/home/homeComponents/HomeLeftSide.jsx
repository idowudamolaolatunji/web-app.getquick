import React from 'react'
import SalesOverview from './SalesOverview'
import RecentOrders from './RecentOrders'
import { useWindowSize } from 'react-use'
import QuickActions from './QuickActions';

function HomeLeftSide() {
    const { width } = useWindowSize();

    return (
        <>
            <SalesOverview />

            {width > 500 && <QuickActions />}

            <RecentOrders />
        </>
    )
}

export default HomeLeftSide