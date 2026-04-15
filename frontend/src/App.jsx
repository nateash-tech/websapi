import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="min-h-screen bg-[#7B4C00] font-sans text-[#FDF5E6] selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37] origin-left z-[100]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/detail/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer / Copyright */}
        <footer className="py-12 bg-[#B47B00] border-t border-[#8B4513]/20 text-center">
          <div className="mb-4">
            <span className="text-6xl font-black text-white tracking-tighter select-none">
              Indopalm<span className="text-[#FCD34D]">Sapi</span>
            </span>
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em]">
            © 2026 IndopalmSapi • Premium Sacrificial Animals
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
