import React from 'react';
import './CurrentConditions.css';
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react';

function CurrentConditions({ conditions }) {
  return (
    <div className="current-conditions">
      <h2>Current Weather Conditions</h2>
      <div className="conditions-grid">
        <div className="condition-item">
          <Thermometer size={24} className="icon" />
          <div className="content">
            <label>Temperature</label>
            <value>{conditions.temperature}°C</value>
          </div>
        </div>

        <div className="condition-item">
          <Droplets size={24} className="icon" />
          <div className="content">
            <label>Humidity</label>
            <value>{conditions.humidity}%</value>
          </div>
        </div>

        <div className="condition-item">
          <Wind size={24} className="icon" />
          <div className="content">
            <label>Wind Speed</label>
            <value>{conditions.wind} km/h</value>
          </div>
        </div>

        <div className="condition-item">
          <Cloud size={24} className="icon" />
          <div className="content">
            <label>Rainfall</label>
            <value>{conditions.rainfall} mm</value>
          </div>
        </div>

        <div className="condition-item">
          <Thermometer size={24} className="icon heat-index" />
          <div className="content">
            <label>Heat Index (WBGT)</label>
            <value>{conditions.wbgt}°C</value>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentConditions;
