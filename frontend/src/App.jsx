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
      <div className="min-h-screen bg-[#FFFBF0] font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-[100]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/detail/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer / Copyright */}
        <footer className="py-12 bg-[#FFD9A0]/20 border-t border-orange-100 text-center">
          <div className="mb-4">
            <span className="text-6xl font-black text-orange-700/20 tracking-tighter select-none">
              nusa<span className="text-orange-500/20">Qu</span>
            </span>
          </div>
          <p className="text-[10px] font-bold text-orange-900/30 uppercase tracking-[0.5em]">
            © 2026 nusaQu • Premium Sacrificial Animals
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
