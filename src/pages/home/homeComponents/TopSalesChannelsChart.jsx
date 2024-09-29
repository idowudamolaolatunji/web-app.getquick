import React, { useState } from 'react'
// import ReactApexChart from 'react-apexcharts';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { useWindowSize } from 'react-use';
import { useDataContext } from '../../../context/DataContext';

function TopSalesChannelsChart() {
    const { isMenuCollapsed } = useDataContext()
    const { width } = useWindowSize();

    const isCollapsedBtw1000and1100 = !isMenuCollapsed && (width >= 1000 && width < 1100 );

    // const [series] = useState([44, 55, 41, 17, 15]);
    // const [options] = useState({
    //     chart: {
    //         type: 'donut',
    //         toolbar: {
    //             show: false,
    //         },
    //         font: {
    //             family: 'Raleway, sans-serif',
    //             size: '14px',
    //             color: '#333',
    //         },
    //     },
    //  // colors: ['#00DFA2', '#F8CBA6', '#A7B4F5', '#EB4747', '#D2C5F7'],
    //     colors: ['#ff7a49', '#F8CBA6', '#A7B4F5', '#EB4747', '#444444']
    //     responsive: [
    //         {
    //             breakpoint: 600,
    //             options: {
    //                 chart: {
    //                     height: 200
    //                 },
    //                 legend: {
    //                     position: 'right',
    //                 },
    //             },
    //         },
    //         {
    //             breakpoint: 480,
    //             options: {
    //                 chart: {
    //                     height: 250
    //                 },
    //             },
    //         },
    //         {
    //             breakpoint: 400,
    //             options: {
    //                 chart: {
    //                     height: 280
    //                 },
    //                 legend: {
    //                     position: 'bottom',
    //                 },
    //             },
    //         },
    //         {
    //             breakpoint: 340,
    //             options: {
    //                 chart: {
    //                     height: 310
    //                 },
    //             },
    //         },
    //     ],
    //     dataLabels: {
    //         enabled: true,
    //         style: {
    //             fontSize: '12px',
    //             fontFamily: 'Raleway, sans-serif',
    //         },
    //     },
    //     tooltip: {
    //         enabled: true,
    //         shared: true,
    //         followCursor: true,
    //         style: {
    //             fontSize: '13px',
    //             fontFamily: 'Raleway, sans-serif',
    //             color: '#333',
    //         },
    //     },
    //     legend: {
    //         show: true,
    //         position: 'bottom',
    //         horizontalAlign: 'center',
    //         offsetX: 0,
    //         offsetY: 10,

    //     },
    //     labels: ['Jiji', 'Online store', 'WhatsApp', 'Physical store', 'Others'],
    // });

    const data = [
        {
            label: 'Jiji',
            value: 44,
        },
        {
            label: 'Online store',
            value: 55,
        },
        {
            label: 'WhatsApp',
            value: 41,
        },
        {
            label: 'Physical store',
            value: 17,
        },
        {
            label: 'Others',
            value: 15,
        },
    ];

    return (

        <>
            {/* {width > 800 ? ( */}
                <div id="chart">
                    <PieChart
                        colors={['#ff7a49', '#F8CBA6', '#A7B4F5', '#EB4747', '#444444']}
                        slotProps={{
                            legend: { 
                                hidden: isCollapsedBtw1000and1100,
                            },
                        }}
                        series={[
                            {
                                data,
                                ...( width <= 500 && { arcLabel: (item) => `${item.value}` }),
                                highlightScope: { fade: 'global', highlight: 'item' },
                                donut: { innerRadius: 30 },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                ...( width > 1200 && {  cx: 80, cy: 80 }),
                                ...( isCollapsedBtw1000and1100 && {  cx: 100, cy: 80 }),
                                ...( width <= 380 && {  cx: 70, cy: 80 }),
                                innerRadius: 40,
                                paddingAngle: 2.5,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                              fontWeight: 'bold',
                              fontSize: '10px',
                              color: '#fff'
                            },
                        }}
                        height={160}
                    />
                </div>
            {/* ) : (
                <>
                    <div id="chart" className='dougnot-chart'>
                        <ReactApexChart options={options} series={series} type="donut" height={280} />
                    </div>
                    <div id="html-dist"></div>
                </>
            )} */}
        </>
    )

}

export default TopSalesChannelsChart