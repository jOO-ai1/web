import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLang, useTranslation } from '../../contexts/LangContext';
import GlassButton from '../GlassButton';
import { motion } from 'framer-motion';

export default function EmptyCart() {
  const { lang } = useLang();
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-20 text-center"
    >
      <FiShoppingCart size={80} className="mx-auto mb-6 text-[#d1b16a]" />
      <h1 className="text-3xl font-bold mb-4 text-[#111]">{t("empty")}</h1>
      <p className="text-gray-600 mb-8">
        {lang === "ar" ? "ابدأ التسوق الآن واكتشف مجموعتنا الرائعة" : "Start shopping now and discover our amazing collection"}
      </p>
      <Link to="/products">
        <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80">
          {t("shopNow")}
        </GlassButton>
      </Link>
    </motion.div>
  );
}
