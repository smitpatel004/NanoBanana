import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LivePreview from './components/LivePreview';
import Features from './components/Features';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Hero />
      <HowItWorks />
      <LivePreview />
      <Features />
      <UploadSection />
      <Footer />
    </div>
  );
}

export default App;