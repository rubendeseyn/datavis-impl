// src/CircularPlot.js

import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const salesData = [
    { hour: 0, sales: 10 },
    { hour: 1, sales: 20 },
    { hour: 2, sales: 15 },
    { hour: 3, sales: 5 },
    { hour: 4, sales: 8 },
    { hour: 5, sales: 18 },
    { hour: 6, sales: 25 },
    { hour: 7, sales: 35 },
    { hour: 8, sales: 30 },
    { hour: 9, sales: 20 },
    { hour: 10, sales: 10 },
    { hour: 11, sales: 40 },
    { hour: 12, sales: 45 },
    { hour: 13, sales: 35 },
    { hour: 14, sales: 20 },
    { hour: 15, sales: 15 },
    { hour: 16, sales: 10 },
    { hour: 17, sales: 5 },
    { hour: 18, sales: 20 },
    { hour: 19, sales: 30 },
    { hour: 20, sales: 25 },
    { hour: 21, sales: 20 },
    { hour: 22, sales: 15 },
    { hour: 23, sales: 10 }
];

const labels = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

const chartData = {
    labels: labels,
    datasets: [
        {
            label: 'Sales Volume',
            data: salesData.map((d) => d.sales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }
    ]
};

const options = {
    scales: {
        r: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: Math.max(...salesData.map((d) => d.sales)) + 10,
                stepSize: 10,
                color: '#000',
            },
            pointLabels: {
                display: true,
                font: {
                    size: 14
                },
                callback: function (label, index) {
                    if (index % 3 === 0) {
                        return labels[index];
                    }
                    return '';
                }
            }
        }
    }
};

function CircularPlot() {
    return (
        <div>
            <h2>Sales Volume by Hour of the Day</h2>
            <PolarArea data={chartData} options={options} />
        </div>
    );
}

export default CircularPlot;
