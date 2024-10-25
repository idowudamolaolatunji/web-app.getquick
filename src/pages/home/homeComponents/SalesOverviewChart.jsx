import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { formatNumber } from '../../../utils/helper';
import { useWindowSize } from 'react-use';
import { useFetchedContext } from '../../../context/FetchedContext';

function OverviewChart() {
    const { width } = useWindowSize();
    const { orders } = useFetchedContext();

    // I DONNO HOW YOU'D DO IT BUT THIS STATE BELOW HERE SHOULD BE THE GUY HOLDING THE CHART DATA
    const isData = orders?.length > 0 ? true : false;
    

    const series = [
        {
            name: 'Total Sales',
            // data: [104500, 52700, 52200, 45500, 105350, 92500, 104100, 98300, 45600, null, null, null],
            data: [null, null, null, null, null, null, null, null, null, 0, 0, 0],
            color: '#ff7a49'
        },
        {
            name: 'Online Sales',
            // data: [94300, 41900, 8700, 41200, 95600, 9800, 52100, 5100, 3600, null, null, null],
            data: [null, null, null, null, null, null, null, null, null, 0, 0, 0],
            color: '#ffb59a'
        },
        {
            name: 'Offline Sales',
            // data: [9600, 8500, 41200, 4300, 9700, 82100, 43600, 92700, 41900, null, null, null],
            data: [null, null, null, null, null, null, null, null, null, 0, 0, 0],
            color: '#994020'
        }          
    ];


    const processChart = () => {
        const salesData = orders.reduce((acc, curr) => {
            const month = new Date(curr.orderDate).getMonth();
            const sales = curr.products.reduce((sum, product) => sum + product.amount, 0);
        
            if (curr.channel === 'online store') {
              acc[0].data[month] = (acc[0].data[month] || 0) + sales;
              acc[1].data[month] = (acc[1].data[month] || 0) + sales;
            } else {
              acc[2].data[month] = (acc[2].data[month] || 0) + sales;
            }
        
            acc[0].data[month] = (acc[0].data[month] || 0) + sales;
        
            return acc;
          }, [
            { name: 'Total Sales', data: new Array(12).fill(null), color: '#ff7a49' },
            { name: 'Online Sales', data: new Array(12).fill(null), color: '#ffb59a' },
            { name: 'Offline Sales', data: new Array(12).fill(null), color: '#994020' },
          ]);
        
          return salesData;
        
    };

    console.log(processChart())
    // const [series] = processChart()
      

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
                fontSize: '12px',
                fontFamily: 'Raleway, sans-serif',
                color: '#333',
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            y: {
                formatter: val => '₦' + formatNumber(val),
            },
        },
        legend: {
            show: true,
            position: 'bottom',
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
            categories: [ 'Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
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
        <div className='sales-overview'>
            <div id="chart" className='bar-chart'>
                <ReactApexChart options={options} series={series} type='bar' height={isData ? 320 : (width < 850) ? 270 : 300} />
            </div>
            <div id="html-dist"></div>
        </div>
    );

}

export default OverviewChart