import React from 'react';
import { BRAND } from '../constants/brand';
import { useLang, useTranslation } from '../contexts/LangContext';

export default function AppFooter() {
  const { lang } = useLang();
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass bg-white/20 border-t border-white/20 py-6 text-center mt-24">
      <div className="flex flex-col items-center gap-2 px-4">
        <span className="font-montserrat font-bold tracking-widest text-[#111] uppercase">
          {BRAND.name}
        </span>
        <span className="text-[#666] text-sm leading-relaxed max-w-xl">
          {lang === "ar"
            ? `© ${currentYear} جميع الحقوق محفوظة لـ ${BRAND.name}. مقر الشركة: ${BRAND.city}، ${BRAND.country}.`
            : `© ${currentYear} All rights reserved for ${BRAND.name}. HQ: ${t("companyLocation")}.`}
        </span>
      </div>
    </footer>
  );
}
