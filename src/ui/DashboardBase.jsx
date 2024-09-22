import React, { Fragment, useState } from 'react'
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';
import './dashboard.css';
import { useDataContext } from '../context/DataContext';

import { useWindowSize } from 'react-use';

function DashboardBase({ children }) {
    const { isMenuCollapsed } = useDataContext();
    const { width } = useWindowSize();


    return (
        <Fragment>
            <DashboardHead />

            <section className={`dashboard--base ${(isMenuCollapsed && width > 900) ? 'collapsed' : ''}`}>
                <DashboardMenu />

                <section className='content--block'>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}

export default DashboardBase