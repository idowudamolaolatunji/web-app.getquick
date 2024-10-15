import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';

import Asterisk from '../../../components/Asterisk';
import QuillEditor from '../../../components/QuillEditor';
import BackButton from '../../../components/button/BackButton';
import SimpleModal from '../../../components/modal/Simple';

import { MdOutlinePendingActions, MdOutlineShoppingBag } from 'react-icons/md';
import { useAuthContext } from '../../../context/AuthContext';
import Line from '../../../components/Line';
import '../../uploadStyle.css';
import { AiOutlinePlus } from 'react-icons/ai';
import Info from '../../../components/Info';
import MainDropdownSelect from '../../../components/MainDropdownSelect';

import { paymentMethodData, deliveryStatusData, channelData } from '../../../utils/data'


function RecordOrder() {
    const [orderData, setOrderData] = useState({
        title: "",
        paymentType: "paid",
    });

    const [loading, setLoading] = useState({
        mainLoading: false,
        imageLoading: false
    });

    const [description, setDescription] = useState('');
    const [orderProduct, setOrderProduct] = useState([]);
    const [orderCustomer, setOrderCustomer] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState([]);
    const [deliveryStatus, setDeliveryStatus] = useState([]);
    const [channel, setChannel] = useState([]);
    console.log(paymentMethod, deliveryStatus)

    // VALUES AND DATA FOR DROPDOWN
    const [customers, setCustomers] = useState([{ name: "Idowu Olatunji" }, { name: "Damola David" }])
    const [products, setProducts] = useState([{ name: "Tee-shirt" }, { name: "Baggie Jeans" }])


    const { width } = useWindowSize();
    const { store } = useAuthContext();
    const currency = "₦";

    function handleOrderDataChange(e) {
        const { name, value } = e?.target;
        console.log(name, value)
        setOrderData({
            ...orderData,
            [name]: value,
        });
    }

    function handleClearFields() {
        setOrderData({
            quantity: null,
        });

        setDescription("");
        setPaymentMethod("");
        setDeliveryStatus("");
        setOrderCustomer([]);
        setOrderProduct([]);
    }

    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);

    useEffect(function () {
        if (orderData.paymentType == "unpaid") {
            setPaymentMethod("");
        }
    }, [orderData.paymentType]);


    return (
        <section className='product__upload-section'>
            <div className='page__section--heading'>
                <span className='flex'>
                    <BackButton />
                    <h2 className="page__section--title">Record Orders<MdOutlineShoppingBag /></h2>
                </span>

                {width > 600 && (
                    <div className="page__section--actions">
                        <button className='button clear--button' onClick={handleClearFields}>Clear Fields</button>
                        <button className='button submit--button'>Submit</button>
                    </div>
                )}
            </div>


            <div className="product__upload--container">
                <div className='left--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Order Item</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>


                        <div className="form--item">
                            <label className="form--label">Product <Asterisk /></label>
                            <MainDropdownSelect title="Product" options={products} field="name" value={orderProduct} setValue={setOrderProduct} />

                            <button className='form--add'>
                                <AiOutlinePlus />
                                <p>Add New Product</p>
                            </button>
                        </div>

                    </div>


                    {width < 400 && <Line border={1.4} />}


                    <div className="card form">
                        <div className="section--heading">
                            <h2>Order Details</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>

                        <div className="form--grid">
                            <div className="form--item">
                                <label className="form--label">Order / Sales Channel <Asterisk /></label>

                                <MainDropdownSelect title="a Channel" options={channelData} field="label" value={channel} setValue={setChannel} />
                            </div>

                            <div className="form--item">
                                <label className="form--label">Order Date <Asterisk /></label>
                                <input type="date" className='form--input' placeholder='Select date' max={new Date().toISOString().split('T')[0]} name="" id="" />
                            </div>
                        </div>


                        <div className="form--item">
                            <label className="form--label">Customer (optional)</label>
                            <MainDropdownSelect title="Customer" options={customers} field="name" value={orderCustomer} setValue={setOrderCustomer} />
                            <Info text="If you don't have customer's details, Leave blank" />

                            <button className='form--add'>
                                <AiOutlinePlus />
                                <p>Add Customer</p>
                            </button>
                        </div>
                    </div>
                </div>

                {width < 400 && <Line border={1.4} />}

                <div className='right--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Order Payment & Delivery</h2>
                            {width > 400 && <Line border={1.4} where="Top" value="1rem" />}
                        </div>

                        <div className="form--item">
                            <label className="form--label">Payment Status</label>

                            <div className="form--clicks">
                                <div className={`form--click ${orderData.paymentType == "paid" ? 'is-selected' : ''}`}
                                    onClick={() => setOrderData({ ...orderData, paymentType: "paid" })}
                                >Paid <span></span>
                                </div>
                                <div className={`form--click ${orderData.paymentType == "partially" ? 'is-selected' : ''}`}
                                    onClick={() => setOrderData({ ...orderData, paymentType: "partially" })}
                                >Partly Paid<span></span>
                                </div>
                                <div className={`form--click ${orderData.paymentType == "unpaid" ? 'is-selected' : ''}`}
                                    onClick={() => setOrderData({ ...orderData, paymentType: "unpaid" })}
                                >Unpaid<span></span>
                                </div>
                            </div>
                        </div>


                        {orderData.paymentType != "unpaid" && (
                            <div className="form--item">
                                <label className="form--label">Payment Method <Asterisk /></label>

                                <MainDropdownSelect title="a Payment Method" options={paymentMethodData} field="label" value={paymentMethod} setValue={setPaymentMethod} searchable={false} />
                            </div>
                        )}

                        <div className="form--item">
                            <label htmlFor='status' className='form--label'>Delivery Status <Asterisk /></label>

                            <MainDropdownSelect title="a Delivery Status" options={deliveryStatusData} field="label" value={deliveryStatus} setValue={setDeliveryStatus} searchable={false} />
                        </div>


                        <div className="form--item">
                            <label htmlFor="" className="form--label">Addition Note (optional)</label>
                            <QuillEditor value={description} setValue={setDescription} />
                        </div>
                    </div>
                </div>
            </div>


            {width < 600 && (
                <div className="page__section--actions" style={{ marginTop: "4rem" }}>
                    <button className='button clear--button' onClick={handleClearFields}>Clear Fields</button>
                    <button className='button submit--button'>Submit</button>
                </div>
            )}
        </section>

    )
}

export default RecordOrder