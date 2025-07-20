import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useLang, useTranslation } from '../contexts/LangContext';
import SectionTitle from '../components/SectionTitle';
import EmptyCart from '../components/cart/EmptyCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import RemoveConfirmModal from '../components/cart/RemoveConfirmModal';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { showToast } = useToast();
  const { lang } = useLang();
  const t = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [removeItem, setRemoveItem] = useState<any>(null);

  const askRemove = (item: any) => {
    setRemoveItem(item);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    removeFromCart(removeItem.id, removeItem.color, removeItem.size);
    setShowConfirm(false);
    showToast(t("removeSuccess"));
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto py-10"
    >
      <SectionTitle>{t("cart")}</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🛒 عناصر السلة */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <CartItem key={i} item={item} index={i} onRemove={askRemove} />
          ))}
        </div>

        {/* 💰 ملخص الطلب */}
        <CartSummary />
      </div>

      {/* 🗑️ تأكيد الحذف */}
      {showConfirm && (
        <RemoveConfirmModal 
          item={removeItem} 
          onCancel={() => setShowConfirm(false)} 
          onConfirm={confirmRemove} 
        />
      )}
    </motion.div>
  );
}
