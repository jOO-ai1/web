import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiUser, FiMapPin } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { lang } = useLang();
  const t = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const applied = location.state?.appliedCoupon || null;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });

  let subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  let discount = applied?.discount ? Math.floor((subtotal * applied.discount) / 100) : 0;
  let shipping = 60;
  if (applied?.freeShipping) shipping = 0;
  let total = subtotal - discount + (cart.length > 0 ? shipping : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/order-confirmation", { state: { ...formData, total } });
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-xl">{t("empty")}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-10 px-4 max-w-2xl"
    >
      <GlassCard>
        <h1 className="text-3xl font-bold mb-8 text-center font-montserrat">{t("checkout")}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiUser className="inline mr-2" />
              {t("fullName")}
            </label>
            <input
              required
              className="w-full glass border border-[#d1b16a]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d1b16a]"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder={lang === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiMapPin className="inline mr-2" />
              {t("address")}
            </label>
            <textarea
              required
              rows={3}
              className="w-full glass border border-[#d1b16a]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d1b16a] resize-none"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              placeholder={lang === "ar" ? "أدخل عنوانك كاملاً" : "Enter your complete address"}
            />
          </div>

          <div className="glass p-4 rounded-xl bg-gray-50/50">
            <h3 className="font-bold text-lg mb-4">{t("total")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{lang === "ar" ? "الإجمالي قبل الخصم" : "Subtotal"}:</span>
                <span>{subtotal} {t("egp")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t("couponDiscount")}:</span>
                  <span>-{discount} {t("egp")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t("shipping")}:</span>
                <span>{shipping === 0 ? t("free") : `${shipping} ${t("egp")}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>{t("total")}:</span>
                <span className="text-[#d1b16a]">{total} {t("egp")}</span>
              </div>
            </div>
          </div>
          
          <GlassButton 
            type="submit" 
            className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80 text-xl py-4"
          >
            <FiCreditCard size={24} />
            {t("placeOrder")}
          </GlassButton>
        </form>
      </GlassCard>
    </motion.div>
  );
}