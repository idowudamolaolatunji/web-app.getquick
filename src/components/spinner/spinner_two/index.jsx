import React from 'react';
import './style.css'
import { useWindowSize } from 'react-use';

function index() {
    const { width } = useWindowSize();
    return (
        <div className="spinner--container">
            <div class="spinner_two" style={width > 850  ? { 
                transform: 'translateY(12rem)'
            } : { 
                transform: 'translateY(5.8rem)'
            }}>
                <div class="cube"><div class="cube__inner"></div></div>
                <div class="cube"><div class="cube__inner"></div></div>
                <div class="cube"><div class="cube__inner"></div></div>
            </div>
        </div>
    )
}

export default index