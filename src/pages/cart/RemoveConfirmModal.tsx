import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLang, useTranslation } from '../../contexts/LangContext';
import GlassCard from '../GlassCard';
import GlassButton from '../GlassButton';

export default function RemoveConfirmModal({ item, onCancel, onConfirm }: {
  item: any;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { lang } = useLang();
  const t = useTranslation();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <GlassCard className="max-w-sm w-full text-center">
          <FiTrash2 size={48} className="mx-auto mb-4 text-red-500" />
          <h3 className="text-xl font-bold mb-2">{t("confirmRemove")}</h3>
          <p className="text-gray-600 mb-6">
            {item?.name[lang]} - {item?.color} - {item?.size}
          </p>
          <div className="flex gap-3 justify-center">
            <GlassButton 
              className="bg-red-500 text-white border-none hover:bg-red-600" 
              onClick={onConfirm}
            >
              {t("yesRemove")}
            </GlassButton>
            <GlassButton onClick={onCancel}>
              {t("cancel")}
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
