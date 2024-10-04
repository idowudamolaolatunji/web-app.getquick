import React from 'react'

function GetStarted() {
    return (
        <div className="get-started">
            <h2>Let get you started selling</h2>
            <p>Finalize your setup to make your website visible to the world.</p>
            <span>0 / 4 completed</span>

            <div className="get-started-opts">
                <div className="opts--items">
                    <h3>Customize your online store</h3>
                    <p>Select a theme, upload your logo, choose colors, and add images to customize your website</p>
                    <button>Customize store</button>
                </div>

                <div className="opts--items">
                    <h3>Add your first product</h3>
                    <p>Write a description, add photos, and set pricing for the products you plan to sell, you can always add more later from the sidebar</p>

                    <div className="opts--btns">
                        <button>Add product</button>
                        <button>import broduct</button>
                    </div>
                </div>

                <div className="opts--items">
                    <h3>Add your delivery rates to your website</h3>
                    <p>Set up delivery areas and how much you charge so your customers can see their shipping costs at checkout.</p>
                    <button>Add delivery rates</button>
                </div>

                <div className="opts--items">
                    <h3>Add bank details for payments</h3>
                    <p>Bank details is needed to allow you start collecting payment when you make sales through your website</p>
                    <button>Set up payment</button>
                </div>

                <button>Completed</button>
            </div>
        </div>
    )
}

export default GetStarted