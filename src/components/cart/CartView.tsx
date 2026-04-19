'use client';

import React from 'react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-[#CBD5E1] mb-4 text-lg">Your cart is empty</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#F1F5F9]">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#1E293B] rounded-lg p-4 border border-[#334155] flex gap-4"
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={item.product.image_url || item.product.image_front_url || 'https://via.placeholder.com/100'}
                alt={item.product.product_name}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                }}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-[#F1F5F9] font-semibold text-lg mb-1">
                {item.product.product_name || 'Unknown Product'}
              </h3>
              {item.variant && (
                <p className="text-[#CBD5E1] text-sm mb-2">
                  Variant: {item.variant}
                </p>
              )}
              <p className="text-[#94A3B8] text-sm">
                {item.product.categories_tags?.[0] || 'Uncategorized'}
              </p>
            </div>

            {/* Quantity & Delete */}
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-[#0F172A] rounded px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-[#6366F1] hover:text-[#EC4899] px-2"
                >
                  −
                </button>
                <span className="text-[#F1F5F9] font-semibold px-3">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-[#6366F1] hover:text-[#EC4899] px-2"
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                title="Remove from cart"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
        <div className="space-y-4">
          <div className="flex justify-between text-[#CBD5E1]">
            <span>Subtotal:</span>
            <span>${(totalPrice * 0.95).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#CBD5E1]">
            <span>Tax (5%):</span>
            <span>${(totalPrice * 0.05).toFixed(2)}</span>
          </div>
          <div className="border-t border-[#334155] pt-4 flex justify-between text-[#F1F5F9] text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </div>
      </div>

      {/* Continue Shopping */}
      <Link href="/" className="block">
        <Button variant="secondary" className="w-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};
