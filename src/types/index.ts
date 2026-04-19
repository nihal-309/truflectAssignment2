/* Types for Food Product Explorer */

export interface Product {
  code: string;
  product_name?: string;
  image_url?: string;
  image_front_url?: string;
  categories_tags?: string[];
  ingredients_text?: string;
  ingredients?: Ingredient[];
  nutriments?: Nutriments;
  nutrition_grades?: string;
  nutrition_grade?: string;
  labels_tags?: string[];
  allergens?: string;
  generic_name?: string;
  brands?: string;
  energy?: number;
  energy_kcal?: number;
  fat?: number;
  carbohydrates?: number;
  proteins?: number;
  salt?: number;
  fiber?: number;
  sugars?: number;
}

export interface Ingredient {
  id?: string;
  text?: string;
  percent_estimate?: number;
  vegan?: string;
  vegetarian?: string;
  from_palm_oil?: string;
}

export interface Nutriments {
  [key: string]: number | string | undefined;
  energy_kcal?: number;
  fat?: number;
  carbohydrates?: number;
  proteins?: number;
  salt?: number;
  fiber?: number;
  sugars?: number;
}

export interface SearchResponse {
  products?: Product[];
  count?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author?: string;
  date: string;
}

export interface Filter {
  categories: string[];
  grades: string[];
  search: string;
}

export interface SortOption {
  label: string;
  value: 'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc';
}
