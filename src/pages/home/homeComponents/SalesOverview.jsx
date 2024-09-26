import React from 'react'
import SalesOverviewChart from './SalesOverviewChart'
import SelectAutoWidthDropdown from '../../../components/SelectAutoWidthDropdown'


const datePeriods = [
    { title: 'This Year', value: 'this-year' },
    { title: 'Last Year', value: 'last-year' },
]

function SalesOverview() {

    return (
        <div className='card sales-section'>
            <span className='section--top'>
                <div className="section--heading">
                    <h2>Your Business Yearly Sales Perfomance</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, possimus.</p>
                </div>
                <SelectAutoWidthDropdown menus={datePeriods} />
            </span>

            <SalesOverviewChart />
        </div>
    )
}

export default SalesOverview