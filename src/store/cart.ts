import { create } from 'zustand';
import { CartItem, Product } from '@/types';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variant?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, variant) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.code === product.code && item.variant === variant
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: `${product.code}-${variant || 'default'}-${Date.now()}`,
                product,
                quantity,
                variant,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          // Mock price calculation (in real app, would come from product data)
          const basePrice = Math.random() * 50 + 5; // Random price between 5-55
          return total + basePrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
