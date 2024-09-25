import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


function SalesChart() {
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
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px',
                fontFamily: 'Raleway, sans-serif',
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 10,
        },
        labels: ['Jiji', 'Market', 'Social Media', 'Referrals', 'Others'],
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="donut" />
            </div>
            <div id="html-dist"></div>
        </div>
    );

}

export default SalesChart