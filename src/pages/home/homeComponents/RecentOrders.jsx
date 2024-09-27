import React from 'react'
import DataTable from 'react-data-table-component'
import { capitalizeFirstLetter, formatDate, formatNumber } from '../../../utils/helper';
import { Link, useNavigate } from 'react-router-dom';

import { facebook, online_store, physical_store, instagram,whatsapp, twitter, flutterwave_store, others, jiji, jumia, konga } from '../../../assets/images/index';
import TooltipUI from '../../../components/TooltipUI';


function imgString(imgType) {
    if(imgType === 'online_store') return online_store;
    if(imgType === 'facebook') return facebook;
    if(imgType === 'physical_store') return physical_store;
    if(imgType === 'instagram') return instagram;
    if(imgType === 'whatsapp') return whatsapp;
    if(imgType === 'twitter') return twitter;
    if(imgType === 'flutterwave_store') return flutterwave_store;
    if(imgType === 'jiji') return jiji;
    if(imgType === 'jumia') return jumia;
    if(imgType === 'konga') return konga;
    if(imgType === 'others') return others;
}


const columns = [
    { 
        name: 'Channel', selector: row => (
        <TooltipUI placement='top' title={capitalizeFirstLetter(row.channel.split('_').join(' '))}>
            <img width={'40px'} alt={row.channel} src={imgString(row.channel)} />
        </TooltipUI>
    ), width: '70px'},
    { 
        name: 'Order Id', selector: row => row.id, width: '100px'
    },
    { 
        name: 'Custumer Name', selector: row => row.name, width: '150px'
    },
    { 
        name: 'Product', selector: row => row.product, width: '150px'
    },
    { 
        name: 'Amount', selector: row => '₦'+formatNumber(row.amount), width: '100px'
    },
    { 
        name: 'Status', selector: row => row.status, width: '100px'
    },
    { 
        name: 'Delievery', selector: row => row.delivery, width: '100px'
    },
    { 
        name: 'Date', selector: row => formatDate(row.date), width: '150px'
    },
];

const data = [
    {
        id: '019875',
        name: 'Damola Olatunji',
        product: 'T-shirt polo xl',
        amount: 100000,
        status: 'Success',
        delivery: 'Delivered',
        date: new Date('2024-09-04T09:21:38Z'),
        channel: 'online_store'
    },
    {
        id: '0387663',
        name: 'Idowu Olatunji',
        product: 'Baggie Trousers',
        amount: 120000,
        status: 'Pending',
        delivery: 'Pending',
        date: new Date('2024-05-22T23:59:01Z'),
        channel: 'facebook'
    },
    {
        id: '0358673',
        name: 'David Olatunji',
        product: 'Baggie Trousers',
        amount: 120000,
        status: 'Pending',
        delivery: 'Pending',
        date: new Date('2024-05-22T23:59:01Z'),
        channel: 'jiji'
    },
    {
        id: '01162334',
        name: 'Oyindamola Olatunji',
        product: 'Baggie Trousers',
        amount: 120000,
        status: 'Pending',
        delivery: 'Pending',
        date: new Date('2024-05-22T23:59:01Z'),
        channel: 'flutterwave_store'
    },
];

const customStyles = {
    table: {
        style: {
            overflowX: 'auto',
        },
    },    
	head: {
		style: {
			fontSize: "13px",
			fontWeight: "bold",
			color: "#555",
		},
	},
	rows: {
        style: {
            minHeight: '60px',
            cursor: 'pointer'
        },
    },
    headCells: {
		style: {
			paddingRight: '5px',
		},
	},

};

function RecentOrders() {
    const navigate = useNavigate()

    return (
        <div className='card recent-section' style={{ padding: 0 }}>
            <div className="section--top" style={{ padding: '2rem' }}>

                <div className="section--heading" >
                    <h2>Recent Order </h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>

                <Link to="/dashboard/orders">View more</Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
                onRowClicked={(row) => navigate(`/dashboard/orders/${row.id}`)}
                customStyles={customStyles}
            />
        </div>
    )
}

export default RecentOrders