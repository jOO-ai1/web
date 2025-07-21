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
        transition={{ duration: 0.7 }}
        className="container mx-auto py-20 text-center px-4"
      >
        <FiHeart size={80} className="mx-auto mb-6 text-[#d1b16a]" />
        <h1 className="text-3xl font-bold mb-4 text-[#111]">{t("favorites")}</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {lang === "ar" 
            ? "لم تقم بإضافة أي منتجات للمفضلة بعد. ابدأ بتصفح مجموعتنا الرائعة!" 
            : "You haven't added any products to favorites yet. Start browsing our amazing collection!"
          }
        </p>
        <Link to="/products">
          <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80">
            <FiShoppingBag />
            {t("shopNow")}
          </GlassButton>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-10 px-4"
    >
      <SectionTitle>{t("favorites")}</SectionTitle>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-4 sm:p-6 rounded-[2rem] shadow-xl border border-white/25 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src={product.image} 
                alt={product.name[lang]}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <FiHeart 
                  size={20} 
                  className="text-red-500 fill-current" 
                />
              </button>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-[#111] line-clamp-2">
                {product.name[lang]}
              </h3>
              <p className="text-[#d1b16a] font-bold text-xl">
                {product.price} {t("egp")}
              </p>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.desc[lang]}
              </p>
              
              <div className="flex gap-2 pt-2">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <GlassButton className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-sm py-2">
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