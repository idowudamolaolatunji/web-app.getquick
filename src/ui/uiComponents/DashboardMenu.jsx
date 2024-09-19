import React from 'react'
import { Link } from 'react-router-dom'

function DashboardMenu() {
  return (
    <figure>
        <h3>Access</h3>

        <ul>
            <li>
                <Link to={'/dashboard'}>Dashboard</Link>
            </li>
            <li>
                <Link to={'/dashboard/orders'}>Orders</Link>
            </li>
            <li>
                <Link to={'/dashboard/products'}>Products</Link>
            </li>
            <li>
                <Link to={'/dashboard/discounts'}>Run Sales / coupon</Link>
            </li>
            <li>
                <Link to={'/dashboard/customers'}>Customers</Link>
            </li>
            <li>
                <Link to={'/dashboard/transactions'}>Transactions</Link>
            </li>
            <li>
                <Link to={'/dashboard/connected'}>Connected apps</Link>
            </li>
        </ul>
        
    </figure>
  )
}

export default DashboardMenu