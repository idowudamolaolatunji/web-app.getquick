import React, { useState } from 'react'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import TableUI from '../../components/TableUI'
import { formatDate, formatNumber } from '../../utils/helper';
import EmptyTableComponent from '../../components/EmptyTableComponent'
import emptyImg from '../../assets/images/resources/orange-happy-valentines-day-greetings-and-gift.png';
import { useWindowSize } from 'react-use';
import { LuMousePointerClick } from 'react-icons/lu';
import Insight from '../../components/Insight';
import { PiShareFatFill } from 'react-icons/pi';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { TbNotes, TbNotesOff } from 'react-icons/tb';
import { MdOutlineNoteAlt, MdOutlineShoppingBag } from 'react-icons/md';



//////////////////////////////////////////////////////
const emptyTitle = "Record a new sale!";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Record Order", link: "/dashboard/orders/record" },
    { title: "Import Order", link: "/dashboard/orders/import/record" }
];


function index() {
    const { width } = useWindowSize();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showInsights, setShowInsights] = useState(false);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const widthandProduct600 = (orders && orders.length > 0 && width < 600);
    
    const columns = [
        { 
            name: '', selector: row => (
                <img width={'40px'} alt={''} src={row.name} />
            )
        },
        { 
            name: 'Prduct Name', selector: row => row.name
        },
        { 
            name: 'Collection', selector: row => row.productCollection
        },
        { 
            name: 'Variation', selector: row => row.variations
        },
        { 
            name: 'In Stock', selector: row => row.stock
        },
        { 
            name: 'Price', selector: row => '₦'+formatNumber(row.price)
        },
        { 
            name: 'Status', selector: row => (
                <span className={`status status--${(row.status)}`}>
                    <p>{row.status}</p>
                </span>
            )
        },
        { 
            name: 'Date', selector: row => formatDate(row.createdAt)
        },
    ];

    const data = [
        // {
        //     name: 'T-shirt polo xl',
        //     productCollection: 'Shirt',
        //     variations: 10,
        //     stock: 25,
        //     price: 10000,
        //     status: 'success',
        //     date: new Date('2024-09-04T09:21:38Z'),
        // }
    ];

    
    return (
        <>
            <div className='page__section--heading' style={widthandProduct600 ? {flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start'} : {}}>
                <h2 className="page__section--title">Orders</h2>

                <span className='page__section--btns' style={widthandProduct600 ? { width: "100%", display: "grid", gap: "1.6rem", gridTemplateColumns: "1fr 1fr" } : {}}>
                    {(orders && orders.length > 0) && (
                        <button className="page__section-top-btn add">Add Product <BiPlus /></button>
                    )}
                    <span className="page__section--action" onMouseLeave={() => setShowMoreActions(false)}>
                        <button onClick={() => setShowMoreActions(!showMoreActions)} className="page__section-top-btn more">More Actions <BiChevronDown /></button>
                        {showMoreActions && (
                            <ul className="page__section--dropdown">
                                <li onClick={() => setShowInsights(!showInsights)}>
                                    <span>
                                        {showInsights ? <ImEyeBlocked /> : <ImEye />}
                                    </span>
                                    {showInsights ? 'Hide' : 'Show'} Insights
                                </li>
                                <li><span><PiShareFatFill /></span>Export CSV</li>
                            </ul>
                        )}
                    </span>
                </span>
            </div>

            {showInsights && (
                <div className='page__section--insights insight--grid' style={{ marginBottom: '2.4rem', ...(width > 900 && {width: '85%'}) }}>
                    <Insight title='Total Orders' value={0} icon={<MdOutlineShoppingBag />} />
                    <Insight title='New Orders' value={0} icon={<MdOutlineNoteAlt />} />
                    <Insight title='Completed Orders' value={0} icon={<TbNotes />} />
                    <Insight title='Uncompleted Orders' value={0} icon={<TbNotesOff />} />
                </div>
            )}

            <div className="page__section--main card" style={{ padding: 0 }}>
                <TableUI
                    data={data}
                    columns={columns}
                    loading={isLoading}
                    selectableRows={true}
                    toLink="/dashboard/orders"
                    emptyComponent={
                        <EmptyTableComponent
                            img={emptyImg}
                            text={emptyText}
                            btns={emptyBtns}
                            title={emptyTitle}
                            className="empty--order"
                        />
                    }
                />
            </div>

        </>
    )
}

export default index