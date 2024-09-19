import React from 'react'
import DashboardHead from './uiComponents/DashboardHead'
import DashboardMenu from './uiComponents/DashboardMenu'

function DashboardBase({ children }) {

  return (
    <React.Fragment>
        <DashboardHead />

        <section>
            <DashboardMenu />
            
            <section>
                {children}
            </section>
        </section>
    </React.Fragment>
  )
}

export default DashboardBase