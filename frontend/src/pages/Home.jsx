import React from 'react';
import Hero from '../components/Hero';
import FeaturePanel from '../components/FeaturePanel';
import CategoryFilters from '../components/CategoryFilters';
import FarmList from '../components/FarmList';
import ProductGrid from '../components/ProductGrid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  const handleFarmSelect = (farm) => {
    navigate(`/catalog?farm=${encodeURIComponent(farm)}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <FeaturePanel />
      
      <CategoryFilters 
        activeCategory={null} 
        onSelect={handleCategorySelect} 
      />

      <FarmList 
        activeFarm={null}
        onSelectFarm={handleFarmSelect}
      />

      {/* Featured Products Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-sm font-[1000] text-[#064E3B]/70 uppercase tracking-[0.4em] mb-4 text-center">
            KATALOG PRODUK TERBARU
          </p>
          <div className="w-24 h-2 bg-[#B47B00]/30 rounded-full"></div>
        </div>

        <ProductGrid limit={6} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/catalog')}
          className="mt-8 px-10 py-4 bg-[#B47B00] border-b-4 border-black/20 text-white font-black rounded-2xl shadow-xl hover:bg-[#8B4513] transition-all flex items-center gap-3"
        >
          LIHAT SELENGKAPNYA
          <span className="text-xl">➔</span>
        </motion.button>
      </section>
    </div>
  );
};

export default Home;
