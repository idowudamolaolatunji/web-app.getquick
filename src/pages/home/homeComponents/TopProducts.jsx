import React from 'react'
import SelectAutoWidthDropdown from '../../../components/SelectAutoWidthDropdown';

import img_item from '../../../assets/images/resources/IMG_5336.jpg'

const datePeriods = [
    { value: 'this-week', title: 'This Week' },
    { value: 'this-month', title: 'This Month' },
]


function ProductFigure() {
    return (
        <figure className='top-product--figure'>
            <img className='top-product--img' src={img_item} alt="" />
            <figcaption className='top-product--details'>
                <div className='top-product--info'>
                    <p className='product--info-text'>Wool Sweater 100...</p>
                    <span className='product--info-value'>
                        <span>10/20</span>
                        <span>50%</span>
                    </span>
                </div>
                <div className='top-product--scale'><span style={{ width: '10%' }} /></div>
            </figcaption>
        </figure>
    )
}

function TopProducts() {
    return (
        <div className='card top-product-section'>
            <div className="section--top">
                <div className="section--heading" >
                    <h2>Best Selling Products</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>

                <SelectAutoWidthDropdown menus={datePeriods} />
            </div>

            <div className='top-product--container'>
                <ProductFigure />
                <ProductFigure />
                <ProductFigure />
            </div>

        </div>
    )
}

export default TopProducts