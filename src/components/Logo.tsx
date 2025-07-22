import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'medium', showText = true }: LogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-16 w-auto'
  };

  const logoSrc = theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';

  if (!showText) {
    return (
      <Link to="/" className={`flex items-center ${className}`}>
        <img 
          src={logoSrc} 
          alt="Soleva" 
          className={sizeClasses[size]}
        />
      </Link>
    );
  }

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Soleva - Made to Move" 
        className={sizeClasses[size]}
      />
    </Link>
  );
}