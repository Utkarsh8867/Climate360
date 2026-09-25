import React from 'react';
import './LandingPage.css';
import Header from '../components/Header';
import Hero from '../components/sections/Hero';
import TheProblem from '../components/sections/TheProblem';
import HowItWorks from '../components/sections/HowItWorks';
import RiskCards from '../components/sections/RiskCards';
import AIAssistant from '../components/sections/AIAssistant';
import WhoIsItFor from '../components/sections/WhoIsItFor';
import DashboardPreview from '../components/sections/DashboardPreview';
import WhyConduit from '../components/sections/WhyConduit';
import Technology from '../components/sections/Technology';
import FinalCTA from '../components/sections/FinalCTA';

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <Header onNavigate={onNavigate} currentPage="landing" />
      <Hero onNavigate={onNavigate} />
      <TheProblem />
      <HowItWorks />
      <RiskCards />
      <AIAssistant />
      <WhoIsItFor />
      <DashboardPreview />
      <WhyConduit />
      <Technology />
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}

export default LandingPage;
