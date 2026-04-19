'use client';

import React from 'react';
import { Review } from '@/types';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header with Average Rating */}
      <div>
        <h3 className="text-2xl font-bold text-[#F1F5F9] mb-2">Customer Reviews</h3>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-2xl">
                  {i < Math.floor(Number(averageRating)) ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <p className="text-[#CBD5E1] mt-1">
              {averageRating} out of 5 ({reviews.length} reviews)
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {reviews.length === 0 ? (
          <p className="text-[#94A3B8] text-center py-8">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#0F172A] rounded-lg p-4 border border-[#334155]"
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < review.rating ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#94A3B8]">{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-[#CBD5E1] mb-2">{review.text}</p>

              {/* Author */}
              <p className="text-sm text-[#94A3B8]">— {review.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
