import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { useLang, useTranslation } from '../contexts/LangContext';
import { products } from '../data/products';
import GlassButton from '../components/GlassButton';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const { lang } = useLang();
  const t = useTranslation();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name[lang].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
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
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          className="glass border border-[#d1b16a]/40 px-12 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#d1b16a]"
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
      <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
        {filtered.map((prod, index) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className={`glass p-6 rounded-[2rem] shadow-xl border border-white/25 group hover:shadow-2xl transition-all duration-300 ${view === "list" ? "flex gap-4 items-center" : "flex flex-col"}`}>
              <div className="overflow-hidden rounded-xl w-full md:w-auto flex-shrink-0">
                <img 
                  src={prod.image} 
                  className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  alt={prod.name[lang]}
                />
              </div>
              <div className={`flex-1 ${view === "list" ? "pl-4" : ""}`}>
                <div className="font-bold text-lg">{prod.name[lang]}</div>
                <div className="text-[#d1b16a] font-bold mb-2">{prod.price} {t("egp")}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Link to={`/product/${prod.id}`}>
                    <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80">
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
