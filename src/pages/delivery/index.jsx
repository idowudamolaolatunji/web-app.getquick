import React, { useEffect } from 'react'
import PageUI from '../pageComponents/PageUI'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';
import { useFetchedContext } from '../../context/FetchedContext';
import emptyImg from '../../assets/images/illustrations/Take Away-cuate.png';


///////////////////////////////////////////////
const BASE_URL = import.meta.env.VITE_BASE_URL

const emptyTitle = "Add Delivery Rates";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Add Delivery", link: "/dashboard/delivery/add" },
];

function index() {
    const { width } = useWindowSize();
    const { showInsights } = useDataContext();
    const { loader, error, delivery } = useFetchedContext();


    const columns = [];


    useEffect(function() {
        document.title = "Quicka | Delivery Rates";
        window.scrollTo(0, 0);

        // if(customers?.length < 1 && error?.customer) {}
    }, []);

    return (
        <PageUI
            columns={columns}
            data={delivery}
            items={delivery}
            pageName="delivery"
            emptyText={emptyText}
            emptyImg={emptyImg}
            emptyBtns={emptyBtns}
            emptyTitle={emptyTitle}
            emptyClassName="empty--others"
            loader={loader} error={error}
            insights={false}
        />
    )
}

export default index