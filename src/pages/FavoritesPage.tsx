import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import { products } from '../data/products';
import SectionTitle from '../components/SectionTitle';
import GlassButton from '../components/GlassButton';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { lang } = useLang();
  const t = useTranslation();

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-[60vh] flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <FiHeart size={80} className="mx-auto text-[#d1b16a] drop-shadow-lg" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-[#111]"
          >
            {t("favorites")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            {lang === "ar" 
              ? "لم تقم بإضافة أي منتجات للمفضلة بعد. ابدأ بتصفح مجموعتنا الرائعة!" 
              : "You haven't added any products to favorites yet. Start browsing our amazing collection!"
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/products">
              <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <FiShoppingBag className="mr-2" />
                {t("shopNow")}
              </GlassButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="container mx-auto py-10 px-4"
    >
      <SectionTitle>{t("favorites")}</SectionTitle>
      
      <div className="mobile-product-grid sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {favoriteProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4 }}
            className="product-card mobile-product-card glass p-4 sm:p-6 rounded-[2rem] shadow-xl border border-white/25 group transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src={product.image} 
                alt={product.name[lang]}
                className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 will-change-transform" 
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
              >
                <FiHeart 
                  size={16} 
                  className="text-red-500 fill-current" 
                />
              </button>
            </div>
            
            <div className="product-info space-y-3">
              <h3 className="mobile-product-title font-bold text-base sm:text-lg text-[#111] line-clamp-2">
                {product.name[lang]}
              </h3>
              <p className="mobile-product-price text-[#d1b16a] font-bold text-lg sm:text-xl">
                {product.price} {t("egp")}
              </p>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.desc[lang]}
              </p>
              
              <div className="flex gap-2 pt-2">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <GlassButton className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-sm py-2 transition-all duration-200 hover:shadow-lg">
                    {lang === "ar" ? "عرض التفاصيل" : "View Details"}
                  </GlassButton>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}