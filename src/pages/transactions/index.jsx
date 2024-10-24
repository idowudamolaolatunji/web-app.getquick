import React, { useEffect } from 'react'
import PageUI from '../pageComponents/PageUI'
import { useDataContext } from '../../context/DataContext';
import { useWindowSize } from 'react-use';
import { useFetchedContext } from '../../context/FetchedContext';
import Insight from '../../components/Insight';
import { GrTag } from 'react-icons/gr';
import { TbArrowWaveRightDown } from 'react-icons/tb';
import { LuClipboardList } from 'react-icons/lu';
import emptyImg from '../../assets/images/illustrations/transactions.png'


///////////////////////////////////////////////
const BASE_URL = import.meta.env.VITE_BASE_URL

const emptyTitle = "Track transactions offline & online";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";


function index() {
    const { width } = useWindowSize();
    const { showInsights } = useDataContext();
    const { loader, error, transactions } = useFetchedContext();


    const columns = []


    useEffect(function() {
        document.title = "Quicka | All Transactions";
        window.scrollTo(0, 0);

        // if(customers?.length < 1 && error?.customer) {}
    }, []);

    return (
        <PageUI
            columns={columns}
            data={transactions}
            items={transactions}
            pageName="transaction"
            emptyText={emptyText}
            emptyImg={emptyImg}
            emptyTitle={emptyTitle}
            emptyClassName="empty--others"
            loader={loader} error={error}
        >

            {showInsights?.transaction && (
                <div className='page__section--insights insight--grid' style={{ marginBottom: '3rem', ...(width > 900 && { width: '90%' }) }}>
                    <Insight loader={loader?.transaction} title='Pending Settlement' pre='₦' value={0} icon={<LuClipboardList />} />
                    <Insight loader={loader?.transaction} title='Total Website transaction' value={0} icon={<GrTag />} />
                    <Insight loader={loader?.transaction} title='Total Offline transaction' value={0} icon={<TbArrowWaveRightDown />} />
                </div>
            )}
        </PageUI>
    )
}

export default index