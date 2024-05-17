// src/components/OrdersHeatmap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Tooltip, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';
import territoryCoordinates from '../territoryCoordinates';
import groupedData from '../data/enhanced_grouped_orders_with_averages.json'; // Import the JSON data

const HeatLayer = ({ heatmapData }) => {
  const map = useMap();

  useEffect(() => {
    if (heatmapData.length > 0) {
      L.heatLayer(heatmapData, {
        radius: 25,
        gradient: {
          0.2: 'blue',
          0.4: 'cyan',
          0.6: 'lime',
          0.8: 'yellow',
          1.0: 'red'
        }
      }).addTo(map);
    }
  }, [heatmapData, map]);

  return null;
};

const OrdersHeatmap = ({ onSelectTerritory, showLabels }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);

  useEffect(() => {
    const heatData = groupedData.map(region => {
      const coords = territoryCoordinates[region.Territory];
      if (coords) {
        return [...coords, region.CartPriceInCP / 100000]; // Normalize the CartPriceInCP value for better visualization
      }
      console.warn(`No coordinates found for territory: ${region.Territory}`);
      return null;
    }).filter(item => item !== null);
    
    setHeatmapData(heatData);

    const tooltipData = groupedData.map(region => {
      const coords = territoryCoordinates[region.Territory];
      if (coords) {
        return {
          coords,
          CartPriceInCP: region.CartPriceInCP,
          Territory: region.Territory,
          TotalOrders: region.TotalOrders,
          UniqueProducts: region.UniqueProducts,
          AverageCartPriceInCP: region.AverageCartPriceInCP,
          AverageTotalOrders: region.AverageTotalOrders
        };
      }
      return null;
    }).filter(item => item !== null);

    setTooltipData(tooltipData);
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatLayer heatmapData={heatmapData} />
      {tooltipData.map((data, index) => (
        <CircleMarker
          key={index}
          center={data.coords}
          radius={10}
          fillOpacity={0}
          stroke={false}
          eventHandlers={{
            click: () => {
              onSelectTerritory(data);
            }
          }}
        >
          {showLabels && (
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              <span>{data.Territory}: {data.CartPriceInCP.toLocaleString()} CP</span>
            </Tooltip>
          )}
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default OrdersHeatmap;
