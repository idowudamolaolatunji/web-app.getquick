import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import BackButton from '../../../components/button/BackButton';
import { RiBankLine } from 'react-icons/ri';
import { banks } from '../../../utils/data.js';
import MainDropdownSelect from '../../../components/MainDropdownSelect';
import Asterisk from '../../../components/Asterisk.jsx';
import CurrencyInput from 'react-currency-input-field';
import Line from '../../../components/Line.jsx';

function BankDetails({ isnew, close }) {
    const { width } = useWindowSize();
    const [bankName, setBankName] = useState([]);
    const [bankFormErrors, setBankFormErrors] = useState({})

    const [bankData, setBankData] = useState({
        accountNumber: "",
        accountName: ""
    });


    function handleBankFormChange(e) {
        const { name, value } = e.target;

        setBankData({
            ...bankData,
            [name]: value,
        });
    }

    useEffect(function () {
        !isnew && window.scrollTo(0, 0);
    }, []);

    return (
        <section className='product__upload-section'>
            <div className='page__section--heading'>
                <span className='flex'>
                    <BackButton close={close} />
                    <h2 className="page__section--title">Payment Details<RiBankLine /></h2>
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
                            <h2>Bank Details</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>

                        <div className="form--item">
                            <label className="form--label">Bank Name <Asterisk /></label>
                            <MainDropdownSelect title="Bank" options={banks} field="name" value={bankName} setValue={setBankName} noDataLabel="No Bank found with that name" />
                            <span className="form--error-message">
                                {bankFormErrors.bankName && bankFormErrors.bankName}
                            </span>
                        </div>


                        <div className="form--grid">
                            <div className="form--item">
                                <label htmlFor='number' className="form--label">Account Number <Asterisk /></label>

                                <input type="number" name="accountNumber" id="number" className='form--input' value={bankData.accountNumber} onChange={handleBankFormChange} placeholder='1234567890' />
                                <span className="form--error-message">
                                    {bankFormErrors.accountNumber && bankFormErrors.accountNumber}
                                </span>
                            </div>

                            <div className="form--item">
                                <label htmlFor='name' className="form--label">Account Name <Asterisk /></label>
                                <input type="text" name="accountName" id="name" className='form--input' value={bankData.accountName} onChange={handleBankFormChange} placeholder='Jane Doe Martha' />
                                <span className="form--error-message">
                                    {bankFormErrors.accountName && bankFormErrors.accountName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                {width < 400 && <Line border={1.4} />}


                <div className='right--container containers'>
                    <div className="card form">
                        <div className="section--heading">
                            <h2>Payment Settings</h2>
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