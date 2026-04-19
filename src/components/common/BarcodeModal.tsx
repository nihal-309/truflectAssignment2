'use client';

import React, { useState } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (barcode: string) => void;
  isLoading?: boolean;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  isLoading = false,
}) => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!barcode.trim()) {
      setError('Please enter a barcode');
      return;
    }

    if (!/^\d+$/.test(barcode)) {
      setError('Barcode must contain only numbers');
      return;
    }

    onSearch(barcode);
    setBarcode('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1E293B] rounded-lg p-8 w-full max-w-md shadow-2xl z-50">
        <h2 className="text-2xl font-bold text-[#F1F5F9] mb-2">Search by Barcode</h2>
        <p className="text-[#CBD5E1] mb-6">Enter a product barcode to find detailed information</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter barcode (e.g., 737628064502)"
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
              setError('');
            }}
            error={error}
            autoFocus
            icon={<span>📱</span>}
          />

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Search
            </Button>
          </div>
        </form>

        {/* Example Text */}
        <p className="text-xs text-[#94A3B8] mt-4 text-center">
          Don&apos;t have a barcode? Try searching by product name instead.
        </p>
      </div>
    </>
  );
};
