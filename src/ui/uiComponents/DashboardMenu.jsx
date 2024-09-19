import React from 'react'
import MenuLink from './MenuLink'

function DashboardMenu() {
  return (
    <div>

        <div>
            <h3>Access</h3>
            <ul>
                <MenuLink icon={<></>} title='Dashboard' link='/' />
                <MenuLink icon={<></>} title='Orders' link='/orders' />
                <MenuLink icon={<></>} title='Products' link='/products' />
                <MenuLink icon={<></>} title='Run Sales / coupon' link='/discounts' />
                <MenuLink icon={<></>} title='Customers' link='/customers' />
                <MenuLink icon={<></>} title='Transactions' link='/transactions' />
                <MenuLink icon={<></>} title='Connected apps' link='/connected' />
            </ul>
        </div>


        
    </div>
  )
}

export default DashboardMenu