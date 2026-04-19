'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Cart } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <>
      <Header onBarcodeClick={() => {}} showCart={false} />
      <main className="bg-[#0F172A] min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-6 max-w-4xl">
          <Cart />
        </div>
      </main>
    </>
  );
}
