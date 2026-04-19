import axios, { AxiosInstance } from 'axios';
import { Product, SearchResponse } from '@/types';

const BASE_URL = 'https://world.openfoodfacts.org';

class FoodFactsAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * Search products by name
   */
  async searchByName(searchTerm: string, pageNumber: number = 1): Promise<SearchResponse> {
    try {
      const response = await this.client.get('/cgi/search.pl', {
        params: {
          search_terms: searchTerm,
          json: true,
          page: pageNumber,
          page_size: 20,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   */
  async getByCategory(category: string): Promise<SearchResponse> {
    try {
      const response = await this.client.get(`/category/${category}.json`);
      return response.data;
    } catch (error) {
      console.error('Category fetch error:', error);
      throw error;
    }
  }

  /**
   * Get product details by barcode
   */
  async getByBarcode(barcode: string): Promise<{ product?: Product }> {
    try {
      const response = await this.client.get(`/api/v0/product/${barcode}.json`);
      return response.data;
    } catch (error) {
      console.error('Barcode fetch error:', error);
      throw error;
    }
  }

  /**
   * Get all available categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await this.client.get('/categories.json');
      const categories = response.data.tags || [];
      return categories
        .map((cat: any) => cat.name)
        .filter((name: string) => name && name.length > 0)
        .slice(0, 50); // Limit to top 50 categories
    } catch (error) {
      console.error('Categories fetch error:', error);
      // Return default categories if API fails
      return [
        'beverages',
        'dairy',
        'snacks',
        'cereals',
        'desserts',
        'meat',
        'vegetables',
        'fruits',
        'breads',
      ];
    }
  }
}

export const foodFactsAPI = new FoodFactsAPI();
