'use client';

import React from 'react';
import { Product } from '@/types';
import { Badge } from './Badge';
import { getGradeColor } from '@/utils';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const imageUrl = product.image_url || product.image_front_url || 'https://via.placeholder.com/300x300?text=No+Image';
  const category = product.categories_tags?.[0] || 'Uncategorized';
  const grade = product.nutrition_grade || 'N/A';
  const ingredientCount = product.ingredients_text?.split(',').length || 0;

  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--bg-secondary)]
        rounded-lg overflow-hidden
        border border-[var(--border-light)]
        hover:border-[#6366F1] 
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        cursor-pointer
        group
      `}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-[var(--bg-tertiary)] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.product_name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        {/* Grade Badge */}
        <div
          className="absolute top-2 right-2 w-10 h-10 rounded flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: getGradeColor(grade) }}
        >
          {grade}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <h3 className="text-[var(--text-primary)] font-semibold text-base line-clamp-2">
          {product.product_name || 'Unknown Product'}
        </h3>

        {/* Category Badge */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="category" label={category.replace(/[_-]/g, ' ')} />
        </div>

        {/* Meta Info */}
        <div className="text-sm text-[var(--text-secondary)]">
          {ingredientCount > 0 && (
            <p>{ingredientCount} ingredient{ingredientCount !== 1 ? 's' : ''}</p>
          )}
        </div>

        {/* Grade Display */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-light)]">
          <span className="text-xs text-[var(--text-tertiary)]">Nutrition Grade:</span>
          <span
            className="text-sm font-bold px-2 py-1 rounded text-white"
            style={{ backgroundColor: getGradeColor(grade) }}
          >
            {grade}
          </span>
        </div>
      </div>
    </div>
  );
};
