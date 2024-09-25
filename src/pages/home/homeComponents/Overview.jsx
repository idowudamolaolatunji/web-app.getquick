import React from 'react'
import OverviewChart from './OverviewChart'
import { useWindowSize } from 'react-use'


function Overview() {


  return (
    <div className='card'>
      
      <span>
        <p>Yearly Business Progress</p>
      </span>

      <OverviewChart />
    </div>
  )
}

export default Overview