'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Reviews } from '@/components/products/Reviews';
import { DetailPageSkeleton } from '@/components/common/Skeleton';
import { Product, Review } from '@/types';
import { foodFactsAPI } from '@/api/foodfacts';
import { useCartStore } from '@/store/cart';
import { getGradeColor, generateRandomReviews, formatNutrientValue } from '@/utils';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const barcode = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await foodFactsAPI.getByBarcode(barcode);
        if (response.product) {
          setProduct(response.product);
          // Generate randomized reviews
          setReviews(generateRandomReviews(barcode, 5));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Header onBarcodeClick={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <DetailPageSkeleton />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header onBarcodeClick={() => {}} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-[#EF4444] mb-4">Not Found</h1>
          <p className="text-[#CBD5E1] mb-6">{error || 'Product not found'}</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </>
    );
  }

  const imageUrl =
    product.image_url ||
    product.image_front_url ||
    'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <>
      <Header onBarcodeClick={() => {}} />

      <main className="bg-[#0F172A] min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[#94A3B8]">
            <Link href="/" className="hover:text-[#6366F1]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#F1F5F9]">{product.product_name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="bg-[#1E293B] rounded-lg p-4 w-full aspect-square flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={product.product_name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/400x400?text=No+Image';
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#F1F5F9] mb-2">
                  {product.product_name}
                </h1>
                {product.brands && (
                  <p className="text-[#CBD5E1]">By {product.brands}</p>
                )}
              </div>

              {/* Category & Grade */}
              <div className="flex flex-wrap gap-2">
                {product.categories_tags?.[0] && (
                  <Badge
                    variant="category"
                    label={product.categories_tags[0].replace(/[_-]/g, ' ')}
                  />
                )}
                {product.nutrition_grade && (
                  <Badge variant="grade" grade={product.nutrition_grade} />
                )}
              </div>

              {/* Barcode */}
              {product.code && (
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <p className="text-sm text-[#94A3B8] mb-1">Barcode</p>
                  <p className="font-mono text-[#F1F5F9]">{product.code}</p>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#6366F1] hover:text-[#EC4899] text-lg"
                    >
                      −
                    </button>
                    <span className="text-[#F1F5F9] font-semibold px-4 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-[#6366F1] hover:text-[#EC4899] text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button onClick={handleAddToCart} className="w-full text-lg py-3">
                  {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
                </Button>
              </div>

              {/* Labels */}
              {product.labels_tags && product.labels_tags.length > 0 && (
                <div>
                  <p className="text-sm text-[#94A3B8] mb-2">Labels</p>
                  <div className="flex flex-wrap gap-2">
                    {product.labels_tags.slice(0, 5).map((label) => (
                      <Badge
                        key={label}
                        variant="label"
                        label={label.replace(/[_-]/g, ' ')}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Description & Ingredients */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {product.generic_name && (
                <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
                  <h3 className="text-xl font-bold text-[#F1F5F9] mb-3">
                    About
                  </h3>
                  <p className="text-[#CBD5E1]">{product.generic_name}</p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients_text && (
                <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
                  <h3 className="text-xl font-bold text-[#F1F5F9] mb-3">
                    Ingredients
                  </h3>
                  <p className="text-[#CBD5E1] whitespace-pre-wrap">
                    {product.ingredients_text}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && (
                <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
                  <h3 className="text-xl font-bold text-[#EF4444] mb-3">
                    ⚠️ Allergens
                  </h3>
                  <p className="text-[#CBD5E1]">{product.allergens}</p>
                </div>
              )}
            </div>

            {/* Right Column: Nutrition */}
            <div className="space-y-6">
              {/* Nutrition Facts */}
              {product.nutriments && (
                <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
                  <h3 className="text-xl font-bold text-[#F1F5F9] mb-4">
                    Nutritional Value
                  </h3>
                  <div className="space-y-3 text-sm">
                    {product.energy_kcal && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Energy:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.energy_kcal, ' kcal')}
                        </span>
                      </div>
                    )}
                    {product.proteins && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Protein:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.proteins, 'g')}
                        </span>
                      </div>
                    )}
                    {product.fat && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Fat:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.fat, 'g')}
                        </span>
                      </div>
                    )}
                    {product.carbohydrates && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Carbs:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.carbohydrates, 'g')}
                        </span>
                      </div>
                    )}
                    {product.sugars && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Sugars:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.sugars, 'g')}
                        </span>
                      </div>
                    )}
                    {product.salt && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Salt:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.salt, 'g')}
                        </span>
                      </div>
                    )}
                    {product.fiber && (
                      <div className="flex justify-between text-[#CBD5E1]">
                        <span>Fiber:</span>
                        <span className="font-semibold">
                          {formatNutrientValue(product.fiber, 'g')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Nutrition Grade Info */}
              <div
                className="rounded-lg p-6 border-2"
                style={{
                  backgroundColor: `${getGradeColor(product.nutrition_grade)}15`,
                  borderColor: getGradeColor(product.nutrition_grade),
                }}
              >
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: getGradeColor(product.nutrition_grade) }}
                  >
                    {product.nutrition_grade}
                  </div>
                  <p className="text-[#CBD5E1] text-sm">
                    Nutrition Grade based on overall quality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-12 bg-[#1E293B] rounded-lg p-6 border border-[#334155]">
            <Reviews reviews={reviews} />
          </div>
        </div>
      </main>
    </>
  );
}
