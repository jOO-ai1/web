import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { useTranslation } from '../contexts/LangContext';
import GlassCard from '../components/GlassCard';

export default function OrdersPage() {
  const t = useTranslation();
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <GlassCard>
        <div className="text-center py-12">
          <FiFileText size={64} className="mx-auto mb-4 text-[#d1b16a]" />
          <h1 className="text-2xl font-bold mb-4">{t("orders")}</h1>
          <p className="text-gray-600">{t("ordersPlaceholder")}</p>
        </div>
      </GlassCard>
    </div>
  );
}