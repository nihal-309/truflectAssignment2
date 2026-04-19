'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header onBarcodeClick={() => {}} />
      <main className="bg-[#0F172A] min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Starry Background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: Math.random() * 2 + 's',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="text-8xl md:text-9xl font-bold text-[#6366F1] mb-4">
            404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F1F5F9] mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-[#CBD5E1] mb-8 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>

          <Link href="/">
            <Button size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Floating Emoji */}
        <div className="absolute bottom-8 left-8 text-6xl animate-bounce">
          🍔
        </div>
      </main>
    </>
  );
}
