import React, { useEffect, useState } from 'react'
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
import { useDataContext } from '../../context/DataContext';
import { useFetchedContext } from '../../context/FetchedContext';



//////////////////////////////////////////////////////
const emptyTitle = "Record a new sale!";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Record Order", link: "/dashboard/orders/record" },
    { title: "Import Order", link: "/dashboard/orders/import/record" }
];


function index() {
    const { width } = useWindowSize();
    const { handleToggleInsights, showInsights,  } = useDataContext();
    const { loader, error, orders, products, handleFetchUserStoreOrders } = useFetchedContext()
    const widthandOrder600 = (orders && orders.length > 0 && width < 600);

    const [showMoreActions, setShowMoreActions] = useState(false);
    const [tableSearch, setTableSearch] = useState('');
    
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

    const HeadTabs = function() {
        return (
            <div>
                <span className='flex'>
                    <TooltipUI placement='top' title="Refresh">
                        <button className='table--btn' onClick={handleFetchUserStoreOrders}><MdOutlineRefresh /></button>
                    </TooltipUI>
                    <input type="text" className="table--input form--input" placeholder='search..' />
                </span>
            </div>
        );
    }

    useEffect(function() {
        if(orders?.length < 1 && error.order) handleFetchUserStoreOrders();
    }, [])

    
    return (
        <>
            <div className='page__section--heading' style={widthandOrder600 ? {flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start'} : {}}>
                <h2 className="page__section--title">Orders</h2>

                <span className='page__section--btns' style={widthandOrder600 ? { width: "100%", display: "grid", gap: "1.6rem", gridTemplateColumns: "1fr 1fr" } : {}}>
                    {(orders && orders.length > 0) && (
                        <button className="page__section-top-btn add">Add Orders <BiPlus /></button>
                    )}
                    <span className="page__section--action" onMouseLeave={() => setShowMoreActions(false)}>
                        <button onClick={() => setShowMoreActions(!showMoreActions)} className="page__section-top-btn more">More Actions <BiChevronDown /></button>
                        {showMoreActions && (
                            <ul className="page__section--dropdown">
                                <li onClick={() => handleToggleInsights("order")}>
                                    <span>
                                        {showInsights?.order ? <ImEyeBlocked /> : <ImEye />}
                                    </span>
                                    {showInsights?.order ? 'Hide' : 'Show'} Insights
                                </li>
                                <li><span><PiShareFatFill /></span>Export CSV</li>
                            </ul>
                        )}
                    </span>
                </span>
            </div>

            {showInsights?.order && (
                <div className='page__section--insights insight--grid' style={{ marginBottom: '3rem', ...(width > 900 && {width: '85%'}) }}>
                    <Insight title='Total Orders' loader={loader?.order} value={orders?.length} icon={<MdOutlineShoppingBag />} />
                    <Insight title='New Orders' loader={loader?.order} value={0} icon={<MdOutlineNoteAlt />} />
                    <Insight title='Completed Orders' loader={loader?.order} value={0} icon={<TbNotes />} />
                    <Insight title='Uncompleted Orders' loader={loader?.order} value={0} icon={<TbNotesOff />} />
                </div>
            )}

            <div className="page__section--main card" style={{ padding: 0 }}>
                <TableUI
                    data={orders}
                    columns={columns}
                    loader={loader?.order}
                    error={error?.order}
                    selectableRows={true}
                    toLink="/dashboard/orders"
                    headTabs={<HeadTabs />}
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