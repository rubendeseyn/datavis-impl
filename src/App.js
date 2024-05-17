// src/App.js
import React, { useState } from 'react';
import OrdersHeatmap from './components/OrdersHeatmap';
import BarChartComponent from './components/BarChartComponent';
import 'leaflet/dist/leaflet.css';
import groupedData from './data/enhanced_grouped_orders_with_averages.json'; // Import the enhanced JSON data

function App() {
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  const handleSelectTerritory = (data) => {
    setSelectedTerritory(data.Territory);
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  return (
    <div className="App">
      <h1>Geographical Heatmap of Orders</h1>
      <label>
        <input
          type="checkbox"
          checked={showLabels}
          onChange={toggleLabels}
        />
        Show Labels
      </label>
      <OrdersHeatmap onSelectTerritory={handleSelectTerritory} showLabels={showLabels} />
      {selectedTerritory && (
        <div className="info-box">
          <h2>Details for {selectedTerritory}</h2>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <BarChartComponent
                data={groupedData}
                selectedTerritory={selectedTerritory}
                dataKey="CartPriceInCP"
                title="Cart Price in CP Comparison"
              />
            </div>
            <div style={{ width: '50%' }}>
              <BarChartComponent
                data={groupedData}
                selectedTerritory={selectedTerritory}
                dataKey="TotalOrders"
                title="Total Orders Comparison"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
