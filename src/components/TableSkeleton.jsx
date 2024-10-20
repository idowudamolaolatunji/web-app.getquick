import React from 'react'
import Skeleton from 'react-loading-skeleton'

export function TableSkeleton() {
    return (
        <div style={{ minWidth: "90rem" }}>
            <Skeleton height={60} />
            <div className='table--grid' style={{ marginTop: "1rem" }}>
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
            </div>
            <div className='table--grid'>
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
                <Skeleton height={10} count={4} />
            </div>

            <div style={{ padding: "1rem 2rem 2rem", marginLeft: "auto", width: "54rem" }}>
                <Skeleton height={15} width={500} />
            </div>
        </div>
    )
}


export function TableHead() {
    return (
        <div className='table--head'>
            <div>
                <span className='flex'>
                    <Skeleton height={40} width={50} />
                    <Skeleton height={40} width={150} />
                </span>
                <Skeleton height={40} width={60} />
            </div>
        </div>
    )
}