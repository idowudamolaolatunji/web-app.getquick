import React from 'react'
import OverviewChart from './OverviewChart'
import SelectAutoWidthDropdown from '../../../components/SelectAutoWidthDropdown'


const datePeriods = [
    { title: 'This Year', value: 'this-year' },
    { title: 'Last Year', value: 'last-year' },
]

function Overview() {


    return (
        <div className='card'>
            <span className='top'>
                <div className="section--heading">
                    <h2>Your Business Yearly Sales Perfomance</h2>
                </div>
                <SelectAutoWidthDropdown menus={datePeriods} />
            </span>

            <OverviewChart />
        </div>
    )
}

export default Overview