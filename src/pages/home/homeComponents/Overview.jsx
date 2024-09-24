import React from 'react'
import OverviewChart from './OverviewChart'
import { useWindowSize } from 'react-use'


function Overview() {


  return (
    <div className='card'>
      
      <span>
        <p>Business Overview</p>
      </span>

      <OverviewChart />
    </div>
  )
}

export default Overview