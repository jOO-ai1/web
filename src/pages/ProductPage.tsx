import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import clsx from 'clsx';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import { products } from '../data/products';
import GlassButton from '../components/GlassButton';
import GlassCard from '../components/GlassCard';

export default function ProductPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const t = useTranslation();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = products.find((p) => String(p.id) === String(id));
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [err, setErr] = useState("");

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center text-2xl text-red-500">
        {t("productNotFound")}
      </div>
    );
  }

  function handleAdd() {
    if (size === null) {
      setErr(t("chooseSize"));
      return;
    }
    if (colorIndex == null) {
      setErr(t("chooseColor"));
      return;
    }
    
    addToCart(product, product.colors[colorIndex].name[lang], size);
    showToast(t("addSuccess"));
    setErr("");
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        {/* Product Image */}
        <div className="space-y-4">
          <div className="glass rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={product.image} 
              alt={product.name[lang]} 
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#111]">
              {product.name[lang]}
            </h1>
            <div className="text-2xl font-bold text-[#d1b16a] mb-4">
              {product.price} {t("egp")}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.desc[lang]}
            </p>
          </div>

          {/* Specifications */}
          <GlassCard className="p-4">
            <h3 className="font-bold text-lg mb-3">{t("specs")}:</h3>
            <div className="space-y-2">
              {product.specs[lang].map(([k, v], index) => (
                <div key={index} className="flex justify-between py-1 border-b border-gray-200/50 last:border-0">
                  <span className="font-medium">{k}:</span>
                  <span className="text-gray-600">{v}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Color Selection */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t("color")}:</h3>
            <div className="flex gap-3">
              {product.colors.map((clr, i) => (
                <button
                  key={i}
                  className={clsx(
                    "w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all",
                    colorIndex === i 
                      ? "border-[#d1b16a] ring-4 ring-[#d1b16a]/30 scale-110" 
                      : "border-gray-300 hover:border-[#d1b16a]/50"
                  )}
                  style={{ background: clr.code }}
                  title={clr.name[lang]}
                  onClick={() => setColorIndex(i)}
                >
                  {colorIndex === i && (
                    <div className="w-3 h-3 bg-white rounded-full opacity-80" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {lang === "ar" ? "اللون المختار:" : "Selected color:"} {product.colors[colorIndex].name[lang]}
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t("size")}:</h3>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={clsx(
                    "aspect-square rounded-xl border-2 text-lg font-bold transition-all hover:scale-105",
                    size === s
                      ? "bg-[#d1b16a] text-black border-[#d1b16a] shadow-lg"
                      : "glass border-gray-300 hover:border-[#d1b16a]/50"
                  )}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {err && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl"
            >
              {err}
            </motion.div>
          )}

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <GlassButton 
              onClick={handleAdd}
              className="flex-1 bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-xl py-4"
            >
              <FiShoppingCart size={24} />
              {t("addToCart")}
            </GlassButton>
            
            <GlassButton className="px-6 py-4">
              <FiHeart size={24} />
            </GlassButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}