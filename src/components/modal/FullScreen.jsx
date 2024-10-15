import React from 'react'


function FullScreen({ children, style }) {

    return (
        <div className="modal full--screen">
            <div style={style}>
                {children}
            </div>
        </div>
    )
}

export default FullScreen