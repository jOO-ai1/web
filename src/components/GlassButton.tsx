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
      whileHover={{ scale: 1.07, boxShadow: "0 2px 18px 0 #d1b16a88" }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "glass px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold uppercase border border-[#d1b16a] rounded-xl transition shadow flex items-center justify-center gap-2 min-h-[44px]",
        "hover:bg-[#d1b16a]/70 hover:text-[#111] disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}