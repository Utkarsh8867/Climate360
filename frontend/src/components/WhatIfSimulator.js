import React, { useState } from 'react';
import axios from 'axios';
import { Sliders, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function WhatIfSimulator({ currentData, onSimulationComplete }) {
  const [params, setParams] = useState({
    temperature: currentData.current_conditions.temperature,
    rainfall: currentData.current_conditions.rainfall,
    soil_moisture: currentData.current_conditions.soil_moisture || 40,
    humidity: currentData.current_conditions.humidity
  });
  
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSliderChange = (e, field) => {
    setParams({
      ...params,
      [field]: parseFloat(e.target.value)
    });
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const requestParams = {
        persona: currentData.persona || 'General',
        temperature: params.temperature,
        humidity: params.humidity,
        wind: currentData.current_conditions.wind, // Keep original
        rainfall: params.rainfall,
        solar_radiation: currentData.current_conditions.uv_radiation * 100 || 800,
        uv_radiation: currentData.current_conditions.uv_radiation,
        soil_moisture: params.soil_moisture,
        recent_rainfall: params.rainfall,
        historical_avg_rainfall: 15.0, // Mock baseline
        current_storage: 50, // Mock
        historical_baseline_rain: 8.0,
        rainfall_intensity: params.rainfall > 20 ? 5 : 0
      };

      const response = await axios.post(
        `${API_BASE_URL}/climate/dashboard`,
        {},
        { params: requestParams }
      );
      
      onSimulationComplete(response.data);
    } catch (err) {
      console.error('Simulation failed', err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-primary/20 shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="text-primary" size={24} />
        <h3 className="font-headline-sm text-lg font-bold text-on-surface">"What-If" Scenario Simulator</h3>
      </div>
      
      <p className="text-sm font-body-sm text-on-surface-variant mb-6">
        Adjust environmental parameters to simulate how risks and recommended actions might change. Useful for planning contingencies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Temp Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-error">device_thermostat</span>
              Temperature
            </label>
            <span className="font-mono font-bold text-primary bg-primary-container text-on-primary-container px-2 py-0.5 rounded">{params.temperature.toFixed(1)}°C</span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="45" 
            step="0.5" 
            value={params.temperature} 
            onChange={(e) => handleSliderChange(e, 'temperature')}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>15°C</span>
            <span>45°C</span>
          </div>
        </div>

        {/* Rain Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">rainy</span>
              Rainfall
            </label>
            <span className="font-mono font-bold text-primary bg-primary-container text-on-primary-container px-2 py-0.5 rounded">{params.rainfall.toFixed(1)} mm</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="150" 
            step="1" 
            value={params.rainfall} 
            onChange={(e) => handleSliderChange(e, 'rainfall')}
            className="w-full accent-secondary"
          />
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>0 mm</span>
            <span>150 mm</span>
          </div>
        </div>

        {/* Soil Moisture Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">grass</span>
              Soil Moisture
            </label>
            <span className="font-mono font-bold text-primary bg-primary-container text-on-primary-container px-2 py-0.5 rounded">{params.soil_moisture.toFixed(1)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={params.soil_moisture} 
            onChange={(e) => handleSliderChange(e, 'soil_moisture')}
            className="w-full accent-tertiary"
          />
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>0% (Dry)</span>
            <span>100% (Saturated)</span>
          </div>
        </div>
        
        {/* Humidity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">water_drop</span>
              Humidity
            </label>
            <span className="font-mono font-bold text-primary bg-primary-container text-on-primary-container px-2 py-0.5 rounded">{params.humidity.toFixed(1)}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            step="1" 
            value={params.humidity} 
            onChange={(e) => handleSliderChange(e, 'humidity')}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-surface-container">
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="animate-spin" size={18} />
              Simulating AI Impact...
            </>
          ) : (
            <>
              <AlertTriangle size={18} />
              Run Scenario
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default WhatIfSimulator;
