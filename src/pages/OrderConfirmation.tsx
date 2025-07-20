import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import { useLang, useTranslation } from '../contexts/LangContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export default function OrderConfirmation() {
  const location = useLocation();
  const { name = '---', address = '---', total = '---' } = location.state || {};
  const { lang } = useLang();
  const t = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
      >
        <GlassCard className="text-center">
          <FiCheckCircle className="text-green-500 mx-auto mb-6" size={80} />

          <h1 className="text-3xl font-bold text-[#111] mb-2">
            {t("orderConfirmed")}
          </h1>

          <p className="text-gray-600 mb-6">{t("thankYou")}</p>

          <div className="glass p-4 rounded-xl bg-gray-50/70 text-left mb-6 shadow-inner space-y-2">
            <div><strong>{t("deliveredTo")}:</strong> {name}</div>
            <div><strong>{t("address")}:</strong> {address}</div>
            <div>
              <strong>{t("total")}:</strong>{' '}
              <span className="text-[#d1b16a] font-medium">{total} {t("egp")}</span>
            </div>
          </div>

          <Link to="/" className="block w-full">
            <GlassButton className="bg-[#d1b16a] text-black hover:bg-[#d1b16a]/90 w-full justify-center">
              <FiHome className="mr-2" />
              {t("backToHome")}
            </GlassButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}
