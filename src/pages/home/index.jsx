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
    const { isNewCustomer, setIsNewCustomer } = useAuthContext();

    return (

        // <>
        // <button onClick={() => setIsNewCustomer(!isNewCustomer)}>Show { isNewCustomer ? 'Old' : 'new'}</button>
        
        <section className='home--section'>
            <HomeTop />


            {isNewCustomer ? (
                <>
                    <Line border={1.4} where={"Top"} value={"-1.4rem"} />
                    <GetStarted />
                </>
            ) : (
                <>
                    {width > 500 && (
                        <HomeProgressGrid />
                    )}
        
                    {width < 500 && <Line border={1.4} />}
        
                    <HomeLayoutGrid />
                </>
            )}
        </section>

        // </>
    )
}

export default index;