import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-400 mb-4">Produk tidak ditemukan</h2>
        <button 
          onClick={() => navigate('/catalog')}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const phone = "6281545842432";
    const message = `Hallo Admin nusaQu ..

Ingin Bertanya Tentang Hewan Qurban :
Kode : ${product.kode_unik}
Jenis : ${product.jenis}
Target : ${product.weight || '750Kg'}
Harga : Rp ${product.harga?.toLocaleString('id-ID')}

Terima Kasih`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 bg-[#FBB016] hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-black text-[10px] uppercase shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3px]" />
          Kembali
        </button>
      </div>

      {/* Main Content: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10">
        {/* Left Column: Product Branding Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2rem] overflow-hidden border border-orange-100 shadow-xl relative w-full"
        >
          {/* Top Branding Badge */}
          <div className="bg-orange-700 text-white pt-2 pb-5 px-8 text-center relative">
             <div className="absolute top-0 right-10 w-20 h-20 bg-white/10 rounded-full -translate-y-10"></div>
             <p className="text-[9px] font-bold text-orange-200 uppercase tracking-widest mb-1">{product.jenis}</p>
             <h3 className="text-3xl font-black tracking-tighter">{product.kode_unik}</h3>
          </div>

          {/* Main Image Container */}
          <div className="px-5 -mt-5 relative z-10">
            <div className="bg-white rounded-2xl p-1 shadow-lg border-4 border-white overflow-hidden aspect-video lg:aspect-[5/4]">
               {product.image_url ? (
                 <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-orange-50 text-4xl text-orange-200 font-black">nusaQu</div>
               )}
            </div>
          </div>

          <div className="p-4 pt-2 text-center">
             <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 p-1 border border-orange-100 italic font-black text-orange-800 text-[6px] flex items-center justify-center">
                   nusa
                </div>
                <div className="h-0.5 w-8 bg-orange-200"></div>
                <div className="w-7 h-7 rounded-lg bg-orange-50 p-1 border border-orange-100 italic font-black text-orange-800 text-[6px] flex items-center justify-center">
                   nusaQu
                </div>
             </div>
             <p className="text-[6px] font-bold text-slate-400 uppercase tracking-[0.4em]">#IngatKurban #SolusiQurban</p>
          </div>
        </motion.div>

        {/* Right Column: Information Details */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col gap-6"
        >
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-blue-950 tracking-tight mb-2">
              {product.name}
            </h1>
            <div className="text-3xl font-black text-red-600">
               Rp {product.harga?.toLocaleString('id-ID')}
            </div>
          </div>

          <section>
            <h3 className="text-sm font-black text-blue-950 uppercase tracking-wider border-b-2 border-orange-500 inline-block mb-4">
              Detail Informasi :
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Kode Unik', value: product.kode_unik },
                { label: 'Kategori', value: product.category },
                { label: 'Jenis', value: product.jenis },
                { label: 'Bobot', value: product.weight || '750Kg' },
                { label: 'Posisi', value: product.farm_name },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-none"></div>
                   <div className="text-slate-700 font-bold text-sm">
                      <span className="text-slate-900">{item.label} : </span>
                      {item.value}
                   </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[8px] font-black text-blue-950 uppercase tracking-widest mb-4 bg-slate-100 py-1 px-3 rounded-lg inline-block">
              Lihat Video Hewan Qurban Via Telegram
            </h3>
            <ul className="space-y-2">
               <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Video Sapi : <a href="#" className="text-blue-600 hover:underline">t.me/solusiqurban</a>
               </li>
               <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Video Kambing & Domba : <a href="#" className="text-blue-600 hover:underline">t.me/solusiqurbannusaqu</a>
               </li>
            </ul>
          </section>

          <section className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-[10px] font-black text-blue-950 uppercase tracking-wider mb-4 leading-tight">
               Mengapa berqurban bersama Nusa Sentosa Farm?
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
               {[
                 'Garansi jika sakit/mati',
                 'Harga lebih murah',
                 'Free ongkir Jabodetabek',
                 'Berhadiah Umroh',
                 'Garansi bobot timbang',
                 'Hewan Qurban terawat',
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-2 text-[8px] font-bold text-slate-700 uppercase tracking-tight">
                    <CheckCircle2 className="w-3 h-3 text-orange-600 flex-none" />
                    {item}
                 </li>
               ))}
            </ul>
          </section>

          {/* Action Button */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-orange-900 border-b-4 border-orange-950 hover:bg-orange-950 active:border-b-0 text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg transition-all"
          >
            <MessageSquare className="w-6 h-6" />
            Tanya Stock via WhatsApp
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
