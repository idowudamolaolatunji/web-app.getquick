import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { MdOutlineDeliveryDining, MdOutlineShoppingBag, MdOutlineStorefront } from 'react-icons/md';
import { LuTag } from 'react-icons/lu';
import { RiBankLine } from 'react-icons/ri';

function GetStarted() {
    const { isNewCustomer } = useAuthContext();

    return (
        <div className="get-started" style={{ marginTop: '-1.4rem'}}>
            <h2 className='get-started-title'>Let get you started selling</h2>
            <p className='get-started-subtitle'>Finalize your setup to make your website visible to the world.</p>
            <span className='get-started-nums'>0 / 4 completed</span>

            <div className="get-started-opts">
                <div className="opts--items">
                    <div className="opts--heading">
                        <span className='opts--icon'><MdOutlineStorefront /></span>
                        <h3>Customize your online store.</h3>
                    </div>
                    <p>Select a theme, upload your logo, choose colors, and add images to customize your website.</p>
                    <button>Customize store</button>
                </div>

                <div className="opts--items">
                    <div className="opts--heading">
                        <span className='opts--icon'><MdOutlineShoppingBag /></span>
                        <h3>Add your first product.</h3>
                    </div>
                    <p>Write a description, add photos, and set pricing for the products you plan to sell, you can always add more later from the sidebar.</p>
                    <div className="opts--btns">
                        <button>Add product</button>
                        <div>Import product</div>
                    </div>
                </div>

                <div className="opts--items">
                    <div className="opts--heading">
                        <span className='opts--icon'><MdOutlineDeliveryDining /></span>
                        <h3>Add your delivery rates to your website.</h3>
                    </div>
                    <p>Set up delivery areas and how much you charge so your customers can see their shipping costs at checkout.</p>
                    <button>Add delivery rates</button>
                </div>

                <div className="opts--items">
                    <div className="opts--heading">
                        <span className='opts--icon'><RiBankLine /></span>
                        <h3>Add bank details for payments.</h3>
                    </div>
                    <p>Bank details is needed to allow you start collecting payment when you make sales through your website.</p>
                    <button>Set up payment</button>
                </div>
            </div>


            <button className={`get-started-btn ${isNewCustomer ? 'disabled' : ''}`} disabled>Completed</button>
        </div>
    )
}

export default GetStarted