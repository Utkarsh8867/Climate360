import React, { useState } from 'react';
import Header from '../components/Header';
import modernEnvIoT from '../modern_environmental_iot_weather_monitoring_station_in_an_african_agricultural.png';
import stunningAerial from '../stunning_aerial_landscape_of_modern_smart_agriculture_fields_solar_weather.png';

function LandingPageNew({ onNavigate }) {
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'user',
      text: 'Can outdoor sports continue at JKUAT Primary this afternoon?'
    },
    {
      type: 'assistant',
      text: 'ADVISORY: OUTDOOR ACTIVITY UNSAFE\n\nCurrent WBGT is 32.8°C with 780 W/m² solar irradiance. The Risk Engine recommends shifting sports activities indoors or rescheduling past 16:30 to avoid heat exhaustion in children.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const fillPrompt = (text) => {
    setChatInput(text);
  };

  const submitPrompt = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      text: chatInput
    }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'assistant',
        text: 'Based on current telemetry analysis from JKUAT Conduit@Empathy sensors, field conditions indicate optimal harvesting window. Soil saturation at 64% capacity. Proceed with caution.'
      }]);
    }, 600);
  };

  return (
    <div className="w-full bg-surface">
      {/* HEADER */}
      <Header onNavigate={onNavigate} currentPage="landing" />

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          
          {/* HERO SECTION */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-b from-primary-fixed/40 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"></div>

            <section className="max-w-[1280px] mx-auto px-margin pt-10 sm:pt-16 pb-16 w-full">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
                {/* Live Node Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-container"></span>
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-semibold tracking-wide">
                    Powered by real environmental observations from <strong className="text-primary font-bold">JKUAT Conduit@Empathy</strong>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-label-sm bg-tertiary-fixed/30 text-on-tertiary-fixed-variant">
                    Live Stream
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-headline-display text-4xl sm:text-5xl lg:text-headline-display tracking-tight text-on-surface font-bold">
                  From Climate Data to <span className="bg-gradient-to-r from-primary via-secondary to-primary-container bg-clip-text text-transparent">Climate Action</span>
                </h1>

                {/* Subheadline */}
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  Climate360 transforms raw IoT environmental sensors into clear climate risks, predictive modeling, and immediate actionable guidance for farmers, schools, communities, and local decision-makers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <a href="#risk-engines" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-label-lg text-label-lg text-on-primary bg-gradient-to-r from-primary-container to-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <span>Explore Climate Intelligence</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                  <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-label-lg text-label-lg text-secondary bg-surface-container-lowest shadow-sm hover:bg-surface-container-low transition-all">
                    <span className="material-symbols-outlined text-[18px]">sensors</span>
                    <span>View Architecture</span>
                  </a>
                  <a href="#ai-assistant" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-label-lg text-label-lg text-on-tertiary-fixed-variant bg-tertiary-fixed/40 hover:bg-tertiary-fixed/60 shadow-sm transition-all">
                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                    <span>Ask AI Copilot</span>
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="mt-14 relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest">
                <div className="relative w-full aspect-[16/9] max-h-[580px] overflow-hidden">
                  <img
                    alt="Smart agriculture fields with climate monitoring"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    src={stunningAerial}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent"></div>
                </div>

                {/* Floating Telemetry Pills */}
                <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* WBGT Pill */}
                    <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md">
                      <span className="material-symbols-outlined text-error text-[18px]">thermostat</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">WBGT Index</span>
                        <span className="font-headline-sm text-sm font-bold text-on-surface">38.2°C <span className="font-normal text-error text-xs font-label-md">High Heat</span></span>
                      </div>
                    </div>

                    {/* Precipitation Pill */}
                    <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md">
                      <span className="material-symbols-outlined text-secondary text-[18px]">water_drop</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Precipitation</span>
                        <span className="font-headline-sm text-sm font-bold text-on-surface">12.4 mm <span className="font-normal text-secondary text-xs font-label-md">Past 6h</span></span>
                      </div>
                    </div>

                    {/* Humidity Pill */}
                    <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md">
                      <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-[18px]">air</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Relative Humidity</span>
                        <span className="font-headline-sm text-sm font-bold text-on-surface">72% <span className="font-normal text-on-tertiary-fixed-variant text-xs font-label-md">Saturated</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Node Status */}
                  <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed"></span>
                    </span>
                    <span className="font-label-md text-label-md font-semibold">Sensor Array #04 Online • Juja, KE</span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="p-6 md:p-8 bg-surface-container-lowest flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">insights</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Autonomous Microclimate Engine</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Converting dense sensor arrays into immediate protective actions every 90 seconds.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant block">Verification Status</span>
                      <span className="font-label-lg text-label-lg font-bold text-on-tertiary-fixed-variant">JKUAT Conduit Validated</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-on-tertiary-fixed-variant">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RISK PILLARS SECTION */}
          <section id="risk-engines" className="max-w-[1280px] mx-auto px-margin py-12 w-full">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Risk Assessment Core</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Real-Time Threat Detection Pillars</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Continuous telemetry analysis categorized across primary vulnerability vectors.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* Heat Risk Card */}
              <div className="group relative p-6 rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-error to-error-container"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-error-container text-on-error-container font-bold">Elevated</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Heat Risk</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Wet Bulb Globe Temperature and radiant heat safety for outdoor personnel.</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline justify-between font-label-sm text-label-sm mb-1.5">
                      <span className="text-on-surface-variant">Heat Stress Threshold</span>
                      <span className="font-bold text-error">78% Trigger</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface">
                  <span className="font-label-md text-label-md font-semibold text-error">Outdoor Rest Enforced</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>

              {/* Water Risk Card */}
              <div className="group relative p-6 rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-secondary-fixed"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-fixed text-on-secondary-fixed-variant font-bold">Optimal</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Water Risk</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Soil saturation, drought deficits, and precision catchment efficiency tracking.</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline justify-between font-label-sm text-label-sm mb-1.5">
                      <span className="text-on-surface-variant">Reservoir Inflow Buffer</span>
                      <span className="font-bold text-secondary">64% Capacity</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface">
                  <span className="font-label-md text-label-md font-semibold text-secondary">Catchment Active</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>

              {/* Extreme Rain Card */}
              <div className="group relative p-6 rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary-fixed-dim"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>thunderstorm</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-primary-fixed text-on-primary-fixed font-bold">Watch</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Extreme Rain</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Localized downburst warnings, catchment overflows, and soil erosion danger.</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline justify-between font-label-sm text-label-sm mb-1.5">
                      <span className="text-on-surface-variant">Downpour Probability</span>
                      <span className="font-bold text-primary">42% (2h window)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface">
                  <span className="font-label-md text-label-md font-semibold text-primary">Drainage Ready</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>

              {/* AI Copilot Card */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-2xl">smart_toy</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">AI Assistant</h3>
                    <p className="font-body-sm text-body-sm text-on-primary/80 mt-1.5">Natural language advice grounded in hyper-local readings for instant decisions.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-lowest/15 backdrop-blur-sm text-xs font-label-md leading-relaxed text-on-primary/95">
                    "Can schools run outdoor sports this afternoon safely?"
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-on-primary/20 flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-primary">Ask Copilot Now</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </section>



          {/* HOW IT WORKS SECTION */}
          <section id="how-it-works" className="max-w-[1280px] mx-auto px-margin py-16 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl space-y-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">End-to-End Pipeline</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">How Climate360 Works</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">A 5-stage closed loop converting multi-spectral IoT telemetry into targeted community interventions.</p>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md bg-surface-container px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                <span>End-to-End Latency: &lt; 2.4s</span>
              </div>
            </div>

            {/* Pipeline Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  num: 1,
                  icon: 'sensors',
                  title: 'Collect',
                  desc: 'Ingests raw environmental observations from JKUAT Conduit@Empathy edge sensors.',
                  tags: ['Temp', 'Humidity', 'Rain', 'Wind', 'Solar', 'WBGT', 'Pressure'],
                  bgColor: '#ffffff',
                  color: '#1f108e'
                },
                {
                  num: 2,
                  icon: 'fact_check',
                  title: 'Understand',
                  desc: 'Cleans, validates sensor integrity, and extracts statistical anomaly indicators.',
                  items: ['01. Outlier Rejection', '02. Noise Filtration', '03. Calibration Sync'],
                  bgColor: '#ffffff',
                  color: '#0051d5'
                },
                {
                  num: 3,
                  icon: 'model_training',
                  title: 'Analyze',
                  desc: 'Feeds calibrated vectors into specialized domain hazard engines.',
                  engines: [
                    { name: 'Heat Engine', color: '#ba1a1a', icon: 'whatshot' },
                    { name: 'Water Engine', color: '#0051d5', icon: 'water' },
                    { name: 'Rain Engine', color: '#1f108e', icon: 'rainy' }
                  ],
                  bgColor: '#ffffff',
                  color: '#1f108e'
                },
                {
                  num: 4,
                  icon: 'psychology',
                  title: 'Explain',
                  desc: 'Groq Llama-3 AI reasoning engine translates technical indices into plain regional vernacular.',
                  note: 'Contextual translation into English & Swahili idioms.',
                  bgColor: '#ffffff',
                  color: '#003422'
                },
                {
                  num: 5,
                  icon: 'crisis_alert',
                  title: 'Act',
                  desc: 'Dispatches role-specific guidance across SMS, mobile web, and field siren stations.',
                  note: 'Immediate protective interventions executed.',
                  bgColor: '#1f108e',
                  color: '#ffffff',
                  isLast: true
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-4"
                  style={{ backgroundColor: step.bgColor }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-headline-sm text-xs font-bold"
                        style={{
                          backgroundColor: step.isLast ? step.color : 'transparent',
                          border: step.isLast ? 'none' : `2px solid ${step.color}`,
                          color: step.isLast ? '#ffffff' : step.color
                        }}
                      >
                        {step.num}
                      </span>
                      <span className="material-symbols-outlined" style={{ color: step.color }}>
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold" style={{ color: step.isLast ? '#ffffff' : step.color }}>
                      {step.title}
                    </h3>
                    <p className="font-body-sm text-body-sm mt-2" style={{ color: step.isLast ? 'rgba(255,255,255,0.8)' : '#464553' }}>
                      {step.desc}
                    </p>
                  </div>

                  {step.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {step.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-label-sm bg-surface-container text-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {step.items && (
                    <div className="space-y-1.5 pt-2 text-xs font-label-sm" style={{ color: '#464553' }}>
                      {step.items.map((item, i) => (
                        <div key={i} className="p-1.5 rounded bg-surface-container-low">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.engines && (
                    <div className="space-y-2 pt-2">
                      {step.engines.map((engine, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-label-sm" style={{ color: engine.color }}>
                          <span className="material-symbols-outlined text-[16px]">{engine.icon}</span>
                          <span>{engine.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.note && (
                    <div className="p-2.5 rounded-lg text-on-tertiary-fixed-variant text-[11px] font-label-sm leading-snug" style={{ backgroundColor: 'rgba(133, 248, 196, 0.3)' }}>
                      {step.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Field Telemetry Section */}
            <div id="field-telemetry" className="mt-12 rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 relative min-h-[320px]">
                <img
                  alt="Environmental IoT monitoring station"
                  className="w-full h-full object-cover"
                  src={modernEnvIoT}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-on-primary">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider bg-surface-container-lowest/20 backdrop-blur-md px-2 py-0.5 rounded">Hardware Deploy</span>
                  <p className="font-headline-sm text-sm font-bold mt-1">Conduit@Empathy Autonomous Node #08</p>
                  <p className="font-body-sm text-xs text-on-primary/80">Juja Central Test Grounds • Continuous 5-min cadence</p>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">Live Field Verification</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-label-sm text-on-tertiary-fixed-variant bg-tertiary-fixed/30 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span>
                      99.94% Sensor Uptime
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Real-World Environmental Grounding</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Unlike generic weather forecasting apps that rely solely on low-resolution satellite interpolation, Climate360 draws telemetry directly from physical solar-powered multi-sensor arrays stationed on farmlands and academic campuses in Kenya.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-surface-container">
                  {[
                    { label: 'Solar Radiation', value: '884', unit: 'W/m²' },
                    { label: 'Ambient Baro', value: '1,014', unit: 'hPa' },
                    { label: 'Wind Gust', value: '14.2', unit: 'km/h' },
                    { label: 'Surface Dew', value: '18.6', unit: '°C' }
                  ].map((metric, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-container-low">
                      <span className="font-label-sm text-[11px] text-on-surface-variant block">{metric.label}</span>
                      <span className="font-headline-sm text-lg font-bold text-on-surface">
                        {metric.value} <span className="text-xs font-normal text-on-surface-variant">{metric.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* WHO IS IT FOR SECTION */}
          <section className="max-w-[1280px] mx-auto px-margin py-16 w-full">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Tailored Impact</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Who It's For</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Actionable clarity calibrated to specific operational workflows across the community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {[
                {
                  icon: 'agriculture',
                  title: 'Smallholder Farmers',
                  desc: 'Actionable agronomic windows for planting, irrigation, and field work safety.',
                  items: ['Optimized fertilizer timing', 'Rainwater catchment triggers', 'Heat stress crop warnings'],
                  channel: 'SMS & USSD Micro-Broadcasts',
                  bgColor: 'rgb(133, 248, 196, 0.4)',
                  textColor: '#005137'
                },
                {
                  icon: 'school',
                  title: 'Schools & Teachers',
                  desc: 'Protect student health during extreme heat spikes and unseasonal storms.',
                  items: ['Recess & athletic play policies', 'Hydration interval automation', 'Storm safe-dismissal alerts'],
                  channel: 'Administrative Web Portal',
                  bgColor: 'rgb(219, 225, 255, 0.5)',
                  textColor: '#0051d5'
                },
                {
                  icon: 'diversity_3',
                  title: 'Local Communities',
                  desc: 'Empowering residents with easy-to-digest risk alerts and safe transit updates.',
                  items: ['Low-lying drainage flood watch', 'Public cooling shelter guide', 'Plain-language WhatsApp bot'],
                  channel: 'Conversational WhatsApp Bot',
                  bgColor: 'rgb(226, 223, 255, 0.4)',
                  textColor: '#1f108e'
                },
                {
                  icon: 'account_balance',
                  title: 'Local Decision-Makers',
                  desc: 'Data-backed justification for resource allocation and emergency response teams.',
                  items: ['County disaster budget logs', 'Culvert & bridge vulnerability', 'Exportable CSV / GeoJSON data'],
                  channel: 'County Command Console',
                  bgColor: 'rgb(224, 227, 229, 0.5)',
                  textColor: '#191c1e'
                }
              ].map((audience, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: audience.bgColor, color: audience.textColor }}>
                      <span className="material-symbols-outlined text-2xl">{audience.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{audience.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">{audience.desc}</p>
                    </div>
                    <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                      {audience.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container">
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant">Primary Channel</span>
                    <span className="font-label-md text-label-md font-bold text-on-surface block mt-0.5">{audience.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI ASSISTANT SECTION */}
          <section id="ai-assistant" className="max-w-[1280px] mx-auto px-margin py-16 w-full">
            <div className="rounded-3xl bg-gradient-to-br from-primary via-primary-container to-secondary p-8 sm:p-12 text-on-primary shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-xs font-label-md text-on-primary">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                    <span>Llama-3 70B Powered via Groq</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold">Ask the Climate360 Copilot Anything</h2>
                  <p className="font-body-md text-body-md text-on-primary/80 max-w-lg">
                    Test queries with our real-time reasoning model. The Copilot fuses hyper-local telemetry with agronomy research to generate immediate advice.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => fillPrompt('Can farm workers safely harvest in Juja today?')}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-xs font-label-md transition-colors"
                    >
                      "Can workers safely harvest in Juja today?"
                    </button>
                    <button
                      onClick={() => fillPrompt('Should I harvest rainwater before 6 PM?')}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-xs font-label-md transition-colors"
                    >
                      "Should I harvest rainwater before 6 PM?"
                    </button>
                    <button
                      onClick={() => fillPrompt('What is the extreme heat risk for primary school athletics?')}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-xs font-label-md transition-colors"
                    >
                      "Heat risk for school athletics?"
                    </button>
                  </div>
                </div>

                {/* Chat Simulator */}
                <div className="lg:col-span-6">
                  <div className="p-6 rounded-2xl bg-surface-container-lowest text-on-surface shadow-xl space-y-4">
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${msg.type === 'user' ? 'rounded-tr-sm bg-primary text-on-primary' : 'rounded-tl-sm bg-surface-container text-on-surface'} font-body-sm text-body-sm shadow-sm whitespace-pre-wrap`}>
                            {msg.type === 'assistant' && msg.text.includes('ADVISORY') ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-error font-bold font-label-sm text-xs">
                                  <span className="material-symbols-outlined text-[16px]">warning</span>
                                  <span>ADVISORY: OUTDOOR ACTIVITY UNSAFE</span>
                                </div>
                                <p>{msg.text.split('\n').slice(2).join('\n')}</p>
                              </div>
                            ) : (
                              msg.text
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            submitPrompt();
                          }
                        }}
                        placeholder="Ask about crops, heat risks, rainfall..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        onClick={submitPrompt}
                        className="p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[20px]">send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="max-w-[1280px] mx-auto px-margin pt-4 pb-20 w-full text-center">
            <div className="p-10 sm:p-14 rounded-3xl bg-surface-container-low flex flex-col items-center justify-center space-y-6">
              <h2 className="font-headline-lg text-3xl sm:text-headline-lg font-bold text-on-surface max-w-xl">
                Deploy Climate360 in Your Community
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Open-source, hackathon-tested telemetry schemas, ready for immediate rollout with IoT hardware or county environmental feeds.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {}}
                  className="px-6 py-3.5 rounded-xl font-label-lg text-label-lg text-on-primary bg-primary hover:bg-primary-container shadow-md transition-all cursor-default"
                >
                  Access Open Telemetry API
                </button>
                <button
                  onClick={() => {}}
                  className="px-6 py-3.5 rounded-xl font-label-lg text-label-lg text-secondary bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all cursor-default"
                >
                  Read JKUAT Research Paper
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LandingPageNew;
