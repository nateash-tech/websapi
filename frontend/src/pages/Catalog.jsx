import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CategoryFilters from '../components/CategoryFilters';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const category = searchParams.get('category') || 'Ekonomis';
  const farm = searchParams.get('farm') || 'Semua Kandang';
  const search = searchParams.get('search') || '';

  const [searchQueryLocal, setSearchQueryLocal] = useState(search);

  const handleCategorySelect = (newCat) => {
    setSearchParams({ category: newCat, farm, search });
  };

  const handleSearchSubmit = () => {
    setSearchParams({ category, farm, search: searchQueryLocal });
  };

  const handleReset = () => {
    setSearchParams({ category: 'Ekonomis', farm: 'Semua Kandang', search: '' });
    setSearchQueryLocal('');
  };

  const hasFilters = category !== 'Ekonomis' || farm !== 'Semua Kandang' || search !== '';

  return (
    <div className="max-w-7xl mx-auto pb-8 px-4">
      {/* Unified Header (Back Button, Title, and Search Bar on One Line) */}
      <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 bg-[#FBB016] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-black text-xs uppercase shadow-sm transition-all flex-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3px]" />
            Kembali
          </button>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight whitespace-nowrap">
            Kategori {category}
          </h2>
        </div>

        <div className="w-full md:max-w-md">
          <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
            <input 
              type="text"
              value={searchQueryLocal}
              onChange={(e) => setSearchQueryLocal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="flex-1 px-4 py-2 text-sm text-slate-600 focus:outline-none"
              placeholder="Cari..."
            />
            <button 
              onClick={handleSearchSubmit}
              className="px-6 py-2 bg-slate-50 border-l border-slate-200 text-slate-600 font-bold hover:bg-white transition-colors text-sm"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid 
        categoryId={category} 
        farmName={farm} 
        searchQuery={search} 
      />

      {/* Simple Pagination Placeholder (Match Reference) */}
      <div className="mt-8 flex justify-center items-center gap-2">
         {[1, 2, '»'].map((page, i) => (
           <button 
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
              page === 1 ? 'bg-[#FBB016] text-white shadow-lg shadow-orange-500/20' : 'bg-white border border-orange-100 text-[#FBB016] hover:bg-orange-50'
            }`}
           >
             {page}
           </button>
         ))}
      </div>
    </div>
  );
};

export default Catalog;
