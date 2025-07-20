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

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-[#d1b16a]/40 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 shadow-lg">
      {/* Logo */}
      <Link to="/" className="font-montserrat font-bold tracking-widest text-xl md:text-2xl text-[#d1b16a]">
        {BRAND.name}
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-3">
        {/* Links */}
        <Link to="/products" className="hover:text-[#d1b16a] transition-colors px-3 py-2">
          {t("products")}
        </Link>
        <Link to="/collections" className="hover:text-[#d1b16a] transition-colors px-3 py-2">
          {t("collections")}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="hover:text-[#d1b16a] transition-colors relative flex items-center gap-1 px-3 py-2">
          <FiShoppingCart />
          {Array.isArray(cart) && cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d1b16a] text-black rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          {/* Theme Switcher */}
          <button
            aria-label="Toggle Theme"
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {/* Language Switcher */}
          <button
            aria-label="Switch Language"
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors font-semibold"
            onClick={toggleLang}
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {/* Account/Login */}
          <Link
            to={user ? "/account" : "/login"}
            className="glass border rounded-lg px-3 py-2 hover:bg-[#d1b16a]/20 transition-colors"
          >
            <FiUser />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu />
    </header>
  );
}
