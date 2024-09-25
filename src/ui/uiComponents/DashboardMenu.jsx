import React, { useEffect, useState } from 'react';
import MenuLink from './MenuLink';
import Line from '../../components/Line';

import { AiOutlineBank, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { LuGlobe, LuLayoutPanelLeft, LuRotate3D, LuTags } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { MdChatBubble, MdOutlineChatBubbleOutline, MdOutlineDarkMode, MdOutlineDashboard, MdOutlineDeliveryDining, MdOutlineHelp, MdOutlineHelpOutline, MdOutlineSettings, MdOutlineShoppingBag, MdOutlineSsidChart, MdOutlineStorefront, MdOutlineWebhook } from 'react-icons/md';
import { BiCustomize, BiLineChart } from 'react-icons/bi';
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2';
import { useDataContext } from '../../context/DataContext';
import { RiBankLine, RiCloseFill, RiCoupon3Line } from 'react-icons/ri';
import { useWindowSize } from 'react-use';
import Overlay from '../../components/Overlay';
import MenuButton from './MenuButton';
import { openWidget } from '../../utils/helper';


function DashboardMenu() {
    const [showRemains, setShowRemains] = useState(false);
    const { isMenuCollapsed, showSidemenu, handleShowSidemenu, animateOut } = useDataContext();
    const { width } = useWindowSize()

    function handleShowRemains() {
        setShowRemains(!showRemains)
    }
    

    return (
        <>
            {width > 900 && (
                <div className='dashboard--menu'>
                    <div className='menu--block'>
                        {!isMenuCollapsed && (
                            <span className='block--heading'>
                                <p className='heading--text'>Main Access</p>
                            </span>
                        )}
                        <ul className='menu--list'>
                            <MenuLink icon={<LuLayoutPanelLeft />} title='Dashboard' link='/' />
                            <MenuLink icon={<MdOutlineShoppingBag />} title='Orders' link='/orders' />
                            <MenuLink icon={<LuTags />} title='Products' link='/products' />
                            <MenuLink icon={<BiLineChart />} title='Analytics' link='/analytics' />
                            <MenuLink icon={<RiCoupon3Line />} title='Run sales / coupon' link='/run-sales' />
                            <MenuLink icon={<FiUsers />} title='Customers' link='/customers' />
                            <MenuLink icon={<LuRotate3D />} title='Transactions' link='/transactions' />
                            <MenuLink icon={<MdOutlineWebhook />} title='Connected platforms' link='/connected-apps' />
                        </ul>
                    </div>

                    <div className='menu--block'>
                        <Line where={'Bottom'} value={'0.34rem'} />

                        {!isMenuCollapsed ? (
                            <span className='block--heading' onClick={handleShowRemains}>
                                <p className='heading--text' style={{ cursor: 'pointer' }}>Store Settings</p>
                                <div className='heading--icon'>
                                    {showRemains ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                </div>
                            </span>
                        ) : (
                            <div className='heading--icon' onClick={handleShowRemains}>
                                {showRemains ? <AiOutlineMinus /> : <AiOutlinePlus />}
                            </div>
                        )}

                        {showRemains && (
                            <ul className='menu--list'>
                                <MenuLink icon={<MdOutlineStorefront />} title='Store Information' link='/store-info' />
                                <MenuLink icon={<RiBankLine />} title='Bank Details' link='/bank-details' />
                                <MenuLink icon={<MdOutlineDeliveryDining />} title='Delivery' link='/delivery' />
                                <MenuLink icon={<LuGlobe />} title='Custom Domain' link='/custom-domain' />
                                <MenuLink icon={<HiOutlineSquare3Stack3D />} title='Subscription' link='/subscription' />
                                <MenuLink icon={<BiCustomize />} title='Store Customization' link='/store-customization' />
                            </ul>
                        )}

                        <Line where={'Top'} value={'0.34rem'} />

                    </div>


                    <ul className={`menu--list ${!showRemains ? 'last--menu' : ''}`}>
                        <MenuLink icon={<MdOutlineChatBubbleOutline />} title='Community and Forums' link='/community-forums' />
                        <MenuLink icon={<MdOutlineSettings />} title='Settings' link='/settings' />
                        <MenuButton icon={<MdOutlineHelpOutline />} title='Help Center'action={openWidget} />
                        {/* <MenuButton icon={<MdOutlineDarkMode />} title='Dark Mode' /> */}
                    </ul>
                </div>
            )}

            {(width < 900 && showSidemenu) && (
                <>
                    <Overlay handleClose={handleShowSidemenu} />
                    <div className={`dashboard--sidemenu ${animateOut ? 'animate-out' : ''}`}>

                        <div className='menu--block'>
                            <span className='hamburger--icon' onClick={handleShowSidemenu}>
                                <RiCloseFill />
                            </span>

                            {(width < 600) && (
                                <>
                                    <a href="https://www.luxeware.quicka.shop" target='_blank' className='store--btn'>
                                        View Store <MdOutlineStorefront />
                                    </a>

                                    <Line where={'Bottom'} value={'1.6rem'} />
                                </>
                            )}

                            <span className='block--heading'>
                                <p className='heading--text'>Main Access</p>
                            </span>
                            <ul className='menu--list'>
                                <MenuLink icon={<LuLayoutPanelLeft />} title='Dashboard' link='/' />
                                <MenuLink icon={<MdOutlineShoppingBag />} title='Orders' link='/orders' />
                                <MenuLink icon={<LuTags />} title='Products' link='/products' />
                                <MenuLink icon={<BiLineChart />} title='Analytics' link='/analytics' />
                                <MenuLink icon={<RiCoupon3Line />} title='Run sales / coupon' link='/run-sales' />
                                <MenuLink icon={<FiUsers />} title='Customers' link='/customers' />
                                <MenuLink icon={<LuRotate3D />} title='Transactions' link='/transactions' />
                                <MenuLink icon={<MdOutlineWebhook />} title='Connected platforms' link='/connected-apps' />
                            </ul>
                        </div>

                        <div className='menu--block'>
                            <Line where={'Bottom'} value={'0.34rem'} />

                            <span className='block--heading' onClick={handleShowRemains}>
                                <p className='heading--text' style={{ cursor: 'pointer' }}>Store Settings</p>
                                <div className='heading--icon'>
                                    {showRemains ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                </div>
                            </span>

                            {showRemains && (
                                <ul className='menu--list'>
                                    <MenuLink icon={<MdOutlineStorefront />} title='Store Information' link='/store-info' />
                                    <MenuLink icon={<RiBankLine />} title='Bank Details' link='/bank-details' />
                                    <MenuLink icon={<MdOutlineDeliveryDining />} title='Delivery' link='/delivery' />
                                    <MenuLink icon={<LuGlobe />} title='Custom Domain' link='/custom-domain' />
                                    <MenuLink icon={<HiOutlineSquare3Stack3D />} title='Subscription' link='/subscription' />
                                    <MenuLink icon={<BiCustomize />} title='Site Customization' link='/store-customization' />
                                </ul>
                            )}

                            <Line where={'Top'} value={'0.34rem'} />

                        </div>

                        <ul className={`menu--list ${!showRemains ? 'last--menu' : ''}`}>
                            <MenuLink icon={<MdOutlineChatBubbleOutline />} title='Community and Forums' link='/community-forums' />
                            <MenuLink icon={<MdOutlineSettings />} title='Settings' link='/settings' />
                        </ul>
                    </div>
                </>
            )}

        </>
    )
}

export default DashboardMenu