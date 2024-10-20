import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ProductCardSkeleton() {
  return (
    <div className='product__figure'>
        <Skeleton height={230} />
        <div>
            <Skeleton height={10} />
            <Skeleton height={10} />
        </div>
        <div>
            <Skeleton height={10} />
            <Skeleton height={10} />
        </div>

        <div className='product__figure--actions'>
            <Skeleton height={40} width={75} />
            <Skeleton height={40} width={75} />
        </div>
    </div>
  )
}

export default ProductCardSkeleton