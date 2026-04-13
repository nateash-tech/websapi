import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ categoryId, farmName, searchQuery, limit }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = window.location.hostname === 'localhost' 
          ? 'http://localhost:5000' 
          : ''; // Relative to same domain in production
        
        let url = `${baseUrl}/api/products?`;
        if (categoryId && categoryId !== 'Semua Kategori') url += `category=${categoryId}&`;
        if (farmName && farmName !== 'Semua Kandang') url += `farm=${farmName}&`;
        if (searchQuery) url += `search=${searchQuery}&`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, farmName, searchQuery]);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
        {(limit ? products.slice(0, limit) : products).map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/catalog/detail/${product.id}`)}
            className="group bg-[#FDF5E6] rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative cursor-pointer"
          >
            {/* Top Badge (Kode Unik) */}
            <div className="relative h-32 sm:h-48 bg-black/20">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#B47B00] text-white px-6 py-1 rounded-b-2xl font-black text-sm z-10 text-center shadow-md">
                  <div className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">{product.jenis}</div>
                  {product.kode_unik}
               </div>
               {product.image_url ? (
                 <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-300 bg-[#D4AF37]/5">
                    <span className="text-4xl text-[#D4AF37]/30">🐂</span>
                 </div>
               )}
               <div className="absolute bottom-2 right-2 opacity-50 text-[10px] font-bold text-slate-400">#IngatQurban</div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6">
              <div className="flex flex-col mb-4">
                <h3 className="text-xs sm:text-lg md:text-xl font-black text-[#064E3B] line-clamp-1 mb-0.5 sm:mb-1">{product.name}</h3>
                <span className="text-[#B47B00] font-black text-sm sm:text-xl md:text-2xl">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                  }).format(product.harga)}
                </span>
              </div>

              {/* Farm Badge */}
              <div className="bg-[#064E3B]/5 rounded-lg sm:rounded-xl p-1.5 sm:p-3 flex items-center gap-1 sm:gap-2 mb-3 sm:mb-5 border border-[#064E3B]/10">
                <span className="text-xs sm:text-sm">🏠</span>
                <span className="text-[8px] sm:text-[10px] font-black text-[#064E3B]/70 uppercase tracking-widest line-clamp-1">{product.farm_name}</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#064E3B] border-b-2 sm:border-b-4 border-[#042F2E] hover:bg-[#065F46] text-white py-2 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-3 transition-all shadow-lg active:translate-y-1 active:border-b-0">
                <span className="text-sm sm:text-xl">💬</span>
                HUBUNGI KAMI
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {!limit && products.length === 0 && (
        <div className="w-full py-20 text-center text-slate-400 font-bold">
          Belum ada produk yang tersedia untuk filter ini.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
