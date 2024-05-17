// src/components/BarChartComponent.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const BarChartComponent = ({ data, selectedTerritory, dataKey, title }) => {
  const selectedData = data.find(d => d.Territory === selectedTerritory);

  return (
    <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
      <h3>{title}</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Territory" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={selectedData[`Average${dataKey}`]} label="Avg" stroke="red" />
          {selectedData && (
            <>
            <Bar dataKey={dataKey} data={[selectedData]} fill="#82ca9d" />
          
          <Bar dataKey="average" data={[{ average: selectedData[`Average${dataKey}`]}]} fill="#8884d8" />
          </>
          )}

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
