import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LivePreview from './components/LivePreview';
import Features from './components/Features';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MergeStudio from './pages/MergeStudio';
import Profile from './pages/Profile';

// Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <HowItWorks />
    <LivePreview />
    <Features />
    <UploadSection />
    <Footer />
  </>
);

// Layout wrapper that conditionally shows Navbar
const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen text-white selection:bg-blue-500/30" style={{ background: '#0a0a0a' }}>
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/studio"
                element={
                  <ProtectedRoute>
                  <MergeStudio />
                  </ProtectedRoute>  
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute>
                  <Profile />
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
