import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const categories = ['Ekonomis', 'Premium', 'Medium', 'Kambing Domba', 'Sapi Bali'];
const farms = ['Semua Kandang', 'Indopalm Farm Tajurhalang', 'Mumbul Sari', 'Indopalm Farm Ciseeng'];

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Ekonomis');
  const [selectedFarm, setSelectedFarm] = useState('Semua Kandang');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [farmOpen, setFarmOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReset = () => {
    setSelectedCategory('Semua Kategori');
    setSelectedFarm('Semua Kandang');
  };

  const handleClose = () => {
    setFilterOpen(false);
    setCategoryOpen(false);
    setFarmOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/catalog?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}&farm=${encodeURIComponent(selectedFarm)}`);
    setFilterOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#B47B00]/90 backdrop-blur-md border-b border-[#8B4513]/30 shadow-xl'
        : 'bg-[#B47B00] border-b border-[#8B4513]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        
        {/* Main Row */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Logo */}
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 cursor-pointer flex items-center gap-2">
              <img src="/Logo%20Farm.png" alt="Indopalm Logo" className="h-10 w-auto" />
              <span className="hidden sm:block text-2xl font-black text-white tracking-tighter">
                indopalm<span className="text-[#FCD34D]">Qu</span>
              </span>
            </motion.div>
          </Link>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 transition-all text-sm w-full font-medium"
              placeholder="Cari Produk"
            />
            {filterOpen && (
              <button
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500 font-bold text-sm hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Close</span>
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-3 sm:px-5 py-3 font-extrabold rounded-xl border-b-4 transition-all ${
              filterOpen
                ? 'bg-[#042F2E] text-white border-black'
                : 'bg-[#064E3B] text-white border-[#042F2E] hover:bg-[#065F46]'
            }`}
          >
            <Filter className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="p-3 bg-[#064E3B] text-white rounded-xl shadow-lg shadow-black/10 hover:bg-[#065F46] transition-all"
          >
            <Search className="h-6 w-6" />
          </button>

        </div>

        {/* Filter Row */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-3 pt-2">

                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setCategoryOpen(!categoryOpen); setFarmOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FBB016] rounded-xl text-black font-bold text-sm shadow-md hover:bg-[#FACC15] transition-all border border-black/10"
                  >
                    {selectedCategory}
                    <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {categoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden z-50 min-w-[160px]"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-white/5 transition-colors ${selectedCategory === cat ? 'text-[#D4AF37] font-bold' : 'text-[#FDF5E6]/70'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Farm Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setFarmOpen(!farmOpen); setCategoryOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FBB016] rounded-xl text-black font-bold text-sm shadow-md hover:bg-[#FACC15] transition-all border border-black/10"
                  >
                    {selectedFarm === 'Semua Kandang' ? 'Kandang' : selectedFarm.split(' ').slice(-1)[0]}
                    <ChevronDown className={`h-4 w-4 transition-transform ${farmOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {farmOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden z-50 min-w-[200px]"
                      >
                        {farms.map((farm) => (
                          <button
                            key={farm}
                            onClick={() => { setSelectedFarm(farm); setFarmOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-orange-50 transition-colors ${selectedFarm === farm ? 'text-orange-600 font-bold' : 'text-slate-700'}`}
                          >
                            {farm}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terapkan Button */}
                <button 
                   onClick={handleSearchClick}
                   className="px-5 py-2 bg-[#064E3B] text-white font-bold text-sm rounded-xl hover:bg-[#065F46] transition-all shadow-sm"
                >
                  Terapkan
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-white text-slate-600 font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Reset
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
