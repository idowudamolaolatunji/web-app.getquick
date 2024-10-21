import React, { useEffect } from 'react'
import PageUI from '../pageComponents/PageUI'
import { useWindowSize } from 'react-use';
import { useDataContext } from '../../context/DataContext';
import { useFetchedContext } from '../../context/FetchedContext';
import Insight from '../../components/Insight';
import { FiUser, FiUsers } from 'react-icons/fi';


const BASE_URL = import.meta.env.VITE_BASE_URL

const emptyTitle = "Add new customer!";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Add Customer", link: "/dashboard/customers/add" },
    { title: "Import Customer", link: "/dashboard/customers/import/add" }
];


function index() {
    const { width } = useWindowSize();
    const { showInsights } = useDataContext();
    const { loader, error, customers } = useFetchedContext();

    const columns = [];

    useEffect(function() {
        document.title = "Quicka | Customers";
        window.scrollTo(0, 0);

        if(customers?.length < 1 && error?.customer) {}
    }, []);


    return (
        <PageUI
            pageName="customer"
            items={customers}
            columns={columns}
            data={customers}
            addUrl="customers/add"
            emptyText={emptyText}
            emptyBtns={emptyBtns}
            // emptyImg={emptyImg}
            emptyTitle={emptyTitle}
            emptyClassName="empty--customer"
            // headTabs={<HeadTabs />}
            loader={loader} error={error}
            // loader={loader?.customer} error={error?.customer}
        >
            
            {showInsights?.customer && (
                <div className='page__section--insights insight--grid' style={{ marginBottom: '3rem', ...(width > 900 && {width: '90%'}) }}>
                    <Insight title='Total Customers' loader={loader?.customer} value={customers?.length || 0} icon={<FiUsers />} />
                    <Insight title='New Customers' loader={loader?.customer} value={0} icon={<FiUser />} />
                </div>
            )}

        </PageUI>
    )
}

export default index