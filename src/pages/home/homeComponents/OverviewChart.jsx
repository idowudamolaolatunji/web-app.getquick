import React from 'react'
import ReactApexChart from 'react-apexcharts';

function OverviewChart() {
  const series = [
    { name: 'Total Sales', data: [440, 550, 410, 64, 202, 403, 21, 0, 0, 0, 0, 0], color: '#655DBB' },
    { name: 'Online Sales', data: ['303', 302, 303, '520', 103, 44, 32, 0, 0, 0, 0, 0], color: '#BFACE2' },
    { name: 'Ofline Sales', data: [300, 103, 32, 120, 301, 140, 13, 0, 0, 0, 0, 0], color: '#A084DC' },
  ];

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
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
      shared: true,
      intersect: false,
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
      categories: ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  return (
    <>
      <div id="chart" style={{ marginLeft: '-1.4rem', marginTop: '2rem' }}>
        <ReactApexChart options={options} series={series} type='bar' height={360} />
      </div>
      <div id="html-dist"></div>
    </>
  );

}

export default OverviewChart