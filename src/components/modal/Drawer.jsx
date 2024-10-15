import React from 'react'

function Drawer({ title, children, setClose }) {
    function handleClose() {
        setClose(false)
    }

    return (
        <div className="modal drawer">
            <div className="drawer--head">
                {title}
                <span onClick={handleClose}></span>
            </div>
            {children}
        </div>
    )
}

export default Drawer