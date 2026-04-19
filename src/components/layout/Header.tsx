'use client';

import React, { useState } from 'react';
import { useTheme } from '@/hooks';
import { useCartStore } from '@/store/cart';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

interface IconProps {
  className?: string;
}

const SearchIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BarcodeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="5" height="5" />
    <rect x="3" y="15" width="5" height="5" />
    <rect x="16" y="4" width="5" height="5" />
    <path d="M16 16h1" />
    <path d="M19 16h2" />
    <path d="M16 19h5" />
  </svg>
);

const SunIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .27-.02.54-.02.81A9 9 0 0 0 20.19 12.8c.27 0 .54-.02.81-.01Z" />
  </svg>
);

const CartIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="9" cy="20" r="1" />
    <circle cx="19" cy="20" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

interface HeaderProps {
  onSearch?: (query: string) => void;
  onBarcodeClick?: () => void;
  showCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onBarcodeClick,
  showCart = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-light)] sticky top-0 z-50 shadow-lg">
      <div className="w-full px-2 py-4 md:px-4">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#EC4899] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              🍽️
            </div>
            <span className="text-[var(--text-primary)] font-bold text-2xl hidden sm:block">
              FoodFacts
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              icon={<SearchIcon />}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Barcode Button */}
            <Button
              variant="icon"
              size="sm"
              onClick={onBarcodeClick}
              title="Search by barcode"
              className="w-10 h-10 md:w-auto md:px-4"
            >
              <BarcodeIcon />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="icon"
              size="sm"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-10 h-10 md:w-auto md:px-4"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>

            {/* Cart Icon */}
            {showCart && (
              <Link href="/cart">
                <Button
                  variant="icon"
                  size="sm"
                  title="View cart"
                  className="w-10 h-10 md:w-auto md:px-4 relative"
                >
                  <CartIcon />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#EC4899] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            icon={<SearchIcon />}
          />
        </div>
      </div>
    </header>
  );
};
