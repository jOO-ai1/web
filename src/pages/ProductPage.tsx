import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import clsx from "clsx";
import { useLang, useTranslation } from "../contexts/LangContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";

export default function ProductPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addToFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div className="p-4">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 p-4 sm:p-8">
      <div className="w-full lg:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl shadow-md object-cover max-h-[500px]"
        />
      </div>

      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize text-gray-800">
            {product.name}
          </h1>
          <button
            onClick={() => addToFavorites(product)}
            className={clsx(
              "text-xl p-2 rounded-full",
              isFavorite(product.id)
                ? "text-red-500 bg-red-100"
                : "text-gray-500 hover:text-red-500"
            )}
          >
            <FiHeart />
          </button>
        </div>

        <p className="text-gray-600 leading-relaxed max-w-prose">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700">
            {t("price")}:
          </span>
          <span className="text-xl font-bold text-black">
            ${product.price}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 flex items-center gap-2"
          >
            <FiShoppingCart />
            {isAddedToCart ? t("added") : t("addToCart")}
          </button>

          <button
            onClick={() => setShowOptions((prev) => !prev)}
            className="border border-gray-300 px-6 py-3 rounded-2xl hover:bg-gray-100"
          >
            {t("moreDetails")}
          </button>
        </div>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden text-sm text-gray-700 space-y-2"
            >
              <p>
                <strong>{t("category")}:</strong> {product.category}
              </p>
              <p>
                <strong>{t("collection")}:</strong> {product.collection}
              </p>
              <p>
                <strong>{t("material")}:</strong> {product.material}
              </p>
              <p>
                <strong>{t("colors")}: </strong>
                {product.colors?.join(", ") || t("notAvailable")}
              </p>
              <p>
                <strong>{t("sizes")}:</strong>
                {product.sizes?.join(", ") || t("notAvailable")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
