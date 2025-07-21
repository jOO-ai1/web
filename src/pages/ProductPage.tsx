import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import clsx from "clsx";
import { useLang, useTranslation } from "../contexts/LangContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { products } from "../data/products";
import GlassButton from "../components/GlassButton";
import SectionTitle from "../components/SectionTitle";

export default function ProductPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const t = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const product = products.find(p => p.id === parseInt(id || "0"));
  const relatedProducts = products.filter(p => p.id !== product?.id).slice(0, 4);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name[lang] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 0);
  
  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center text-2xl text-red-500">
        {t("productNotFound")}
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      showToast(lang === "ar" ? "يرجى اختيار اللون والمقاس" : "Please select color and size");
      return;
    }
    addToCart(product, selectedColor, selectedSize);
    showToast(t("addSuccess"));
  };
  
  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    const isNowFavorite = !isFavorite(product.id);
    showToast(isNowFavorite ? t("addToFavorites") : t("removeFromFavorites"));
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-16">
        {/* Product Image */}
        <motion.img
          src={product.image}
          alt={product.name[lang]}
          className="w-full rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Product Details */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111]">{product.name[lang]}</h1>
              <p className="text-sm text-gray-600 mt-2">{product.desc[lang]}</p>
            </div>
            
            {/* Favorite Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="glass w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <FiHeart 
                size={24} 
                className={isFavorite(product.id) ? "text-red-500 fill-current" : "text-gray-400"} 
              />
            </motion.button>
          </div>

          {/* Price */}
          <p className="text-2xl sm:text-3xl font-bold text-[#d1b16a]">
            {product.price} {t("egp")}
          </p>

          {/* Colors */}
          <div>
            <p className="font-semibold mb-3 text-[#111]">{t("color")}:</p>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <motion.div
                  key={index}
                  onClick={() => setSelectedColor(color.name[lang])}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "w-10 h-10 rounded-full border-2 cursor-pointer transition-all",
                    selectedColor === color.name[lang]
                      ? "ring-2 ring-[#d1b16a] border-[#d1b16a]"
                      : "border-gray-300"
                  )}
                  style={{ backgroundColor: color.code }}
                  title={color.name[lang]}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="font-semibold mb-3 text-[#111]">{t("size")}:</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    "px-4 py-1 rounded-full border text-sm font-medium",
                    selectedSize === size
                      ? "bg-[#d1b16a] text-black border-[#d1b16a]"
                      : "text-gray-600 border-gray-300 hover:border-black"
                  )}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="glass p-4 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-[#111]">{t("specs")}</h3>
            <div className="space-y-2">
              {product.specs[lang].map(([key, value], index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium text-[#111]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <GlassButton
            onClick={handleAddToCart}
            className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-lg py-4"
          >
            <FiShoppingCart size={20} />
            {t("addToCart")}
          </GlassButton>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <SectionTitle>
            {lang === "ar" ? "منتجات مشابهة" : "Related Products"}
          </SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="glass p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name[lang]}
                className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-sm font-medium text-[#111] line-clamp-2">{item.name[lang]}</h3>
              <p className="text-[#d1b16a] font-bold mt-1">{item.price} {t("egp")}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}
