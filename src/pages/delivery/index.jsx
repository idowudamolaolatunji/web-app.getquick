import React, { useEffect } from 'react'
import PageUI from '../pageComponents/PageUI'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';
import { useFetchedContext } from '../../context/FetchedContext';
import emptyImg from '../../assets/images/illustrations/delivery.png';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import TooltipUI from '../../components/TooltipUI';
import { MdOutlineRefresh } from 'react-icons/md';
import { formatNumber } from '../../utils/helper';


///////////////////////////////////////////////
const BASE_URL = import.meta.env.VITE_BASE_URL

const emptyTitle = "Add Delivery Rates";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Add Delivery", link: "/dashboard/delivery/add" },
];

function index() {
    const { loader, error, deliveryRates, handleFetchUserStoreDeliveryRates } = useFetchedContext();

    const columns = [
        {
            name: 'Title',
            selector: row => <span className='table--info'>
                <h3>{row?.title}</h3>
            </span>,
            width: "25%"
        },
        {
            name: 'Type',
            selector: row => (
                <span className="status status--pending">
                    <p>{row?.deliveryType}</p>
                </span>
            ),
        },
        {
            name: 'Fee',
            selector: row => (
                <p className='value'>₦{formatNumber(row?.fee)}</p>
            ),
        },
        {
            name: 'Date',
            selector: row => row?.createdAt,
        },
        {
            selector: () => (
                <span className='table--actions'>
                    <button className='table--btn'><RiEdit2Line /></button>
                    <button className='table--btn'><RiDeleteBin5Line /></button>
                </span>
            ),
        },
    ];

    const HeadTabs = function() {
        return (
            <div className='content'>
                <span className='flex'>
                    <TooltipUI placement='top' title="Refresh">
                        <button className='table--btn' onClick={handleFetchUserStoreDeliveryRates}><MdOutlineRefresh /></button>
                    </TooltipUI>
                </span>
            </div>
        );
    }


    useEffect(function() {
        document.title = "Quicka | Delivery Rates";
        window.scrollTo(0, 0);

        if(deliveryRates?.length < 1 && error?.delivery) handleFetchUserStoreDeliveryRates()
    }, []);

    return (
        <PageUI
            columns={columns}
            data={deliveryRates}
            items={deliveryRates}
            pageName="delivery"
            emptyText={emptyText}
            emptyImg={emptyImg}
            emptyBtns={emptyBtns}
            emptyTitle={emptyTitle}
            addUrl="delivery-rates/add"
            emptyClassName="empty--others"
            loader={loader} error={error}
            goto={false}
            insights={false}
            headTabs={<HeadTabs />}
        />
    )
}

export default index