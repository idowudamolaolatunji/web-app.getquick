import React from 'react'
import MenuLink from './MenuLink'
import { AiOutlineBank, AiOutlinePlus } from 'react-icons/ai'
import { LuGlobe, LuPartyPopper, LuTags } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi'
import { MdOutlineDashboard, MdOutlineDeliveryDining, MdOutlineShoppingBag, MdOutlineSsidChart, MdOutlineStorefront, MdOutlineWebhook } from 'react-icons/md'
import { GrTransaction } from 'react-icons/gr'
import { BiCustomize } from 'react-icons/bi'
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2'


function DashboardMenu() {

  return (
    <div className='dashboard--menu'>
        <div className='menu--list'>
            <p>Main Menu</p>
            <ul className='dashboard--list'>
                <MenuLink icon={<MdOutlineDashboard />} title='Dashboard' link='/' />
                <MenuLink icon={<MdOutlineShoppingBag />} title='Orders' link='/orders' />
                <MenuLink icon={<LuTags />} title='Products' link='/products' />
                <MenuLink icon={<MdOutlineSsidChart />} title='Analytics' link='/analytics' />
                <MenuLink icon={<LuPartyPopper />} title='Run Sales / coupon' link='/discounts' />
                <MenuLink icon={<FiUsers />} title='Customers' link='/customers' />
                <MenuLink icon={<GrTransaction />} title='Transactions' link='/transactions' />
                <MenuLink icon={<MdOutlineWebhook />} title='Connected apps' link='/connected' />
            </ul>
        </div>

        <div className='menu--list'>
            <span>
                <p>Store</p>
                <AiOutlinePlus />
            </span>

            <ul className='dashboard--list'>
                <MenuLink icon={<MdOutlineStorefront />} title='Store Info' link='/' />
                <MenuLink icon={<AiOutlineBank />} title='Bank Details' link='/' />
                <MenuLink icon={<MdOutlineDeliveryDining />} title='Shipping' link='/' />
                <MenuLink icon={<LuGlobe />} title='Domain' link='/' />
                <MenuLink icon={<HiOutlineSquare3Stack3D/>} title='Subscription' link='/' />
                <MenuLink icon={<BiCustomize />} title='Site Customization' link='/' />
            </ul>
        </div>
    </div>
  )
}

export default DashboardMenu