import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ categoryId, farmName, searchQuery }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/products?`;
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate(`/catalog/detail/${product.id}`)}
            className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-md group hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Top Badge (Kode Unik) */}
            <div className="relative h-48 bg-slate-100">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-orange-700 text-white px-6 py-1 rounded-b-2xl font-black text-sm z-10 text-center">
                  <div className="text-[10px] text-orange-200 font-bold uppercase tracking-tighter">{product.jenis}</div>
                  {product.kode_unik}
               </div>
               {product.image_url ? (
                 <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-300 bg-orange-50/50">
                    <span className="text-4xl text-orange-200">🐂</span>
                 </div>
               )}
               <div className="absolute bottom-2 right-2 opacity-50 text-[10px] font-bold text-slate-400">#IngatQurban</div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-extrabold text-blue-950 text-sm mb-1 line-clamp-2 h-10">
                {product.name}
              </h3>
              <div className="text-red-500 font-black text-lg mb-3">
                {product.harga > 0 ? `Rp ${product.harga.toLocaleString('id-ID')}` : 'Rp 0'}
              </div>

              {/* Farm Badge */}
              <div className="bg-orange-50 rounded-lg p-2 flex items-center gap-2 mb-4 border border-orange-100/50">
                <span className="text-sm">🏠</span>
                <span className="text-[10px] font-bold text-orange-800 uppercase line-clamp-1">{product.farm_name}</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-orange-900 border-b-4 border-orange-950 hover:bg-orange-950 text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span>
                Hubungi Kami
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="w-full py-20 text-center text-slate-400 font-bold">
          Belum ada produk yang tersedia untuk filter ini.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
