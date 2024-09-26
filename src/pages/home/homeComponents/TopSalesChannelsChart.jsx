import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function TopSalesChannelsChart() {
    const [series] = useState([44, 55, 41, 17, 15]);
    const [options] = useState({
        chart: {
            type: 'donut',
            toolbar: {
                show: false,
            },
            font: {
                family: 'Raleway, sans-serif',
                size: '14px',
                color: '#333',
            },
        },
        colors: ['#C5C3F7', '#8E87CE', '#A7B4F5', '#D2C5F7', '#786FA3'],
        responsive: [
            // {
            //     breakpoint: 600,
            //     options: {
            //         chart: {
            //             height: 200
            //         },
            //         legend: {
            //             position: 'right',
            //         },
            //     },
            // },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 250
                    },
                },
            },
            {
                breakpoint: 400,
                options: {
                    chart: {
                        height: 260
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 340,
                options: {
                    chart: {
                        height: 290
                    },
                },
            },
        ],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontFamily: 'Raleway, sans-serif',
            },
        },
        tooltip: {
            enabled: true,
            shared: true,
            followCursor: true,
            style: {
                fontSize: '13px',
                fontFamily: 'Raleway, sans-serif',
                color: '#333',
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 10,
            
        },
        labels: ['Jiji', 'Online store', 'WhatsApp', 'Physical store', 'Others'],
    });

    return (
        <>
            <div id="chart" className='channel-chart'>
                <ReactApexChart options={options} series={series} type="donut" height={280}  />
            </div>
            <div id="html-dist"></div>
        </>
    );

}

export default TopSalesChannelsChart