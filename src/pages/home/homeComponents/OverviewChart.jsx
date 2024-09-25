import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { useWindowSize } from 'react-use';

function OverviewChart() {
    const { width } = useWindowSize();

    const series = [
        { name: 'Total Sales', data: [600, 550, 410, 64, 202, 403, 21, 0, 0, 0, 0, 0], color: '#655DBB' },
        { name: 'Online Sales', data: ['303', 302, 303, '520', 103, 44, 32, 0, 0, 0, 0, 0], color: '#BFACE2' },
        { name: 'Offline Sales', data: [300, 103, 32, 120, 301, 140, 13, 0, 0, 0, 0, 0], color: '#A084DC' },
    ];

    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
            font: {
                family: 'Raleway, sans-serif',
                size: '20px',
                color: '#333',
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            enabled: true,
            shared: true,
            followCursor: true,
            intersect: false,
            style: {
                fontSize: '11px',
                fontFamily: 'Raleway, sans-serif',
                color: '#333',
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            // horizontalAlign: width < 600 ? 'center' : 'left',
            horizontalAlign: 'left',
            offsetX: 0,
            offsetY: 12,
        },
        grid: {
            borderColor: '#f1f1f1',
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    fontSize: '9.4px',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    colors: '#444',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    colors: '#444',
                },
                formatter: (val) => {
                    if (val >= 1000000) {
                        return '₦' + (val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1) + 'M';
                    } else if (val >= 1000) {
                        return '₦' + (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + 'k';
                    } else {
                        return '₦' + val.toFixed(0);
                    }
                },
            },
        }
    };

    return (
        <div className='overview--chart'>
            <div id="chart" className='business-overview'>
                <ReactApexChart options={options} series={series} type='bar' height={360} />
            </div>
            <div id="html-dist"></div>
        </div>
    );

}

export default OverviewChart