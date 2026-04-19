'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { foodFactsAPI } from '@/api/foodfacts';

interface SidebarProps {
  onCategoryChange?: (category: string) => void;
  onGradeFilter?: (grades: string[]) => void;
  onSortChange?: (sort: string) => void;
  selectedCategory?: string;
  selectedGrades?: string[];
  selectedSort?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onCategoryChange,
  onGradeFilter,
  onSortChange,
  selectedCategory = '',
  selectedGrades = [],
  selectedSort = 'name-asc',
  isOpen = true,
  onClose,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [localGrades, setLocalGrades] = useState<string[]>(selectedGrades);

  useEffect(() => {
    setLocalGrades(selectedGrades);
  }, [selectedGrades]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const cats = await foodFactsAPI.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleGradeToggle = (grade: string) => {
    const updated = localGrades.includes(grade)
      ? localGrades.filter((g) => g !== grade)
      : [...localGrades, grade];
    setLocalGrades(updated);
    onGradeFilter?.(updated);
  };

  const grades = ['A', 'B', 'C', 'D', 'E'];

  const sidebarContent = (
    <>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-[var(--text-primary)] font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 sidebar-scroll">
            <button
              onClick={() => onCategoryChange?.('')}
              className={`
                block w-full text-left px-3 py-2 rounded
                transition-colors duration-200
                ${
                  selectedCategory === ''
                    ? 'bg-[#6366F1] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }
              `}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange?.(cat)}
                className={`
                  block w-full text-left px-3 py-2 rounded
                  transition-colors duration-200
                  ${
                    selectedCategory === cat
                      ? 'bg-[#6366F1] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                  }
                `}
              >
                {cat.replace(/[_-]/g, ' ')}
              </button>
            ))}
        </div>
      </div>

      {/* Nutrition Grade Filter */}
      <div className="mb-6">
        <h3 className="text-[var(--text-primary)] font-semibold mb-3">Nutrition Grade</h3>
        <div className="space-y-2">
          {grades.map((grade) => (
            <label key={grade} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localGrades.includes(grade)}
                onChange={() => handleGradeToggle(grade)}
                className="w-4 h-4"
              />
              <span className="text-[var(--text-secondary)]">{grade}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="text-[var(--text-primary)] font-semibold mb-3">Sort By</h3>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange?.(e.target.value)}
          className={`
            w-full px-3 py-2 rounded
            bg-[var(--bg-primary)] text-[var(--text-primary)]
            border border-[var(--border-light)]
            focus:outline-none focus:ring-2 focus:ring-[#6366F1]
            cursor-pointer
          `}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="grade-asc">Grade (Best First)</option>
          <option value="grade-desc">Grade (Worst First)</option>
        </select>
      </div>

      {/* Clear Filters */}
      <Button
        variant="secondary"
        size="sm"
        className="w-full text-xs"
        onClick={() => {
          onCategoryChange?.('');
          onGradeFilter?.([]);
          onSortChange?.('name-asc');
          setLocalGrades([]);
        }}
      >
        Clear Filters
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          left-0 top-0
          h-screen md:h-auto
          w-64
          bg-[var(--bg-secondary)]
          border-r border-[var(--border-light)]
          p-6
          overflow-y-auto
          transition-transform duration-300
          z-40
          sidebar-scroll
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-[var(--text-primary)] hover:text-[#6366F1] text-lg"
        >
          ✕
        </button>

        {/* Content */}
        <div className="pt-10 md:pt-0">{loading ? <p className="text-[var(--text-tertiary)] text-xs">Loading...</p> : sidebarContent}</div>
      </aside>
    </>
  );
};
