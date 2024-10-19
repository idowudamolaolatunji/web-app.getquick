import React from 'react';
import { formatNumber, truncateString } from '../utils/helper';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ProductCard({ product }) {
    const { width } = useWindowSize()
    return (
        <Link to={`/dashboard/products/${product._id}`} className="product__figure">
            <div className="product__figure--img">
                <span className={`product__figure--stat status status--${(product.status)}`}>
                    <p>{product.status}</p>
                </span>
                <img src={BASE_URL + product?.images[0]} />
            </div>

            <figcaption className="product__details">
                <div className="">
                    <span className="product__figure--name">
                        {truncateString(product?.name, width < 400 ? 25 : 18)}
                    </span>
                    <p className='product__figure--price value'>₦{formatNumber(product.price)}</p>
                </div>

                <div className="product__figure--details">
                    <p>Variations<span>200</span></p>
                    <p>Stock Amount<span>200</span></p>
                </div>

                <span className='product__figure--actions'>
                    <button className='table--btn'><RiEdit2Line />Edit</button>
                    <button className='table--btn'><RiDeleteBin5Line />Delete</button>
                </span>

            </figcaption>
        </Link>
    )
}

export default ProductCard