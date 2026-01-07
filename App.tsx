import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import NoiseOverlay from './components/NoiseOverlay';
import Home from './pages/Home';
import Curaduria from './pages/Curaduria';
import Bitacora from './pages/Bitacora';
import Editorial from './pages/Editorial';
import { PageRoute } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-white font-serif">
        <NoiseOverlay />
        <Navigation />
        
        <main className="relative z-10">
          <Routes>
            <Route path={PageRoute.HOME} element={<Home />} />
            <Route path={PageRoute.CURADURIA} element={<Curaduria />} />
            <Route path={PageRoute.BITACORA} element={<Bitacora />} />
            <Route path={PageRoute.EDITORIAL} element={<Editorial />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;