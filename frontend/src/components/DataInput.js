import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function DataInput({ onSubmit }) {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    persona: 'General',
    temperature: 28,
    humidity: 65,
    wind: 5,
    rainfall: 0,
    wbgt: '',
    solarRadiation: 0,
    uvRadiation: 5,
    soilMoisture: 40,
    recentRainfall: 15,
    historicalAvgRainfall: 20,
    currentStorage: 1000,
    historicalBaselineRain: 10,
    rainfallIntensity: 5,
  });

  const [activeTab, setActiveTab] = useState('current');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'persona' || value === '') ? value : parseFloat(value)
    }));
  };

  const handleAutoFetch = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/climate/latest`);
      const { data } = response.data;
      
      setFormData(prev => ({
        ...prev,
        temperature: data.temperature ?? prev.temperature,
        humidity: data.humidity ?? prev.humidity,
        wind: data.wind ?? prev.wind,
        rainfall: data.rainfall ?? prev.rainfall,
        solarRadiation: data.solar_radiation ?? prev.solarRadiation,
        uvRadiation: data.uv_radiation ?? prev.uvRadiation,
        soilMoisture: data.soil_moisture ?? prev.soilMoisture,
        recentRainfall: data.recent_rainfall ?? prev.recentRainfall,
        historicalAvgRainfall: data.historical_avg_rainfall ?? prev.historicalAvgRainfall,
        historicalBaselineRain: data.historical_baseline_rain ?? prev.historicalBaselineRain,
        rainfallIntensity: data.rainfall_intensity ?? prev.rainfallIntensity,
      }));
      
      // Flash success (you could use a real toast notification here)
      alert(response.data.is_mock ? 
        "Connected via simulated Conduit Node (API Key missing). Telemetry updated!" : 
        "Live data successfully fetched from JKUAT Conduit!");
    } catch (error) {
      console.error("Error fetching conduit data", error);
      alert("Failed to connect to JKUAT Conduit. Please check your connection.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full bg-surface pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-8 sm:p-12">
            <h2 className="font-headline-lg text-headline-lg font-bold mb-2">Climate Data Input</h2>
            <p className="font-body-lg text-body-lg text-on-primary/80">
              Enter your local weather measurements to analyze climate risks
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-surface-container">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 px-6 py-4 font-label-lg text-label-lg transition-colors border-b-2 ${
                activeTab === 'current'
                  ? 'text-primary border-primary bg-surface-container-low'
                  : 'text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mr-2 align-middle">thermostat</span>
              Current Conditions
            </button>
            <button
              onClick={() => setActiveTab('historical')}
              className={`flex-1 px-6 py-4 font-label-lg text-label-lg transition-colors border-b-2 ${
                activeTab === 'historical'
                  ? 'text-primary border-primary bg-surface-container-low'
                  : 'text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mr-2 align-middle">history</span>
              Historical Data
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-8">
            {activeTab === 'current' && (
              <div className="space-y-8">
                
                {/* Persona Selection */}
                <div className="mb-6 pb-6 border-b border-surface-container">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Who is this analysis for?
                  </h3>
                  <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                    Select your role to receive tailored AI recommendations
                  </label>
                  <select
                    name="persona"
                    value={formData.persona}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer appearance-none"
                  >
                    <option value="General">General Community Member</option>
                    <option value="Farmer">Farmer / Agriculturist</option>
                    <option value="Teacher">School / Educator</option>
                    <option value="Local Official">Local Government Official</option>
                  </select>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">cloud</span>
                      Current Weather Conditions
                    </h3>
                    <button
                      type="button"
                      onClick={handleAutoFetch}
                      disabled={isFetching}
                      className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isFetching ? 'sync' : 'satellite_alt'}
                      </span>
                      {isFetching ? 'Fetching...' : 'Fetch from JKUAT Conduit'}
                    </button>
                  </div>

                  {/* Temperature */}
                  <div className="mb-6">
                    <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                      <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">thermostat</span>
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      step="0.1"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Enter temperature"
                    />
                  </div>

                  {/* Humidity and Wind */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">opacity</span>
                        Humidity (%)
                      </label>
                      <input
                        type="number"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="0-100"
                      />
                    </div>

                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">air</span>
                        Wind Speed (km/h)
                      </label>
                      <input
                        type="number"
                        name="wind"
                        value={formData.wind}
                        onChange={handleChange}
                        step="0.1"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter wind speed"
                      />
                    </div>
                  </div>

                  {/* Rainfall and Solar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">water_drop</span>
                        Current Rainfall (mm)
                      </label>
                      <input
                        type="number"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter rainfall"
                      />
                    </div>

                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">sunny</span>
                        Solar Radiation (W/m²)
                      </label>
                      <input
                        type="number"
                        name="solarRadiation"
                        value={formData.solarRadiation}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter solar radiation"
                      />
                    </div>
                  </div>

                  {/* Hackathon Additions: Soil Moisture and UV */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">grass</span>
                        Soil Moisture (%)
                      </label>
                      <input
                        type="number"
                        name="soilMoisture"
                        value={formData.soilMoisture}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="0-100"
                      />
                    </div>

                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">light_mode</span>
                        UV Radiation (Index)
                      </label>
                      <input
                        type="number"
                        name="uvRadiation"
                        value={formData.uvRadiation}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>

                  {/* WBGT and Rainfall Intensity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        WBGT Index (°C) - Optional
                      </label>
                      <input
                        type="number"
                        name="wbgt"
                        value={formData.wbgt}
                        onChange={handleChange}
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Leave empty for auto-calculation"
                      />
                    </div>

                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">cloudy</span>
                        Rainfall Intensity (mm/h)
                      </label>
                      <input
                        type="number"
                        name="rainfallIntensity"
                        value={formData.rainfallIntensity}
                        onChange={handleChange}
                        step="0.1"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter intensity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'historical' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Historical & Storage Data
                  </h3>

                  {/* Recent Rainfall */}
                  <div className="mb-6">
                    <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                      <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">water_drop</span>
                      Recent Rainfall (mm)
                    </label>
                    <input
                      type="number"
                      name="recentRainfall"
                      value={formData.recentRainfall}
                      onChange={handleChange}
                      step="0.1"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Enter recent rainfall"
                    />
                  </div>

                  {/* Historical Avg and Baseline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        Historical Avg Rainfall (mm)
                      </label>
                      <input
                        type="number"
                        name="historicalAvgRainfall"
                        value={formData.historicalAvgRainfall}
                        onChange={handleChange}
                        step="0.1"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter historical average"
                      />
                    </div>

                    <div>
                      <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                        Historical Baseline Rain (mm/h)
                      </label>
                      <input
                        type="number"
                        name="historicalBaselineRain"
                        value={formData.historicalBaselineRain}
                        onChange={handleChange}
                        step="0.1"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter baseline"
                      />
                    </div>
                  </div>

                  {/* Water Storage */}
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface mb-2">
                      <span className="material-symbols-outlined text-[18px] align-text-bottom mr-1">storage</span>
                      Current Water Storage (liters)
                    </label>
                    <input
                      type="number"
                      name="currentStorage"
                      value={formData.currentStorage}
                      onChange={handleChange}
                      step="1"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Enter storage amount"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-surface-container">
              <button
                type="submit"
                className="w-full px-6 py-4 rounded-xl font-label-lg text-label-lg text-on-primary bg-gradient-to-r from-primary to-primary-container hover:shadow-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">insights</span>
                Analyze Climate Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataInput;
