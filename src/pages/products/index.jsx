import React, { useState } from 'react'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import TableUI from '../../components/TableUI'
import { formatDate, formatNumber } from '../../utils/helper';
import EmptyTableComponent from '../../components/EmptyTableComponent';
import emptyImg from '../../assets/images/resources/orange-woman-with-packages-in-shopping-cart.png';
import { useWindowSize } from 'react-use';
import Insight from '../../components/Insight';
import { LuClipboardList, LuMousePointerClick } from 'react-icons/lu';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { PiExport, PiShareFatFill } from 'react-icons/pi';
import { GrTag } from 'react-icons/gr';
import { TbArrowWaveRightDown, TbListSearch } from 'react-icons/tb';
import { useFetchedContext } from '../../context/FetchedContext';
import { useDataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';


//////////////////////////////////////////////////////
const BASE_URL = import.meta.env.VITE_BASE_URL

const emptyTitle = "Add new product!";
const emptyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam vero perferendis sapiente iste assumenda nam, vel dicta ducimus at perferendis sapiente iste.";
const emptyBtns = [
    { title: "Add Product", link: "/dashboard/products/upload" },
    { title: "Import Product", link: "/dashboard/products/import/upload" }
];


function index() {
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { products, collections } = useFetchedContext();
    const { handleToggleInsights, showInsights } = useDataContext();
    const productsSold = 2;
    const outOfStock = 0;
    const collectionAmount = collections?.length;
    const totalInventoryWorth = products?.reduce((acc, product) => acc + product.price, 0);

    const [isLoading, setIsLoading] = useState(false);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const widthandProduct500 = (products && products.length > 0 && width < 500);

    const columns = [
        { 
            name: 'Prduct',
            selector: row => (
                <div className="table--flex">
                    <img alt={row.name} src={BASE_URL + row.images[0]} />
                    <span className='table--info'>
                        <h3>{row.name}</h3>
                        <span>{row.productCollection}</span>
                    </span>

                </div>
            ),
            width: "35%"
        },
        { 
            name: 'Price',
            selector: row => '₦'+formatNumber(row.price),
            width: "10%"
        },
        { 
            name: 'Inventory',
            selector: row => (
                <span className="flex table--info">
                    <p>{row.stockAmount} <span>Stocks</span></p>
                    <span>/</span>
                    <p>{row.variations.length} <span>Variations</span></p>
                </span>
            ),
            width: "20%"
        },
        { 
            name: 'Status',
            selector: row => (
                <span className={`status status--${(row.status)}`}>
                    <p>{row.status}</p>
                </span>
            )
        },
        { 
            name: "",
            selector: () => (
                <span>
                    <button>Edit</button>
                    <button>Delete</button>
                </span>
            )
        },
    ];

    return (
        <>
            <div className='page__section--heading' style={widthandProduct500 ? {flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start'} : {}}>
                <h2 className="page__section--title">Products</h2>

                <span className='page__section--btns' style={widthandProduct500 ? { width: "100%", display: "grid", gap: "1.6rem", gridTemplateColumns: "1fr 1fr" } : {}}>
                    {(products && products.length > 0) && (
                        <button className="page__section-top-btn add" onClick={() => navigate("/dashboard/products/upload")}>Add Product <BiPlus /></button>
                    )}

                    <span className="page__section--action" onMouseLeave={() => setShowMoreActions(false)}>
                        <button onClick={() => setShowMoreActions(!showMoreActions)} className="page__section-top-btn more">More Actions <BiChevronDown /></button>
                        {showMoreActions && (
                            <ul className="page__section--dropdown">
                                <li onClick={() => handleToggleInsights("product")}>
                                    <span>
                                        {showInsights?.product ? <ImEyeBlocked /> : <ImEye />}
                                    </span>
                                    {showInsights?.product ? 'Hide' : 'Show'} Insights
                                </li>
                                <li><span><PiShareFatFill /></span>Export CSV</li>
                            </ul>
                        )}
                    </span>
                </span>
            </div>

            {showInsights?.product && (
                <div className='page__section--insights insight--grid' style={{ marginBottom: '3rem', ...(width > 900 && {width: '85%'}) }}>
                    <Insight title='Total Inventory worth' pre='₦' value={totalInventoryWorth} dec={totalInventoryWorth ? 0 : 2} icon={<LuClipboardList />} />
                    <Insight title='Total Products Sold' value={productsSold} icon={<GrTag />} />
                    <Insight title='Total Collection' value={collectionAmount} icon={<TbListSearch />} />
                    <Insight title='Out of stock' value={outOfStock} icon={<TbArrowWaveRightDown />} />
                </div>
            )}

            <div className="page__section--main card" style={{ padding: 0 }}>
                <TableUI 
                    data={products}
                    columns={columns}
                    loading={isLoading}
                    selectableRows={true}
                    // toLink="/dashboard/products"
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