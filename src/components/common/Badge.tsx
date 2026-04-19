'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'grade' | 'category' | 'label';
  grade?: string;
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'category',
  grade,
  label,
  className = '',
}) => {
  const baseStyles = 'inline-block px-3 py-1 rounded-full text-sm font-semibold';

  const gradeStyles: Record<string, string> = {
    A: 'bg-[#10B981] text-white',
    B: 'bg-[#F59E0B] text-white',
    C: 'bg-[#FBBF24] text-white',
    D: 'bg-[#FB923C] text-white',
    E: 'bg-[#EF4444] text-white',
  };

  const categoryStyles = `
    bg-[#14B8A6] text-white
  `;

  const labelStyles = `
    bg-[#E5E7EB] text-[#1F2937] dark:bg-[#334155] dark:text-[#F1F5F9]
    border border-[#D1D5DB] dark:border-[#475569]
  `;

  let content = '';
  let styles = '';

  switch (variant) {
    case 'grade':
      content = grade?.toUpperCase() || 'N/A';
      styles = gradeStyles[grade?.toUpperCase() || 'N/A'] || 'bg-gray-400 text-white';
      break;
    case 'category':
      content = label || 'Category';
      styles = categoryStyles;
      break;
    case 'label':
      content = label || 'Label';
      styles = labelStyles;
      break;
    default:
      content = label || 'Badge';
      styles = categoryStyles;
  }

  return (
    <span className={`${baseStyles} ${styles} ${className}`}>
      {content}
    </span>
  );
};
