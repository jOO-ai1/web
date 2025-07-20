import React from 'react';
import { BRAND } from '../constants/brand';
import { useLang, useTranslation } from '../contexts/LangContext';

export default function AppFooter() {
  const { lang } = useLang();
  const t = useTranslation();
  
  return (
    <footer className="glass bg-white/20 border-t border-white/20 py-6 text-center mt-24">
      <div className="flex flex-col items-center gap-2">
        <span className="font-montserrat font-bold tracking-widest text-[#111]">
          {BRAND.name}
        </span>
        <span className="text-[#888] text-sm">
          {lang === "ar"
            ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة لـ ${BRAND.name}. مقر الشركة: ${BRAND.city}، ${BRAND.country}.`
            : `© ${new Date().getFullYear()} All rights reserved for ${BRAND.name}. HQ: ${t("companyLocation")}.`
          }
        </span>
      </div>
    </footer>
  );
}