import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FarmList = ({ onSelectFarm, activeFarm }) => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
        const res = await fetch(`${baseUrl}/api/farms`);
        const data = await res.json();
        setFarms(data);
      } catch (err) {
        console.error('Error fetching farms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 w-full flex justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-[#FFE5B4] rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 md:pb-16 border-b-[8px] md:border-b-[12px] border-[#FFCD70] shadow-2xl shadow-orange-200/50 w-full flex flex-col items-center overflow-hidden"
      >
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-sm font-[1000] text-orange-950/70 uppercase tracking-[0.4em] mb-4 text-center">
            KANDANG KOLABORASI MITRA BISNIS NUSAQU
          </p>
          <div className="w-24 h-2 bg-orange-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
          {farms.map((farm) => (
            <motion.button
              key={farm.id}
              variants={itemVariants}
              onClick={() => onSelectFarm(farm.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-center gap-6 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-4 transition-all text-left w-full ${
                activeFarm === farm.name
                  ? 'bg-blue-50 border-orange-700 shadow-2xl shadow-orange-300/40 z-10 scale-[1.02]'
                  : 'bg-white border-slate-100 shadow-xl hover:shadow-2xl hover:border-orange-300'
              }`}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-3xl md:rounded-[2rem] flex items-center justify-center p-3 md:p-4 shadow-inner border border-slate-50 flex-none overflow-hidden">
                <img 
                    src={farm.logo_url || "https://cdn-icons-png.flaticon.com/512/619/619153.png"} 
                    alt="farm house icon" 
                    className={`w-full h-full object-contain transition-all duration-500 ${
                       activeFarm === farm.name ? 'opacity-100' : 'opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                />
              </div>
              <p className={`flex-1 font-[1000] text-xs md:text-base uppercase tracking-wider leading-tight transition-colors ${
                activeFarm === farm.name ? 'text-orange-700' : 'text-blue-950'
              }`}>
                {farm.name}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FarmList;
