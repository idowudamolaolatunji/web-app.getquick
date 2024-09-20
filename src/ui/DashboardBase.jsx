import React, { Fragment } from 'react'
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';
import './dashboard.css';


function DashboardBase({ children }) {

    return (
        <Fragment>
            <DashboardHead />

            <section className='dashboard--base'>
                <DashboardMenu />

                <section>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}

export default DashboardBase