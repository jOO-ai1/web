import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageChanging, setIsImageChanging] = useState(false);

  useEffect(() => {
    if (!product) return;
    const interval = setInterval(() => {
      setIsImageChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.colors.length);
        setIsImageChanging(false);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  useEffect(() => {
    if (!product || !selectedColor) return;
    const colorIndex = product.colors.findIndex(color => color.name[lang] === selectedColor);
    if (colorIndex !== -1 && colorIndex !== currentImageIndex) {
      setIsImageChanging(true);
      setTimeout(() => {
        setCurrentImageIndex(colorIndex);
        setIsImageChanging(false);
      }, 200);
    }
  }, [selectedColor, product, lang, currentImageIndex]);

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

  const handleColorSelect = (color) => {
    setSelectedColor(color.name[lang]);
  };

  const currentImage = product.colors[currentImageIndex]?.code ? product.image : product.image;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-16">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={currentImage}
              alt={product.name[lang]}
              className={`w-full rounded-2xl shadow-lg transition-opacity duration-500 ${isImageChanging ? 'opacity-0' : 'opacity-100'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {product.colors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsImageChanging(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsImageChanging(false);
                  }, 200);
                }}
                className={clsx(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentImageIndex === index
                    ? "bg-[#d1b16a] w-6"
                    : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111]">{product.name[lang]}</h1>
              <p className="text-sm text-gray-600 mt-2">{product.desc[lang]}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleFavoriteClick}
              className="glass w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            >
              <FiHeart
                size={24}
                className={isFavorite(product.id) ? "text-red-500 fill-current" : "text-gray-400"}
              />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-[#d1b16a]"
          >
            {product.price} {t("egp")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="font-semibold mb-3 text-[#111]">{t("color")}:</p>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  className={clsx(
                    "color-selector w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200",
                    selectedColor === color.name[lang]
                      ? "selected ring-2 ring-[#d1b16a] border-[#d1b16a]"
                      : "border-gray-300 hover:border-[#d1b16a]"
                  )}
                  style={{ backgroundColor: color.code }}
                  title={color.name[lang]}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="font-semibold mb-3 text-[#111]">{t("size")}:</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                    selectedSize === size
                      ? "bg-[#d1b16a] text-black border-[#d1b16a] shadow-lg"
                      : "text-gray-600 border-gray-300 hover:border-[#d1b16a] hover:text-[#d1b16a]"
                  )}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass p-4 rounded-xl"
          >
            <h3 className="font-bold text-lg mb-3 text-[#111]">{t("specs")}</h3>
            <div className="space-y-2">
              {product.specs[lang].map(([key, value], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium text-[#111]">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <GlassButton
              onClick={handleAddToCart}
              className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-lg py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FiShoppingCart size={20} />
              {t("addToCart")}
            </GlassButton>
          </motion.div>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <SectionTitle>
            {lang === "ar" ? "منتجات مشابهة" : "Related Products"}
          </SectionTitle>
          <div className="mobile-product-grid sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="product-card mobile-product-card glass p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-300"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 transition-transform duration-300 will-change-transform"
                  />
                  <div className="product-info">
                    <h3 className="mobile-product-title text-sm font-medium text-[#111] line-clamp-2">{item.name[lang]}</h3>
                    <p className="mobile-product-price text-[#d1b16a] font-bold mt-1">{item.price} {t("egp")}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
