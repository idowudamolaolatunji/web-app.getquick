import React from 'react'
import { useWindowSize } from 'react-use';
import { useAuthContext } from '../../context/AuthContext';

import Line from '../../components/Line';
import HomeTop from './homeComponents/HomeTop';
import GetStarted from './homeComponents/GetStarted';
import HomeProgressGrid from './homeComponents/HomeProgressGrid';
import HomeLayoutGrid from './homeComponents/HomeLayoutGrid';
import './style.css';


function index() {
    const { width } = useWindowSize();
    const { user } = useAuthContext();

    const { isStoreSetupStep1, isStoreSetupStep2 } = user;
    const userStoreSetup = (isStoreSetupStep1 && isStoreSetupStep2);

    return (
        <section className='home--section'>
            <HomeTop />

            {userStoreSetup ? (
                <>
                    <Line border={1.4} />
                    {width > 500 && <HomeProgressGrid />}
                    <HomeLayoutGrid />
                </>
            ) : (
                <>
                    <Line border={1.4} />
                    <GetStarted />
                </>
            )}
        </section>
    )
}

export default index;