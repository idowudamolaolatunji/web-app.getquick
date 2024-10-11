import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import BackButton from '../../../components/button/BackButton';
import { RiBankLine } from 'react-icons/ri';

function BankDetails({ isnew, close }) {
    const { width } = useWindowSize();

    useEffect(function () {
        !isnew && window.scrollTo(0, 0);
    }, []);

    return (
        <section className='product__upload-section'>
            <div className='page__section--heading'>
                <span className='flex'>
                    <BackButton close={close} />
                    <h2 className="page__section--title">
                        Payment Details
                        <RiBankLine />
                    </h2>
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


                    </div>
                </div>


                <div className='right--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Delivery Details</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
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

export default BankDetails