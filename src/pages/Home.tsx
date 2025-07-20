import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang, useTranslation } from '../contexts/LangContext';
import { collections, products } from '../data/products';
import SectionTitle from '../components/SectionTitle';

export default function Home() {
  const { lang } = useLang();
  const t = useTranslation();

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#111] tracking-wider leading-snug">
          {t("slogan")}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {lang === "ar" 
            ? "اكتشف مجموعة فريدة من الأحذية المصرية الفاخرة" 
            : "Discover a unique collection of luxury Egyptian footwear"
          }
        </p>
      </motion.div>

      {/* Collections */}
      <SectionTitle>{t("collections")}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {collections.map((col, index) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/collections/${col.id}`}>
              <div className="glass rounded-[2rem] shadow-lg overflow-hidden h-80 flex flex-col justify-end relative group">
                <img 
                  src={col.image} 
                  alt={col.name[lang]} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10 p-6">
                  <div className="text-2xl font-bold text-white mb-2">{col.name[lang]}</div>
                  <div className="text-gray-300 text-sm">{col.desc[lang]}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured Products */}
      <SectionTitle>{t("products")}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((prod, index) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/product/${prod.id}`}>
              <div className="glass p-6 rounded-[2rem] shadow-xl border border-white/25 group hover:shadow-2xl transition-all duration-300">
                <div className="overflow-hidden rounded-xl mb-4">
                  <img 
                    src={prod.image} 
                    alt={prod.name[lang]}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="font-bold text-lg mb-2 text-[#111]">{prod.name[lang]}</div>
                <div className="text-[#d1b16a] font-bold text-xl">{prod.price} {t("egp")}</div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{prod.desc[lang]}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
