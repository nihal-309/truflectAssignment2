'use client';

import React from 'react';

interface SkeletonProps {
  count?: number;
  className?: string;
}

export const ProductSkeleton: React.FC<SkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#1E293B] dark:bg-[#1E293B] rounded-lg overflow-hidden"
        >
          <div className="skeleton h-48 w-full" />
          <div className="p-4 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="flex gap-2">
              <div className="skeleton h-6 w-20" />
              <div className="skeleton h-6 w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const DetailPageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="skeleton h-[500px] rounded-lg" />

        {/* Details */}
        <div className="space-y-6">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-20" />
            <div className="skeleton h-8 w-20" />
          </div>
          <div className="skeleton h-12 w-full" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
