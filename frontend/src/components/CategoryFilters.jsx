import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CategoryFilters = ({ activeCategory, onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
        const res = await fetch(`${baseUrl}/api/categories`);
        const data = await res.json();
        // Keep "Ekonomis" but don't add "Semua Kategori"
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-[20px] w-full flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#B47B00] rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 md:pt-8 md:pb-12 border-b-[8px] md:border-b-[12px] border-black/10 shadow-2xl w-full flex flex-col items-center overflow-hidden"
      >
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <p className="text-[10px] md:text-sm font-[1000] text-white/70 uppercase tracking-[0.5em] mb-3 text-center">
            PILIH KATEGORI HEWAN
          </p>
          <div className="w-16 md:w-20 h-1.5 md:h-2 bg-white/30 rounded-full"></div>
        </div>
        
        <div className="bg-[#FDF5E6]/10 backdrop-blur-md rounded-[2.5rem] p-4 md:p-10 w-full max-w-6xl border border-white/20 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 w-full">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(cat.name)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-4 md:py-6 rounded-2xl md:rounded-[2rem] transition-all font-black border-4 ${
                  activeCategory === cat.name
                    ? 'bg-[#FDF5E6] border-white shadow-xl text-[#064E3B] scale-[1.02]'
                    : 'bg-[#FDF5E6]/80 text-[#064E3B]/70 border-white/20 hover:bg-[#FDF5E6] hover:text-[#064E3B] shadow-md'
                }`}
              >
                <span className="text-2xl md:text-4xl">
                  {cat.icon || '🐂'}
                </span>
                <span className={`uppercase tracking-widest whitespace-nowrap font-[1000] text-[8px] md:text-[11px] transition-colors ${
                  activeCategory === cat.name ? 'text-[#064E3B]' : 'text-[#064E3B]/70'
                }`}>
                  {cat.name}
                </span>

                {activeCategory === cat.name && (
                  <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-white blur-2xl -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryFilters;
