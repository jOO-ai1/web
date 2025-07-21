import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassButton({ children, className = "", ...props }: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 8px 25px rgba(209, 177, 106, 0.3)",
        y: -2
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={clsx(
        "glass px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold uppercase border border-[#d1b16a] rounded-xl shadow flex items-center justify-center gap-2 min-h-[44px] will-change-transform",
        "hover:bg-[#d1b16a]/70 hover:text-[#111] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}