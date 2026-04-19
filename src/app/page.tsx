'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProductCard } from '@/components/common/ProductCard';
import { ProductSkeleton } from '@/components/common/Skeleton';
import { BarcodeModal } from '@/components/common/BarcodeModal';
import { Product } from '@/types';
import { foodFactsAPI } from '@/api/foodfacts';
import { useDebounce, useInfiniteScroll } from '@/hooks';
import { sortProducts } from '@/utils';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState('');
  const [grades, setGrades] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc'>('name-asc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [barcodeLoading, setBarcodeLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number = 1, reset: boolean = false) => {
      try {
        setLoading(true);
        setError('');

        let response;
        if (debouncedSearch) {
          response = await foodFactsAPI.searchByName(debouncedSearch, page);
        } else if (category) {
          response = await foodFactsAPI.getByCategory(category);
        } else {
          // Default search for common products
          response = await foodFactsAPI.searchByName('beverage', page);
        }

        let newProducts = response.products || [];

        // Filter by grades if selected
        if (grades.length > 0) {
          newProducts = newProducts.filter((p) =>
            grades.includes(p.nutrition_grade?.toUpperCase() || '')
          );
        }

        // Sort products
        newProducts = sortProducts(newProducts as any, sortBy);

        if (reset) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }

        setHasMore(newProducts.length > 0);
        setCurrentPage(page);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, category, grades, sortBy]
  );

  // Initial fetch
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setError('');
    const timer = setTimeout(() => {
      fetchProducts(1, true);
    }, 100);
    return () => clearTimeout(timer);
  }, [debouncedSearch, category, grades, sortBy, fetchProducts]);

  // Infinite scroll
  const setSentinelRef = useInfiniteScroll(
    useCallback(() => {
      if (hasMore && !loading) {
        fetchProducts(currentPage + 1);
      }
    }, [hasMore, loading, currentPage, fetchProducts])
  );

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setProducts([]);
    setCurrentPage(1);
  };

  // Handle barcode search
  const handleBarcodeSearch = async (barcode: string) => {
    try {
      setBarcodeLoading(true);
      const response = await foodFactsAPI.getByBarcode(barcode);
      if (response.product) {
        // Navigate to product detail page
        window.location.href = `/product/${barcode}`;
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to find product by barcode');
    } finally {
      setBarcodeLoading(false);
      setBarcodeModalOpen(false);
    }
  };

  const handleRetry = () => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setError('');
    setTimeout(() => {
      fetchProducts(1, true);
    }, 100);
  };

  const hasLoadedImages = products.some(
    (product) => Boolean(product.image_url || product.image_front_url)
  );
  const showRetry = Boolean(error) && !hasLoadedImages;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header
        onSearch={handleSearch}
        onBarcodeClick={() => setBarcodeModalOpen(true)}
      />

      <div className="flex">
        {/* Sidebar - Hidden on mobile by default */}
        <div className="hidden md:block md:w-64">
          <Sidebar
            selectedCategory={category}
            selectedGrades={grades}
            selectedSort={sortBy}
            onCategoryChange={(cat) => {
              setCategory(cat);
              setProducts([]);
              setCurrentPage(1);
            }}
            onGradeFilter={(g) => {
              setGrades(g);
              setProducts([]);
              setCurrentPage(1);
            }}
            onSortChange={(sort) =>
              setSortBy(sort as 'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc')
            }
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-6 right-6 bg-[#6366F1] text-white p-3 rounded-full shadow-lg z-30"
        >
          ☰
        </button>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            selectedCategory={category}
            selectedGrades={grades}
            selectedSort={sortBy}
            onCategoryChange={(cat) => {
              setCategory(cat);
              setProducts([]);
              setCurrentPage(1);
              setSidebarOpen(false);
            }}
            onGradeFilter={(g) => {
              setGrades(g);
              setProducts([]);
              setCurrentPage(1);
            }}
            onSortChange={(sort) =>
              setSortBy(sort as 'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc')
            }
          />
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8 md:px-6">
            {/* Error Message */}
            {showRetry && (
              <div className="bg-[#EF4444] bg-opacity-10 border border-[#EF4444] text-[#EF4444] px-4 py-3 rounded mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <span>{error}</span>
                <button
                  onClick={handleRetry}
                  className="self-start md:self-auto bg-[#EF4444] text-white px-3 py-1.5 rounded-md hover:bg-[#DC2626] transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading && products.length === 0 ? (
                <ProductSkeleton count={8} />
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-[var(--text-secondary)] text-lg">No products found</p>
                </div>
              ) : (
                products.map((product) => (
                  <Link
                    key={product.code}
                    href={`/product/${product.code}`}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))
              )}
            </div>

            {/* Infinite Scroll Sentinel */}
            {hasMore && products.length > 0 && (
              <div ref={setSentinelRef} className="py-8 text-center">
                {loading && <ProductSkeleton count={4} />}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Barcode Modal */}
      <BarcodeModal
        isOpen={barcodeModalOpen}
        onClose={() => setBarcodeModalOpen(false)}
        onSearch={handleBarcodeSearch}
        isLoading={barcodeLoading}
      />
    </div>
  );
}
