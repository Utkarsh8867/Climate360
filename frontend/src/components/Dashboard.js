import React from 'react';
import './Dashboard.css';
import RiskCard from './RiskCard';
import CurrentConditions from './CurrentConditions';
import { RotateCcw } from 'lucide-react';

function Dashboard({ data, onReset }) {
  const [isDispatching, setIsDispatching] = React.useState(false);
  const [dispatchSuccess, setDispatchSuccess] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW':
        return 'low';
      case 'MODERATE':
        return 'moderate';
      case 'HIGH':
        return 'high';
      case 'EXTREME':
        return 'extreme';
      case 'CRITICAL':
        return 'extreme';
      default:
        return 'low';
    }
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchSuccess(true);
      setTimeout(() => setDispatchSuccess(false), 5000);
    }, 1500);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Intelligence Report successfully generated and downloaded!');
    }, 1200);
  };

  return (
    <div className="w-full bg-surface pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-8 sm:p-12">
            <h2 className="font-headline-lg text-headline-lg font-bold mb-2">Risk Assessment Results</h2>
            <p className="font-body-lg text-body-lg text-on-primary/80">
              Analysis based on your provided climate metrics
            </p>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Action Bar & Threat Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-low p-6 rounded-2xl">
              <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="font-headline-md text-on-surface font-bold mb-1">Command Center</h3>
                  <p className="font-body-sm text-on-surface-variant mb-4">Target: {data.persona === 'General' ? 'Juja Community' : data.persona + 's in Juja'} (342 registered nodes)</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={handleDispatch}
                      disabled={isDispatching || dispatchSuccess}
                      className={`px-5 py-2.5 rounded-xl font-label-md transition-all flex items-center gap-2 ${dispatchSuccess ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {dispatchSuccess ? 'check_circle' : (isDispatching ? 'sync' : 'cell_tower')}
                      </span>
                      {dispatchSuccess ? 'Alerts Dispatched Successfully' : (isDispatching ? 'Transmitting...' : 'Dispatch Emergency SMS')}
                    </button>
                    
                    <button 
                      onClick={handleExport}
                      disabled={isExporting}
                      className="px-5 py-2.5 rounded-xl font-label-md bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isExporting ? 'sync' : 'sim_card_download'}
                      </span>
                      {isExporting ? 'Generating...' : 'Export County Report (PDF)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Geospatial Radar Simulator */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                <div className="relative w-32 h-32 bg-surface-container-highest rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center">
                  {/* Radar grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(31,16,142,0.2)_50%,transparent_51%),linear-gradient(90deg,transparent_49%,rgba(31,16,142,0.2)_50%,transparent_51%)] bg-[length:20px_20px]"></div>
                  {/* Radar sweep */}
                  <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] origin-top-left bg-gradient-to-br from-primary/40 to-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                  {/* Blip */}
                  <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-error rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-error rounded-full shadow-[0_0_8px_rgba(186,26,26,1)]"></div>
                  {/* Center Dot */}
                  <div className="z-10 w-2 h-2 bg-primary rounded-full"></div>
                  {/* Overlay text */}
                  <div className="absolute bottom-2 font-label-sm text-[9px] font-bold text-primary bg-surface-container-lowest/80 px-2 rounded-full">Conduit #08: ONLINE</div>
                </div>
              </div>
            </div>

            {/* Quick Summary */}
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Risk Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className={`p-6 rounded-2xl flex flex-col gap-2 ${getRiskColor(data.heat.risk_level) === 'extreme' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low text-on-surface'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <h4 className="font-headline-sm font-bold">Heat Risk</h4>
                  </div>
                  <p className="font-label-lg font-bold uppercase tracking-wider">{data.heat.risk_level}</p>
                </div>

                <div className={`p-6 rounded-2xl flex flex-col gap-2 ${getRiskColor(data.water.stress_level) === 'extreme' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low text-on-surface'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💧</span>
                    <h4 className="font-headline-sm font-bold">Water Stress</h4>
                  </div>
                  <p className="font-label-lg font-bold uppercase tracking-wider">{data.water.stress_level}</p>
                </div>

                <div className={`p-6 rounded-2xl flex flex-col gap-2 ${getRiskColor(data.rain.risk_level) === 'extreme' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low text-on-surface'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌧️</span>
                    <h4 className="font-headline-sm font-bold">Rain Risk</h4>
                  </div>
                  <p className="font-label-lg font-bold uppercase tracking-wider">{data.rain.risk_level}</p>
                </div>
              </div>
            </div>

            {/* Current Conditions Component Area */}
            <div className="rounded-2xl bg-surface-container-low p-6">
               <CurrentConditions conditions={data.current_conditions} />
            </div>

            {/* Risk Cards */}
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assessment</span>
                Detailed Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RiskCard
                  title="Heat Risk Assessment"
                  emoji="🔥"
                  riskLevel={data.heat.risk_level}
                  explanation={data.heat.explanation}
                  details={data.heat.details}
                />

                <RiskCard
                  title="Water Intelligence"
                  emoji="💧"
                  riskLevel={data.water.stress_level}
                  explanation={data.water.explanation}
                  details={{
                    ...data.water.details,
                    harvesting_potential: data.water.harvesting_potential
                  }}
                  isWater={true}
                />

                <RiskCard
                  title="Extreme Rain Alert"
                  emoji="🌧️"
                  riskLevel={data.rain.risk_level}
                  explanation={data.rain.explanation}
                  details={data.rain.details}
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-6 border-t border-surface-container">
              <button 
                onClick={onReset}
                className="w-full px-6 py-4 rounded-xl font-label-lg text-label-lg text-secondary bg-surface-container-low hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Enter New Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
