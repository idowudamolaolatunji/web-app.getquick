import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import CurrencyInput from 'react-currency-input-field';
import Asterisk from '../../../components/Asterisk';
import QuillEditor from '../../../components/QuillEditor';
import { useWindowSize } from 'react-use';
import Line from '../../../components/Line';
import { FaCheck } from 'react-icons/fa';

function CreateDelivery({ close, isnew }) {
    const [deliveryData, setDeliveryData] = useState({

        title: "",
        type: "paid",
        fee: null,
        visibility: true
    });

    const currency = "₦";
    const { width } = useWindowSize();

    useEffect(function () {
        !isnew && window.scrollTo(0, 0);
    }, []);


    return (
        <section className='product__upload-section'>
            <div className='page__section--heading'>
                <span className='flex'>
                    <BackButton close={close} />
                    <h2 className="page__section--title">Create Delivery Rate</h2>
                </span>

               {width > 600 && (
                    <div className="page__section--actions">
                        <button className='button clear--button'>Clear Fields</button>
                        <button className='button submit--button'>Submit</button>
                    </div>
               )}
            </div>



            <div className="product__upload--container">
                <div className='left--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Delivery Details</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Delivery Title <Asterisk /></label>
                            <input type="text" id="" className="form--input" placeholder='Lorem ipsum dolor sit amet consectetur.' />
                        </div>

                        <div className="form--item">
                            <label htmlFor="" className="form--label">Delivery pricing (optional)</label>
                            <div className="form--clicks">
                                <div className={
                                    `form--click ${deliveryData.type == "paid" ? 'is-selected' : ''}`} 
                                    onClick={() => setDeliveryData({ ...deliveryData, type: "paid" })}
                                >Paid <span></span>
                                </div>
                                <div className={`
                                    form--click ${deliveryData.type == "free" ? 'is-selected' : ''}`}
                                    onClick={() => setDeliveryData({ ...deliveryData, type: "free" })}
                                >No <span></span>
                                </div>
                            </div>
                        </div>

                        {deliveryData.type == "paid" && (
                            <div className="form--item">
                                <label htmlFor="fee" className="form--label">Delivery Fee <Asterisk /></label>

                                <CurrencyInput
                                    id="fee"
                                    name="fee"
                                    className="form--input"
                                    placeholder="Delivery Fee"
                                    prefix={currency}
                                    decimalsLimit={0}
                                    onValueChange={(value, name, _) => setDeliveryData({ ...deliveryData, [name]: value })}
                                />
                            </div>
                        )}
                    </div>
                </div>



                <div className='right--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Product Descriptions</h2>
                            {width > 400 && <Line border={1.4} where="Top" value="1rem" />}
                        </div>


                        <div className="form--item">
                            <label htmlFor="" className="form--label">Product Description (optional)</label>
                            <QuillEditor />
                        </div>


                        <div className="form--item-flex" onClick={() => setDeliveryData({ ...deliveryData, visibility: !deliveryData.visibility })}>
                            <div id="checkbox" className={deliveryData.visibility ? 'is-selected' : ''}>
                                {deliveryData.visibility && <FaCheck />}
                            </div>
                            <label className='form--text' style={{ fontSize: '1.24rem', fontWeight: '500' }}>Display delivery rate at checkout</label>
                        </div>
                    </div>
                </div>
            </div>


            {width < 600 && (
                <div className="page__section--actions" style={{ marginTop: "4rem" }}>
                    <button className='button clear--button'>Clear Fields</button>
                    <button className='button submit--button'>Submit</button>
                </div>
            )}
        </section>
    )
}

export default CreateDelivery