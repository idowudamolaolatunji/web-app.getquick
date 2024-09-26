import React from 'react'
import HomeProgressGrid from './HomeProgressGrid';
import SelectAutoWidthDropdown from '../../../components/SelectAutoWidthDropdown';
import InsightGrid from './InsightGrid';
import { useWindowSize } from 'react-use';

const datePeriods = [
    { value: 'today', title: 'Today' },
    { value: 'this-week', title: 'This Week' },
    { value: 'this-month', title: 'This Month' },
    { value: 'this-year', title: 'This Year' },
]

function HomeInsightContainer() {
    const { width } = useWindowSize();

    return (
        <div className={`insight--container ${width > 500 ? 'card' : ''}`}>
            <div className="section--top">
                <div className="section--heading">
                    <h2>Brief Overview</h2>
                    <p>This is what your business is up to today!</p>
                </div>

                <SelectAutoWidthDropdown menus={datePeriods} />
            </div>

            {/* THE CARDS THEMSELVES */}
            <InsightGrid />

            {width <= 500 && <HomeProgressGrid />}
        </div>
    )
}

export default HomeInsightContainer