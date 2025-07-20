import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-7 font-montserrat tracking-widest text-[#111]">
      {children}
    </h2>
  );
}