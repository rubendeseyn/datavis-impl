// src/PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);



function PieChart({ title, data }) {
    //const data = mockData[type] || mockData['A'];

    return (
        <div>
            <h2>{title}</h2>
            <Pie data={data} />
        </div>
    );
}

export default PieChart;
