import React, { Fragment, useState } from 'react'
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';
import './dashboard.css';
import { useDataContext } from '../context/DataContext';


function DashboardBase({ children }) {
    const { isMenuClosed } = useDataContext();
    console.log(isMenuClosed)

    return (
        <Fragment>
            <DashboardHead />

            <section className='dashboard--base' style={isMenuClosed ? { gridTemplateColumns: '8rem 1fr' } : { gridTemplateColumns: '24rem 1fr' }}>
                <DashboardMenu />

                <section className='content--block'>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}

export default DashboardBase