import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { BRAND } from '../constants/brand';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import MobileMenu from './MobileMenu';

export default function AppHeader() {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { cart } = useCart();
  const t = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-[#d1b16a]/40 flex items-center justify-between px-6 py-4 shadow-lg">
      <Link to="/" className="font-montserrat font-bold tracking-widest text-2xl text-[#d1b16a]">
        {BRAND.name}
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-3">
        <Link to="/products" className="hover:text-[#d1b16a] transition-colors px-3 py-2">
          {t("products")}
        </Link>
        <Link to="/collections" className="hover:text-[#d1b16a] transition-colors px-3 py-2">
          {t("collections")}
        </Link>
        <Link to="/cart" className="hover:text-[#d1b16a] transition-colors flex items-center gap-1 relative px-3 py-2">
          <FiShoppingCart />
          {Array.isArray(cart) && cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#d1b16a] text-black rounded-full px-2 text-xs font-bold">
              {cart.length}
            </span>
          )}
        </Link>
        
        <div className="flex items-center gap-2 ml-4">
          <button 
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <button 
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors font-semibold" 
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <Link 
            to={user ? "/account" : "/login"} 
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors"
          >
            <FiUser />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
     const [menuOpen, setMenuOpen] = useState(false);
// مرر القيم المطلوبة مثل user, logout, cart.length, lang, setLang, theme, setTheme, t
<button onClick={() => setMenuOpen(true)} className="md:hidden p-2"><FiMenu /></button>
<MobileMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  user={user}
  logout={logout}
  cartLength={cart.length}
  lang={lang}
  setLang={setLang}
  theme={theme}
  setTheme={setTheme}
  t={t}
/>import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiUser, FiShoppingCart, FiFileText, FiBox, FiSettings, FiLogIn, FiLogOut, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import clsx from "clsx";

// يمكنك جلب هذه الدوال/المتغيرات حسب مشروعك
// import { useAuth } from "./App";
// import { useLang, t } from "./App";
// import { useTheme } from "./App";
// import { useCart } from "./App";

export default function MobileMenu({ open, onClose, user, logout, cartLength, lang, setLang, theme, setTheme, t }) {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  // قائمة الروابط الأساسية
  const links = [
    { to: "/", label: t("home"), icon: null },
    { to: "/products", label: t("products"), icon: <FiShoppingCart /> },
    { to: "/collections", label: t("collections"), icon: null },
    { to: "/cart", label: t("cart"), icon: <FiShoppingCart />, badge: cartLength },
    { to: "/account", label: t("account"), icon: <FiUser />, auth: true },
    { to: "/orders", label: t("orders"), icon: <FiFileText />, auth: true },
    { to: "/order-tracking", label: t("orderTracking"), icon: <FiBox />, auth: true },
  ];

  // إغلاق المينيو عند اختيار رابط
  function handleNavigate(to) {
    onClose();
    navigate(to);
  }

  return (
    <div className={clsx(
      "fixed inset-0 z-[99] transition-all duration-300",
      open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
    )}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* القائمة */}
      <div className={clsx(
        "absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white dark:bg-[#26221a] glass flex flex-col shadow-2xl transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-[#d1b16a]">
          <span className="text-xl font-bold flex items-center gap-2">
            <FiSettings /> {t("settings")}
          </span>
          <button onClick={onClose} className="text-2xl"><FiX /></button>
        </div>
        <div className="flex-1 flex flex-col gap-1 p-4">
          {links.map(link =>
            (!link.auth || user) && (
              <button
                key={link.to}
                className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[#d1b16a]/20 font-semibold text-lg"
                onClick={() => handleNavigate(link.to)}
              >
                {link.icon}
                {link.label}
                {link.badge > 0 && (
                  <span className="ml-auto bg-[#d1b16a] text-black rounded-full px-2 text-xs">{link.badge}</span>
                )}
              </button>
            )
          )}
          {/* تسجيل الدخول/الخروج */}
          {!user ? (
            <button
              className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[#d1b16a]/30 font-semibold text-lg"
              onClick={() => handleNavigate("/login")}
            >
              <FiLogIn /> {t("login")}
            </button>
          ) : (
            <button
              className="flex items-center gap-3 py-2 px-2 rounded hover:bg-red-200 font-semibold text-lg text-red-700 mt-2"
              onClick={() => { logout(); onClose(); }}
            >
              <FiLogOut /> {t("logout")}
            </button>
          )}

          {/* الإعدادات (المظهر/اللغة) */}
          <div className="mt-4 pt-2 border-t border-[#d1b16a]/30 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FiSun />
              <span>{t("appearance")}</span>
              <button className={clsx("ml-auto border rounded px-2 py-1 glass", theme === "light" ? "bg-[#d1b16a] text-[#111]" : "")} onClick={() => setTheme("light")}>
                <FiSun /> {t("light")}
              </button>
              <button className={clsx("ml-2 border rounded px-2 py-1 glass", theme === "dark" ? "bg-[#d1b16a] text-[#111]" : "")} onClick={() => setTheme("dark")}>
                <FiMoon /> {t("dark")}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe />
              <span>{t("language")}</span>
              <button className={clsx("ml-auto border rounded px-2 py-1 glass", lang === "en" ? "bg-[#d1b16a] text-[#111]" : "")} onClick={() => setLang("en")}>
                English
              </button>
              <button className={clsx("ml-2 border rounded px-2 py-1 glass", lang === "ar" ? "bg-[#d1b16a] text-[#111]" : "")} onClick={() => setLang("ar")}>
                العربية
              </button>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="m-4 px-5 py-2 border rounded bg-[#d1b16a] text-[#111] font-bold flex items-center gap-2">
          <FiX /> {t("close")}
        </button>
      </div>
    </div>
  );
}
      