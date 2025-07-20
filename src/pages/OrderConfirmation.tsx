import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import { useLang, useTranslation } from '../contexts/LangContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export default function OrderConfirmation() {
  const location = useLocation();
  const { name, address, total } = location.state || {};
  const { lang } = useLang();
  const t = useTranslation();

  return (
    <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <GlassCard className="text-center max-w-md">
          <FiCheckCircle className="text-green-500 mx-auto mb-6" size={80} />
          <h1 className="text-3xl font-bold mb-4 text-[#111]">{t("orderConfirmed")}</h1>
          <p className="text-lg mb-6 text-gray-600">{t("thankYou")}</p>
          
          <div className="glass p-4 rounded-xl bg-gray-50/50 mb-6 text-left">
            <div className="space-y-2">
              <div><strong>{t("deliveredTo")}:</strong> {name}</div>
              <div><strong>{t("address")}:</strong> {address}</div>
              <div><strong>{t("total")}:</strong> <span className="text-[#d1b16a]">{total} {t("egp")}</span></div>
            </div>
          </div>
          
          <Link to="/">
            <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80">
              <FiHome />
              {t("backToHome")}
            </GlassButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}