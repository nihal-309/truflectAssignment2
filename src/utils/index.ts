import { Product, Review } from '@/types';

export const generateRandomReviews = (productCode: string, count: number = 5): Review[] => {
  const reviewTexts = [
    'Great product! Really enjoyed it.',
    'Good quality, satisfied with my purchase.',
    'Tastes amazing, would buy again.',
    'Very healthy choice for daily consumption.',
    'Perfect for my diet needs.',
    'Excellent ingredient list.',
    'Love the nutritional value.',
    'Best choice in this category.',
    'Highly recommended to friends.',
    'Perfect for the whole family.',
    'Great taste and health benefits.',
    'Will definitely purchase again.',
  ];

  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const rating = Math.floor(Math.random() * 2) + 4; // Random rating 4-5
    const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    
    reviews.push({
      id: `${productCode}-review-${i}`,
      rating,
      text: randomText,
      author: `User ${Math.floor(Math.random() * 10000)}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }
  return reviews;
};

export const getGradeColor = (grade?: string): string => {
  switch (grade?.toUpperCase()) {
    case 'A':
      return '#10B981'; // Green
    case 'B':
      return '#F59E0B'; // Amber
    case 'C':
      return '#FBBF24'; // Yellow
    case 'D':
      return '#FB923C'; // Orange
    case 'E':
      return '#EF4444'; // Red
    default:
      return '#94A3B8'; // Grey
  }
};

export const getGradeLabel = (grade?: string): string => {
  const gradeMap: Record<string, string> = {
    A: 'Excellent',
    B: 'Good',
    C: 'Fair',
    D: 'Poor',
    E: 'Very Poor',
  };
  return gradeMap[grade?.toUpperCase() || ''] || 'Unknown';
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const getCategoryLabel = (category: string): string => {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatNutrientValue = (value: number | undefined, unit: string = 'g'): string => {
  if (!value) return '0' + unit;
  return `${value.toFixed(1)}${unit}`;
};

export const getRandomPrice = (): number => {
  return Math.floor(Math.random() * 50) + 5; // Random price 5-55
};

export const generateProductImage = (productName: string): string => {
  // Generate a placeholder image URL using Lorem Picsum
  const sanitized = productName.replace(/[^a-z0-9]/gi, '').slice(0, 20);
  const seed = Math.abs(sanitized.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0));
  
  return `https://picsum.photos/300/300?random=${seed}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const sortProducts = (
  products: Product[],
  sortBy: 'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc' = 'name-asc'
): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) =>
        (a.product_name || '').localeCompare(b.product_name || '')
      );
    case 'name-desc':
      return sorted.sort((a, b) =>
        (b.product_name || '').localeCompare(a.product_name || '')
      );
    case 'grade-asc':
      return sorted.sort((a, b) => {
        const gradeOrder = { A: 0, B: 1, C: 2, D: 3, E: 4 };
        const aGrade = gradeOrder[(a.nutrition_grade || 'E').toUpperCase() as keyof typeof gradeOrder] || 5;
        const bGrade = gradeOrder[(b.nutrition_grade || 'E').toUpperCase() as keyof typeof gradeOrder] || 5;
        return aGrade - bGrade;
      });
    case 'grade-desc':
      return sorted.sort((a, b) => {
        const gradeOrder = { A: 0, B: 1, C: 2, D: 3, E: 4 };
        const aGrade = gradeOrder[(a.nutrition_grade || 'E').toUpperCase() as keyof typeof gradeOrder] || 5;
        const bGrade = gradeOrder[(b.nutrition_grade || 'E').toUpperCase() as keyof typeof gradeOrder] || 5;
        return bGrade - aGrade;
      });
    default:
      return sorted;
  }
};
