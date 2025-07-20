import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiCreditCard, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import { COUPONS } from '../constants/brand';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import SectionTitle from '../components/SectionTitle';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [removeItem, setRemoveItem] = useState<any>(null);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<any>(null);

  function handleApplyCoupon() {
    const found = COUPONS.find(c => c.code.toUpperCase() === coupon.trim().toUpperCase());
    if (!found) {
      showToast(t("invalidCoupon"));
      setApplied(null);
    } else {
      setApplied(found);
      showToast(t("couponApplied"));
    }
  }

  let subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  let discount = applied?.discount ? Math.floor((subtotal * applied.discount) / 100) : 0;
  let shipping = 60;
  if (applied?.freeShipping) shipping = 0;
  let total = subtotal - discount + (cart.length > 0 ? shipping : 0);

  function askRemove(item: any) {
    setRemoveItem(item);
    setShowConfirm(true);
  }

  function confirmRemove() {
    removeFromCart(removeItem.id, removeItem.color, removeItem.size);
    setShowConfirm(false);
    showToast(t("removeSuccess"));
  }

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto py-20 text-center"
      >
        <FiShoppingCart size={80} className="mx-auto mb-6 text-[#d1b16a]" />
        <h1 className="text-3xl font-bold mb-4 text-[#111]">{t("empty")}</h1>
        <p className="text-gray-600 mb-8">
          {lang === "ar" ? "ابدأ التسوق الآن واكتشف مجموعتنا الرائعة" : "Start shopping now and discover our amazing collection"}
        </p>
        <Link to="/products">
          <GlassButton className="bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80">
            {t("shopNow")}
          </GlassButton>
        </Link>
      </motion.div>
    );
  }

  const handleQty = (item: any, diff: number) => {
    const newQty = item.qty + diff;
    if (newQty < 1) return;
    updateQty(item.id, item.color, item.size, newQty);
    showToast(t("updateSuccess"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-10"
    >
      <SectionTitle>{t("cart")}</SectionTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/20 hover:shadow-lg transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name[lang]} 
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{item.name[lang]}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{t("color")}: {item.color}</div>
                      <div>{t("size")}: {item.size}</div>
                    </div>
                    <div className="text-[#d1b16a] font-bold text-lg mt-2">
                      {item.price * item.qty} {t("egp")}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQty(item, -1)}
                      className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#d1b16a]/20 transition-colors"
                    >
                      <FiMinus />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{item.qty}</span>
                    <button
                      onClick={() => handleQty(item, 1)}
                      className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#d1b16a]/20 transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => askRemove(item)}
                    className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Order Summary */}
        <div>
          <GlassCard>
            <h3 className="text-xl font-bold mb-6">{t("total")}</h3>
            
            {/* Coupon Section */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2">
                <input
                  className="glass border border-[#d1b16a]/40 px-3 py-2 rounded-lg flex-1 font-montserrat"
                  placeholder={lang === "ar" ? "أدخل كود الكوبون" : "Enter coupon code"}
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  disabled={!!applied}
                />
                <GlassButton 
                  onClick={handleApplyCoupon} 
                  disabled={!!applied}
                  className="px-4"
                >
                  {applied ? t("applied") : t("applyCoupon")}
                </GlassButton>
              </div>
              {applied && (
                <div className="text-green-600 font-semibold text-sm bg-green-50 p-2 rounded-lg">
                  ✓ {applied.desc[lang]}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span>{lang === "ar" ? "الإجمالي قبل الخصم" : "Subtotal"}:</span>
                <span className="font-bold">{subtotal} {t("egp")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t("couponDiscount")}:</span>
                  <span className="font-bold">-{discount} {t("egp")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t("shipping")}:</span>
                <span className="font-bold">
                  {shipping === 0 ? t("free") : `${shipping} ${t("egp")}`}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>{t("total")}:</span>
              <span className="text-[#d1b16a]">{total} {t("egp")}</span>
            </div>
            
            <div className="space-y-3">
              <GlassButton 
                onClick={() => navigate("/checkout", { state: { appliedCoupon: applied } })}
                className="w-full bg-[#d1b16a] text-black border-none hover:bg-[#d1b16a]/80"
              >
                <FiCreditCard />
                {t("checkout")}
              </GlassButton>
              
              <GlassButton 
                className="w-full bg-gray-400 text-black hover:bg-gray-500 border-none" 
                onClick={() => {
                  clearCart();
                  showToast(t("cartEmptied"));
                }}
              >
                <FiTrash2 />
                {t("emptyCart")}
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
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
                {removeItem?.name[lang]} - {removeItem?.color} - {removeItem?.size}
              </p>
              <div className="flex gap-3 justify-center">
                <GlassButton 
                  className="bg-red-500 text-white border-none hover:bg-red-600" 
                  onClick={confirmRemove}
                >
                  {t("yesRemove")}
                </GlassButton>
                <GlassButton onClick={() => setShowConfirm(false)}>
                  {t("cancel")}
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}