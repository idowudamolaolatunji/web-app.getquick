import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmptyTableComponent({ img, title, text, className, btns, customStyle }) {
    const navigate = useNavigate();

    return (
        <div className={className} style={customStyle}>
            <div className="empty--img">
                <img src={img} alt="empty image" />
            </div>
            <div className='empty--info'>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className='empty--btns'>
                    {btns?.map(btn => (
                        <button
                            key={btn.title}
                            onClick={() => navigate(btn.link)}
                        >
                            {btn.title}
                        </button>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default EmptyTableComponent