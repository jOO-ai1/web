import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";

const CartSummary = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const newTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  if (!cartItems) {
    return <p className="text-center py-10">جاري تحميل السلة...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">السلة فاضية</h2>
        <p>ضيف منتج علشان تبدأ الشراء</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-4">محتويات السلة</h1>
      {cartItems.map((item, index) => (
        <motion.div
          key={item.id || index}
          className="flex justify-between items-center border-b py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.color}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p>{item.price * item.quantity} ج.م</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-red-500 mt-2"
            >
              حذف
            </button>
          </div>
        </motion.div>
      ))}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">الإجمالي: {total} ج.م</p>
      </div>
    </motion.div>
  );
};

export default CartSummary;
