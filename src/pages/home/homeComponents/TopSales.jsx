import React from 'react'
import SalesChart from './SalesChart'

function TopSales() {
  return (
    <div className='card'>
      <span>
        <p>Top Sales</p>
      </span>

      <SalesChart />
    </div>
  )
}

export default TopSales