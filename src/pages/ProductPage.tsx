import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const product = {
  id: 1,
  name: "Soleva Drift Runner",
  description: "حذاء رياضي أنيق ومتين يناسب كل المناسبات.",
  price: 749,
  rating: 4.2,
  reviews: 86,
  image: "/images/shoe.jpg",
  colors: ["black", "gray", "white"],
  sizes: ["40", "41", "42", "43", "44"],
};

const relatedProducts = [
  {
    id: 2,
    name: "Soleva Street Flex",
    price: 699,
    image: "/images/shoe2.jpg",
  },
  {
    id: 3,
    name: "Soleva Urban Walk",
    price: 799,
    image: "/images/shoe3.jpg",
  },
  {
    id: 4,
    name: "Soleva Classic Boost",
    price: 599,
    image: "/images/shoe4.jpg",
  },
  {
    id: 5,
    name: "Soleva Night Runner",
    price: 849,
    image: "/images/shoe5.jpg",
  },
];

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* المنتج */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* صورة المنتج */}
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* التفاصيل */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              <div className="flex items-center gap-1 mt-2 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                ))}
                <span className="text-sm text-gray-600 ms-2">({product.reviews} تقييم)</span>
              </div>
            </div>
            {/* زر المفضلة */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={clsx(
                "p-2 rounded-full border text-xl",
                isFavorite ? "bg-red-100 text-red-500 border-red-300" : "text-gray-400"
              )}
            >
              {isFavorite ? "❤️" : "🤍"}
            </motion.button>
          </div>

          {/* السعر */}
          <p className="text-2xl font-semibold text-black">EGP {product.price}</p>

          {/* الألوان */}
          <div>
            <p className="font-semibold mb-1">اللون:</p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <motion.div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "w-8 h-8 rounded-full border-2 cursor-pointer",
                    selectedColor === color
                      ? "ring-2 ring-black"
                      : "border-gray-300"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* المقاسات */}
          <div>
            <p className="font-semibold mb-1">المقاس:</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    "px-4 py-1 rounded-full border text-sm font-medium",
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "text-gray-600 border-gray-300 hover:border-black"
                  )}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* زر الإضافة */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90 transition"
          >
            أضف للسلة
          </motion.button>
        </div>
      </div>

      {/* منتجات مشابهة */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">منتجات مشابهة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-2xl p-3 shadow hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-gray-700 font-semibold mt-1">EGP {item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
