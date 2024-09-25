import React from 'react'
import { FiUsers } from 'react-icons/fi'
import { LuMousePointerClick, LuTags } from 'react-icons/lu'
import { MdOutlineShoppingBag } from 'react-icons/md'
import Insight from './Insight'

function InsightCards() {
    return (
        <div className='insight--grid'>
            <Insight title='Website Visits' value={1200} icon={<LuMousePointerClick />} />
            <Insight title='Orders' value={236} icon={<MdOutlineShoppingBag />} />
            <Insight title='Products Sold' value={611} icon={<LuTags />} />
            <Insight title='Total Customer' value={829} icon={<FiUsers />} />
        </div>
    )
}

export default InsightCards