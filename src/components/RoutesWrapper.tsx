import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLang } from './contexts/LangContext';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import ProtectedRoute from './components/ProtectedRoute';
// Scroll handler
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRoutes() {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "font-arabic" : "font-montserrat"}>
      <Router>
        <ScrollToTop />
        <AppHeader />

        <main className="pt-28 min-h-[80vh] bg-app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/collections" element={<Home />} />
            <Route path="/collections/:id" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <AppFooter />
      </Router>
    </div>
  );
}
