import React, { useState } from 'react'
import MenuLink from './MenuLink'
import { AiOutlineBank, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { LuGlobe, LuPartyPopper, LuRotate3D, LuTags } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi'
import { MdOutlineDashboard, MdOutlineDeliveryDining, MdOutlineShoppingBag, MdOutlineSsidChart, MdOutlineStorefront, MdOutlineWebhook } from 'react-icons/md'
import { BiCustomize, BiLineChart } from 'react-icons/bi'
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2'
import { useDataContext } from '../../context/DataContext'
import Line from '../../components/Line'
import { RiCoupon3Line } from 'react-icons/ri'


function DashboardMenu() {
    const [showRemains, setShowRemains] = useState(false);
    const { isMenuCollapsed } = useDataContext();

    function handleShowRemains() {
        setShowRemains(!showRemains)
    }

  return (
    <div className={`dashboard--menu ${isMenuCollapsed ? 'collapsed' : ''}`}>
        <div className='menu--list'>
            {!isMenuCollapsed && (
                <span className='menu--list-item'>
                    <p>Main Access</p>
                </span>
            )}
            <ul className='dashboard--list'>
                <MenuLink icon={<MdOutlineDashboard />} title='Dashboard' link='/' />
                <MenuLink icon={<MdOutlineShoppingBag />} title='Orders' link='/orders' />
                <MenuLink icon={<LuTags />} title='Products' link='/products' />
                <MenuLink icon={<BiLineChart  />} title='Analytics' link='/analytics' />
                <MenuLink icon={<RiCoupon3Line />} title='Run Sales & coupon' link='/discounts' />
                <MenuLink icon={<FiUsers />} title='Customers' link='/customers' />
                <MenuLink icon={<LuRotate3D />} title='Transactions' link='/transactions' />
                <MenuLink icon={<MdOutlineWebhook />} title='Connected apps' link='/connected' />
            </ul>
        </div>

        <div className='menu--list'>
            <Line where={'Bottom'} value={'0.5rem'} />
            {!isMenuCollapsed ? (
                <span className='menu--list-item'>
                    <p>Store Settings</p>
                    <div className='menu--icon-box' onClick={handleShowRemains}>
                        {showRemains ? (
                            <AiOutlineMinus className='menu--icon' />
                        ) : (
                            <AiOutlinePlus className='menu--icon' />
                        )}
                    </div>
                </span>
            ) : (
                <div className='menu--icon-box' data-text={'Store Settings'} onClick={handleShowRemains}>
                    {showRemains ? (
                        <AiOutlineMinus className='menu--icon' />
                    ) : (
                        <AiOutlinePlus className='menu--icon' />
                    )}
                </div>
            )}

            {showRemains && (
                <ul className='dashboard--list'>
                    <MenuLink icon={<MdOutlineStorefront />} title='Store Information' link='/' />
                    <MenuLink icon={<AiOutlineBank />} title='Bank Details' link='/' />
                    <MenuLink icon={<MdOutlineDeliveryDining />} title='Shipping & Delivery' link='/' />
                    <MenuLink icon={<LuGlobe />} title='Custom Domain' link='/' />
                    <MenuLink icon={<HiOutlineSquare3Stack3D/>} title='Subscription' link='/' />
                    <MenuLink icon={<BiCustomize />} title='Site Customization' link='/' />
                </ul>
            )}

            <Line where={'Top'} value={'0.5rem'} />

        </div>
    </div>
  )
}

export default DashboardMenu