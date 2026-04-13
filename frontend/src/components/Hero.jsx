import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-[20px] pb-[20px] w-full">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.008, transition: { duration: 0.4, ease: 'easeOut' } }}
        className="w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-lg cursor-pointer"
      >
        <motion.img
          src="/my_banner.png"
          alt="indopalmQu Banner"
          className="w-full h-auto block"
          animate={{ scale: [1, 1.012, 1] }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
