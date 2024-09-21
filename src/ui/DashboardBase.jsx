import React, { Fragment, useState } from 'react'
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';
import './dashboard.css';


function DashboardBase({ children }) {

    return (
        <Fragment>
            <DashboardHead />

            <section className='dashboard--base'>
                <DashboardMenu />

                <section className='content--block'>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}

export default DashboardBase