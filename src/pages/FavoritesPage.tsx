<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
  className="container mx-auto py-10 px-4"
>
  <SectionTitle>{t("favorites")}</SectionTitle>

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
    {favoriteProducts.map((product, index) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ y: -4 }}
        className="product-card glass p-2 sm:p-4 rounded-2xl shadow-md border border-white/20 group transition-all duration-300"
      >
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-28 sm:h-40 object-cover transition-transform duration-500"
          />
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-2 right-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
          >
            <FiHeart size={16} className="text-red-500 fill-current" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-sm sm:text-base text-[#111] line-clamp-2">
            {product.name[lang]}
          </h3>
          <p className="text-[#d1b16a] font-bold text-base sm:text-lg">
            {product.price} {t("egp")}
          </p>
          <p className="text-gray-600 text-xs line-clamp-2">
            {product.desc[lang]}
          </p>

          <div className="flex gap-2 pt-1">
            <Link to={`/product/${product.id}`} className="flex-1">
              <GlassButton className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-xs py-2 transition-all duration-200 hover:shadow-md">
                {lang === "ar" ? "عرض التفاصيل" : "View Details"}
              </GlassButton>
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
