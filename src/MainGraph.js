// src/MainGraph.js

import React, { useState, useRef } from 'react';
import { Bubble } from 'react-chartjs-2';
import PieChart from './PieChart';
import CircularPlot from './CircularPlot';
import { Chart, registerables } from 'chart.js';
import './MainGraph.css';
import { Grid } from '@mui/material';

Chart.register(...registerables);

const bubbleData = {
    datasets: [
        {
            label: 'Typical Customers',
            data: [{"Avg_CartPrice_by_Customer_bin":"0-6000","cnt_orders_bin":"51-100",r:3/10,"num_key_accounts":1,x:88.0,y:5823.84},{"Avg_CartPrice_by_Customer_bin":"0-6000","cnt_orders_bin":"101-150",r:1/10,"num_key_accounts":0,x:105.0,y:5861.48},{"Avg_CartPrice_by_Customer_bin":"12001-15000","cnt_orders_bin":"51-100",r:37/10,"num_key_accounts":10,x:94.0,y:13083.96},{"Avg_CartPrice_by_Customer_bin":"12001-15000","cnt_orders_bin":"101-150",r:94/10,"num_key_accounts":29,x:108.5,y:13265.36},{"Avg_CartPrice_by_Customer_bin":"15001-18000","cnt_orders_bin":"51-100",r:13/10,"num_key_accounts":9,x:94.0,y:15936.77},{"Avg_CartPrice_by_Customer_bin":"15001-18000","cnt_orders_bin":"101-150",r:19/10,"num_key_accounts":5,x:107.0,y:15622.23},{"Avg_CartPrice_by_Customer_bin":"18000","cnt_orders_bin":"51-100",r:4,"num_key_accounts":0,x:90.0,y:19500.815},{"Avg_CartPrice_by_Customer_bin":"18000","cnt_orders_bin":"101-150",r:2/10,"num_key_accounts":0,x:118.5,y:18585.475},{"Avg_CartPrice_by_Customer_bin":"6001-9000","cnt_orders_bin":"51-100",r:182/10,"num_key_accounts":76,x:94.5,y:8649.115},{"Avg_CartPrice_by_Customer_bin":"6001-9000","cnt_orders_bin":"101-150",r:451/10,"num_key_accounts":159,x:109.0,y:8689.03},{"Avg_CartPrice_by_Customer_bin":"9001-12000","cnt_orders_bin":"51-100",r:462/10,"num_key_accounts":148,x:94.0,y:9578.205},{"Avg_CartPrice_by_Customer_bin":"9001-12000","cnt_orders_bin":"101-150",r:1229/10,"num_key_accounts":396,x:110.0,y:9580.54}],
            backgroundColor: 'rgba(0, 0, 255, 0.6)'
        },
       
    ]
};

const bubbleOptions = {
    scales: {
        x: {
            title: {
                display: true,
                text: 'Number of Products'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Average Cart Price (in euro)'
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    const label = context.dataset.label || '';
                    const data = context.raw;
                    return `${label}: (${data.x}, ${data.y}), ${data.r} customers`;
                }
            }
        }
    }
};

function MainGraph() {
    const [selectedType, setSelectedType] = useState(null);
    const chartRef = useRef(null);

    const mockData = {
        A: {
            labels: ['Key-Account', 'Non-Key-Account'],
            datasets: [
                {
                    data: [60, 40],
                    backgroundColor: ['#FF6384', '#36A2EB']
                }
            ]
        },
        B: {
            labels: ['Type B1', 'Type B2', 'Type B3', 'Type B4', 'Type B5'],
            datasets: [
                {
                    data: [70, 30, 20, 10, 5],
                    backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0', '#9966FF']
                }
            ]
        }
    };

    const onClick = (event) => {
        const elements = chartRef.current.getElementsAtEventForMode(
            event,
            'nearest',
            { intersect: true },
            false
        );

        if (elements.length > 0) {
            const { datasetIndex, index } = elements[0];
            const clickedData = bubbleData.datasets[datasetIndex].data[index];
            setSelectedType(clickedData.type);
        } else {
            setSelectedType(null);
        }
    };

    return (
     <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
                <h2>Top 3 Typical Customers</h2>
                <Bubble
                    ref={chartRef}
                    data={bubbleData}
                    options={bubbleOptions}
                    onClick={onClick}
                />
            </Grid>
            <Grid item xs={6} md={2}>
                    {selectedType && (
                        <>
                            <PieChart title={"Typical Customers"} data={mockData["B"]} />
                            <PieChart title={"Key Accounts"} data={mockData["A"]} />
                            <CircularPlot />
                        </>
                    )}
            </Grid>

        </Grid>);
}

export default MainGraph;
