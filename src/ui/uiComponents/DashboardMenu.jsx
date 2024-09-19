import React from 'react'
import { Link } from 'react-router-dom'

function DashboardMenu() {
  return (
    <figure>
        <h3>Access</h3>

        <ul>
            <li>
                <a href={'/dashboard'}>Dashboard</a>
            </li>
            <li>
                <a href={'/dashboard/orders'}>Orders</a>
            </li>
            <li>
                <a href={'/dashboard/products'}>Products</a>
            </li>
            <li>
                <a href={'/dashboard/discounts'}>Run Sales / coupon</a>
            </li>
            <li>
                <a href={'/dashboard/customers'}>Customers</a>
            </li>
            <li>
                <a href={'/dashboard/transactions'}>Transactions</a>
            </li>
            <li>
                <a href={'/dashboard/connected'}>Connected apps</a>
            </li>
        </ul>
        
    </figure>
  )
}

export default DashboardMenu