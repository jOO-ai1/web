import React from 'react';
import clsx from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={clsx("glass p-6 rounded-2xl shadow-xl border border-white/25", className)}>
      {children}
    </div>
  );
}