import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🌙',
    title: 'Lebih Ringan',
    desc: 'Cicil tabungan qurban sesuai kemampuan, tanpa beban di momen terakhir.',
  },
  {
    icon: '📅',
    title: 'Lebih Terencana',
    desc: 'Rencanakan qurban dari jauh hari. Pilih waktu dan hewan yang terbaik.',
  },
  {
    icon: '✨',
    title: 'Lebih Bermanfaat',
    desc: 'Qurban tersalurkan tepat sasaran ke yang membutuhkan, langsung dari farm.',
  },
  {
    icon: '🛡️',
    title: 'Terpercaya',
    desc: 'Mitra kandang terverifikasi dan transparan — kamu tahu hewanmu ada di mana.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturePanel = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-[20px] w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="bg-white rounded-2xl px-5 py-6 flex flex-col items-center text-center gap-3 shadow-md border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-default"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl shadow-inner border border-orange-100">
              {f.icon}
            </div>
            <h3 className="font-extrabold text-orange-800 text-base tracking-tight leading-tight">
              {f.title}
            </h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturePanel;
