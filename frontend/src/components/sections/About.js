import React from 'react';
import { Cloud, Zap, Droplets, Wind, ShieldAlert, Activity, BarChart3, Database } from 'lucide-react';

function About() {
  return (
    <div className="w-full bg-surface pt-28 pb-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-margin space-y-12">
        
        {/* Header Hero Section */}
        <div className="rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
              <Cloud size={300} />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h1 className="font-headline-display text-4xl sm:text-5xl font-bold mb-4">About Climate360</h1>
              <p className="font-body-lg text-lg text-on-primary/90 leading-relaxed">
                Transforming raw environmental telemetry into actionable climate intelligence for farmers, schools, and local decision-makers.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">The Mission</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2 mb-4">Bridging Data and Action</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-4">
                  Climate360 bridges the critical gap between raw environmental data and real-world action. We empower communities to understand climate risks and take proactive steps to protect themselves and their livelihoods.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col gap-3">
                  <Database className="text-primary" size={28} />
                  <h3 className="font-headline-sm font-bold text-on-surface">Data Integration</h3>
                  <p className="font-body-sm text-on-surface-variant">Real-time edge sensors</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col gap-3">
                  <Activity className="text-secondary" size={28} />
                  <h3 className="font-headline-sm font-bold text-on-surface">Intelligence</h3>
                  <p className="font-body-sm text-on-surface-variant">Predictive risk modeling</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col gap-3">
                  <ShieldAlert className="text-error" size={28} />
                  <h3 className="font-headline-sm font-bold text-on-surface">Action</h3>
                  <p className="font-body-sm text-on-surface-variant">Context-aware alerts</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col gap-3">
                  <BarChart3 className="text-tertiary-fixed-dim" size={28} />
                  <h3 className="font-headline-sm font-bold text-on-surface">Impact</h3>
                  <p className="font-body-sm text-on-surface-variant">Community resilience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Engines */}
        <div className="rounded-3xl bg-surface-container-lowest shadow-lg p-8 sm:p-12">
          <div className="max-w-2xl mb-10">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Core Technology</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">Specialized Intelligence Engines</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Our backend analyzes environmental vectors through three dedicated risk detection systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-error-container/20 border border-error-container/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-on-error-container mb-6">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="font-headline-md font-bold text-on-surface mb-3">Heat Engine</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">
                Monitors heat stress using WBGT, solar radiation, and humidity to provide safety recommendations for outdoor personnel.
              </p>
              <ul className="space-y-2 font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-error"></div> Heat stress modeling</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-error"></div> WBGT triggers</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-error"></div> Safety alerts</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-secondary-container/20 border border-secondary-container/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="font-headline-md font-bold text-on-surface mb-3">Water Engine</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">
                Analyzes rainfall deficit and storage levels to assess agricultural water security and predict drought stress.
              </p>
              <ul className="space-y-2 font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Deficit tracking</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Storage forecasting</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Harvesting potential</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-primary-container/20 border border-primary-container/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container mb-6">
                <span className="text-2xl">🌧️</span>
              </div>
              <h3 className="font-headline-md font-bold text-on-surface mb-3">Rain Engine</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">
                Detects extreme rainfall anomalies and intensity bursts to provide early warnings of potential flooding.
              </p>
              <ul className="space-y-2 font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Intensity anomalies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Historical baselining</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Flood risk triggers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Source / Conduit */}
        <div className="rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-8 sm:p-12 bg-surface-container-low">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">Data Provenance</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2 mb-6">Powered by JKUAT Conduit@Empathy</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Climate360 is built on a foundation of real environmental data through a partnership with Jomo Kenyatta University of Agriculture and Technology. We pull raw node telemetry from their deployed solar-powered sensor arrays, ensuring data integrity over standard satellite interpolations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <span className="material-symbols-outlined text-primary mt-1">verified</span>
                  <div>
                    <h4 className="font-headline-sm font-bold text-on-surface">Authentic Readings</h4>
                    <p className="font-body-sm text-on-surface-variant">No simulated weather. Just actual hardware.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface">
                  <span className="material-symbols-outlined text-primary mt-1">school</span>
                  <div>
                    <h4 className="font-headline-sm font-bold text-on-surface">Academic Rigor</h4>
                    <p className="font-body-sm text-on-surface-variant">Scientifically grounded anomaly detection.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-tertiary-container/50 to-primary-container p-8 sm:p-12 flex flex-col justify-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-8">Our Vision</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: 'public', title: 'Multi-Region Expansion', desc: 'Serving more communities across Africa.' },
                  { icon: 'translate', title: 'Language Localization', desc: 'Intelligence delivered in Swahili & regional dialects.' },
                  { icon: 'smartphone', title: 'USSD & SMS', desc: 'Access for low-bandwidth farming areas.' },
                  { icon: 'psychology', title: 'Advanced LLM', desc: 'Deeper predictive agronomic modeling.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                    <h4 className="font-headline-sm font-bold text-on-surface">{item.title}</h4>
                    <p className="font-body-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
