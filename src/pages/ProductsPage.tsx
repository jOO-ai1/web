import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiList, FiSearch, FiHeart } from 'react-icons/fi';
import { useLang, useTranslation } from '../contexts/LangContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';
import { products } from '../data/products';
import GlassButton from '../components/GlassButton';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const { lang } = useLang();
  const t = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name[lang].toLowerCase().includes(search.toLowerCase())
  );
  
  const handleFavoriteClick = (productId: number) => {
    toggleFavorite(productId);
    const isNowFavorite = !isFavorite(productId);
    showToast(isNowFavorite ? t("addToFavorites") : t("removeFromFavorites"));
  };

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">{t("products")}</h1>
        <div className="flex items-center gap-2">
          <GlassButton 
            onClick={() => setView("grid")} 
            className={view === "grid" ? "bg-[#d1b16a] text-black" : ""}
          >
            <FiGrid />
          </GlassButton>
          <GlassButton 
            onClick={() => setView("list")} 
            className={view === "list" ? "bg-[#d1b16a] text-black" : ""}
          >
            <FiList />
          </GlassButton>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
        <input
          className="glass border border-[#d1b16a]/40 px-12 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#d1b16a] min-h-[44px]"
          placeholder={lang === "ar" ? "بحث عن منتج..." : "Search for a product..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Not Found */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl">{t("productNotFound")}</div>
        </div>
      )}

      {/* Products Grid/List */}
      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" : "flex flex-col gap-6"}>
        {filtered.map((prod, index) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className={`glass p-4 sm:p-6 rounded-[2rem] shadow-xl border border-white/25 group hover:shadow-2xl transition-all duration-300 ${view === "list" ? "flex gap-4 items-center" : "flex flex-col"}`}>
              <div className={`relative overflow-hidden rounded-xl flex-shrink-0 ${view === "list" ? "w-32 h-32" : "w-full"}`}>
                <img 
                  src={prod.image} 
                  className={`object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ${view === "list" ? "w-32 h-32" : "w-full h-40"}`}
                  alt={prod.name[lang]}
                />
                <button
                  onClick={() => handleFavoriteClick(prod.id)}
                  className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <FiHeart 
                    size={16} 
                    className={isFavorite(prod.id) ? "text-red-500 fill-current" : "text-gray-400"} 
                  />
                </button>
              </div>
              <div className={`flex-1 space-y-2 ${view === "list" ? "pl-4" : "pt-4"}`}>
                <div className="font-bold text-lg">{prod.name[lang]}</div>
                <div className="text-[#d1b16a] font-bold mb-2">{prod.price} {t("egp")}</div>
                {view === "grid" && (
                  <p className="text-gray-600 text-sm line-clamp-2">{prod.desc[lang]}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Link to={`/product/${prod.id}`}>
                    <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-sm py-2">
                      {lang === "ar" ? "تفاصيل" : "Details"}
                    </GlassButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
