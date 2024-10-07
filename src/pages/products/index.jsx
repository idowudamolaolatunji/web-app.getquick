import React, { useState } from 'react'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import TableUI from '../../components/TableUI'
import { formatDate, formatNumber } from '../../utils/helper';
import EmptyTableComponent from '../../components/EmptyTableComponent';
import emptyImg from '../../assets/images/png/empty-box.png';
import { useWindowSize } from 'react-use';


//////////////////////////////////////////////////////
const emptyTitle = "Add new product!";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at.";
const emptyBtns = [
    { title: "Add Product", link: "/dashboard/product/add" },
    { title: "Import Product", link: "/dashboard/product/import/add" }
];


function index() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(["sxnsjsn"]);
    const { width } = useWindowSize();
    const widthandProduct500 = (products && products.length > 0 && width < 500);

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
            <div className='page__section--heading' style={widthandProduct500 ? {flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start'} : {}}>
                <h2 className="page__section--title">Products</h2>

                <span className='page__section--btns' style={widthandProduct500 ? { width: "100%",
        display: "grid",
        gap: "1.6rem",
        gridTemplateColumns: "1fr 1fr" } : {}}>
                    {(products && products.length > 0) && (
                        <button className="page__section-top-btn add">Add Product <BiPlus /></button>
                    )}
                    <button className="page__section-top-btn more">More Actions <BiChevronDown /></button>
                </span>
            </div>

            <div className="page__section--main card" style={{ padding: 0 }}>
                <TableUI 
                    data={data}
                    columns={columns}
                    loading={isLoading}
                    selectableRows={true}
                    toLink="/dashboard/products"
                    emptyComponent={
                        <EmptyTableComponent
                            img={emptyImg}
                            text={emptyText}
                            btns={emptyBtns}
                            title={emptyTitle}
                            className="empty--product"
                        />
                    }
                />
            </div>
        </>
    )
}

export default index