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

      {/* Featured Products Section with Panel styling */}
      <section className="max-w-7xl mx-auto px-4 py-8 w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#B47B00] rounded-[2.5rem] md:rounded-[4rem] px-2 py-6 md:p-12 border-b-[8px] md:border-b-[12px] border-black/10 shadow-2xl w-full flex flex-col items-center overflow-hidden"
        >
          <div className="flex flex-col items-center mb-4 md:mb-8">
            <p className="text-[10px] md:text-sm font-[1000] text-white/70 uppercase tracking-[0.4em] mb-4 text-center">
              KATALOG PRODUK TERBARU
            </p>
            <div className="w-24 h-2 bg-white/30 rounded-full"></div>
          </div>

          <ProductGrid limit={6} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/catalog')}
            className="mt-12 px-10 py-4 bg-[#FDF5E6] text-[#064E3B] font-black rounded-2xl shadow-xl hover:bg-white transition-all flex items-center gap-3"
          >
            LIHAT SELENGKAPNYA
            <span className="text-xl">➔</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
