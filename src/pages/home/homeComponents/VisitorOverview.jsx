import React from 'react';
import ReactApexChart from 'react-apexcharts';

const series = [
    {
        name: 'Total Sales',
        data: [ 45, 56, 20, null, null, null],
        color: '#ECE5C7'
    },
];


const options = {
    chart: {
        type: 'bar',
        width: '100%',
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
        categories: [ 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        labels: {
            style: {
                fontSize: '11px',
                fontWeight: 500,
                fontFamily: 'inherit',
                colors: '#444',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: 'inherit',
                colors: '#444',
            },
        },
    }
};

function VisitorOverview() {
    return (
        <div className='card visitor-section'>
            <div className="section--heading" >
                <h2>Website Visitors</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>


            <>
                <div id="chart">
                    <ReactApexChart options={options} series={series} type='bar' height={360} />
                </div>
                <div id="html-dist"></div>
            </>
        </div>
    )
}

export default VisitorOverview