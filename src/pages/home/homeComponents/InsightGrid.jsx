import React from 'react'
import { FiUsers } from 'react-icons/fi'
import { LuMousePointerClick, LuTags } from 'react-icons/lu'
import { MdOutlineShoppingBag } from 'react-icons/md'
import Insight from '../../../components/Insight'


function InsightGrid() {
    return (
        <div className='insight--grid'>
            <Insight title='Website Visits' value={0} icon={<LuMousePointerClick />} />
            <Insight title='Orders' value={0} icon={<MdOutlineShoppingBag />} link='/orders' />
            <Insight title='Products Sold' value={0} icon={<LuTags />} link='/products' />
            <Insight title='Customer' value={0} icon={<FiUsers />} link='/customers' />
        </div>
    )
}

export default InsightGrid