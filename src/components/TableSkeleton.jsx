import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useWindowSize } from 'react-use'

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


export function TableHeadSkeleton({ title }) {
    const { width } = useWindowSize();

    return (
        <>
            {(title == "delivery" || title == "transaction") ? (
                <div className='table--head'>
                    <div className='content'>
                        <Skeleton height={40} width={50} />
                    </div>
                </div>
            ) : (
                <div className='table--head'>
                    <div className='content'>
                        <span className='flex'>
                            <Skeleton height={40} width={50} />
                            <div style={{ width: "100%" }}>
                                <Skeleton height={40} width={width > 580 && 150} />
                            </div>
                        </span>

                        <span className='flex' style={{ justifyContent: "space-between" }}>
                            <span className='flex'>
                                <Skeleton height={40} width={100} />
                                <Skeleton height={40} width={60} />
                            </span>
                            {title == "product" && (
                                <Skeleton height={40} width={60} />
                            )}
                        </span>
                    </div>
                </div>
            )}




        </>
    )
}