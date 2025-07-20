import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiGrid, FiBox, FiSun, FiMoon, FiGlobe, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import GlassButton from './GlassButton';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const t = useTranslation();

  const menuItems = [
    { to: "/", icon: <FiGrid />, label: t("home") },
    { to: "/products", icon: <FiShoppingCart />, label: t("products") },
    { to: "/collections", icon: <FiBox />, label: t("collections") },
    { to: "/cart", icon: <FiShoppingCart />, label: t("cart"), badge: cart.length > 0 ? cart.length : null },
  ];

  const accountItems = user ? [
    { to: "/account", icon: <FiUser />, label: t("account") },
    { to: "/orders", icon: <FiBox />, label: t("orders") },
  ] : [
    { to: "/login", icon: <FiUser />, label: t("login") },
    { to: "/register", icon: <FiUser />, label: t("register") },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden glass p-2 rounded-lg border border-[#d1b16a]/40"
      >
        <FiMenu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={clsx(
                "fixed top-0 w-80 h-full glass border-r border-[#d1b16a]/40 z-[110] md:hidden overflow-y-auto",
                lang === 'ar' ? 'right-0 border-l' : 'left-0'
              )}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#d1b16a] font-montserrat tracking-widest">
                    {t("menu")}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="glass p-2 rounded-lg border border-[#d1b16a]/40 hover:bg-[#d1b16a]/20 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="glass p-4 rounded-xl mb-6 border border-[#d1b16a]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#d1b16a]/20 rounded-full flex items-center justify-center">
                        <FiUser size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111]">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Navigation */}
                <nav className="space-y-2 mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    {t("menu")}
                  </h3>
                  {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#d1b16a]/20 transition-colors relative"
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="absolute right-3 bg-[#d1b16a] text-black text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Account Section */}
                <nav className="space-y-2 mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    {t("account")}
                  </h3>
                  {accountItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#d1b16a]/20 transition-colors"
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  
                  {user && (
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-100 transition-colors text-red-600 w-full"
                    >
                      <FiLogOut />
                      <span className="font-medium">{t("logout")}</span>
                    </button>
                  )}
                </nav>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {t("settings")}
                  </h3>
                  
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-3 glass rounded-xl">
                    <div className="flex items-center gap-3">
                      {theme === "dark" ? <FiSun /> : <FiMoon />}
                      <span className="font-medium">{t("appearance")}</span>
                    </div>
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="px-3 py-1 text-sm bg-[#d1b16a]/20 rounded-lg hover:bg-[#d1b16a]/30 transition-colors"
                    >
                      {theme === "dark" ? t("light") : t("dark")}
                    </button>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex items-center justify-between p-3 glass rounded-xl">
                    <div className="flex items-center gap-3">
                      <FiGlobe />
                      <span className="font-medium">{t("language")}</span>
                    </div>
                    <button
                      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                      className="px-3 py-1 text-sm bg-[#d1b16a]/20 rounded-lg hover:bg-[#d1b16a]/30 transition-colors"
                    >
                      {lang === "ar" ? "EN" : "AR"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}