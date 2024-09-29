import React from 'react'
import { useWindowSize } from 'react-use';

import Line from '../../components/Line';
import HomeTop from './homeComponents/HomeTop';
import HomeProgressGrid from './homeComponents/HomeProgressGrid';
import HomeLayoutGrid from './homeComponents/HomeLayoutGrid';
import '../style.css';


function index() {
    const { width } = useWindowSize();

    return (
        <section className='home--section'>
            <HomeTop />

            {width > 500 && (
                <HomeProgressGrid />
            )}

            {width < 500 && <Line border={1.4} />}


            {/* HOME GRID LAYOUT */}
            <HomeLayoutGrid />

        </section>
    )
}

export default index;