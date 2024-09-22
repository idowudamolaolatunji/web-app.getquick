import React, { Fragment, useState } from 'react'
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';
import './dashboard.css';
import { useDataContext } from '../context/DataContext';


function DashboardBase({ children }) {

    const { isMenuCollapsed } = useDataContext();

    return (
        <Fragment>
            <DashboardHead />

            {/* <section className='dashboard--base' style={ isMenuCollapsed ? { gridTemplateColumns: "6rem 1fr"} : { gridTemplateColumns: "25rem 1fr"}}> */}
            <section className={`dashboard--base ${isMenuCollapsed ? 'collapsed' : ''}`}>
                <DashboardMenu />

                <section className='content--block'>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}

export default DashboardBase