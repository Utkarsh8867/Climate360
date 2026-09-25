import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataInput from './components/DataInput';
import Loading from './components/Loading';
import Error from './components/Error';
import LandingPageNew from './pages/LandingPageNew';
import About from './components/sections/About';
import FloatingAICopilot from './components/FloatingAICopilot';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'dashboard', 'about'

  const handleSubmitData = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        persona: formData.persona,
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        wind: parseFloat(formData.wind),
        rainfall: parseFloat(formData.rainfall),
        solar_radiation: parseFloat(formData.solarRadiation || 0),
        uv_radiation: parseFloat(formData.uvRadiation || 0),
        soil_moisture: parseFloat(formData.soilMoisture || 0),
        recent_rainfall: parseFloat(formData.recentRainfall),
        historical_avg_rainfall: parseFloat(formData.historicalAvgRainfall),
        current_storage: parseFloat(formData.currentStorage || 0),
        historical_baseline_rain: parseFloat(formData.historicalBaselineRain),
        rainfall_intensity: parseFloat(formData.rainfallIntensity)
      };
      
      // Only add wbgt if provided
      if (formData.wbgt) {
        params.wbgt = parseFloat(formData.wbgt);
      }

      const response = await axios.post(
        `${API_BASE_URL}/climate/dashboard`,
        {},
        { params }
      );

      setDashboardData(response.data);
      setShowInput(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch climate data. Please check your API keys.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDashboardData(null);
    setShowInput(true);
    setError(null);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Landing page view
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPageNew onNavigate={navigateTo} />
        <FloatingAICopilot dashboardData={dashboardData} />
      </>
    );
  }

  // About page view
  if (currentPage === 'about') {
    return (
      <>
        <div className="app">
          <Header onNavigate={navigateTo} currentPage={currentPage} />
          <About />
        </div>
        <FloatingAICopilot dashboardData={dashboardData} />
      </>
    );
  }

  // Dashboard view
  return (
    <>
      <div className="app">
        <Header onNavigate={navigateTo} currentPage={currentPage} />
        
        {error && <Error message={error} />}
        
        {loading && <Loading />}
        
        {showInput && !loading && (
          <DataInput onSubmit={handleSubmitData} />
        )}
        
        {dashboardData && !loading && (
          <Dashboard data={dashboardData} onReset={handleReset} />
        )}
      </div>
      <FloatingAICopilot dashboardData={dashboardData} />
    </>
  );
}

export default App;
