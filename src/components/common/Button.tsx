'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = `
    transition-all duration-200 ease-in-out
    font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-[#6366F1] text-white
      hover:bg-[#5558E3] hover:shadow-lg
      focus:ring-[#6366F1]
    `,
    secondary: `
      bg-transparent border-2 border-[#6366F1] text-[#6366F1]
      hover:bg-[#6366F1] hover:text-white
      focus:ring-[#6366F1]
    `,
    icon: `
      bg-[#EC4899] text-white
      hover:bg-[#EC1999] hover:shadow-md
      focus:ring-[#EC4899]
      w-10 h-10 flex items-center justify-center
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
