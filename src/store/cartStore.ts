import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  nameKey: string;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  flyoutOpen: boolean;
  lastRemoved: CartItem | null;
  notification: string | null;
  hydrated: boolean;
  addItem: (item: CartItem) => boolean;
  removeItem: (id: string) => void;
  undoRemove: () => void;
  clearCart: () => void;
  setFlyoutOpen: (open: boolean) => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  setNotification: (msg: string | null) => void;
  hydrate: () => void;
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('datika-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('datika-cart', JSON.stringify(items));
  } catch {
    // Silently fail
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  flyoutOpen: false,
  lastRemoved: null,
  notification: null,
  hydrated: false,

  // Llamar a hydrate al montar para cargar desde localStorage
  hydrate: () => {
    const items = loadCartFromStorage();
    set({ items, hydrated: true });
  },

  addItem: (item: CartItem) => {
    const { items } = get();
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      return false;
    }
    const newItems = [...items, item];
    saveCartToStorage(newItems);
    set({ items: newItems, flyoutOpen: true });
    return true;
  },

  removeItem: (id: string) => {
    const { items } = get();
    const itemToRemove = items.find((i) => i.id === id);
    if (itemToRemove) {
      const newItems = items.filter((i) => i.id !== id);
      saveCartToStorage(newItems);
      set({
        items: newItems,
        lastRemoved: itemToRemove,
        notification: `"${itemToRemove.name}" removed. Undo?`,
      });
    }
  },

  undoRemove: () => {
    const { lastRemoved, items } = get();
    if (lastRemoved) {
      const newItems = [...items, lastRemoved];
      saveCartToStorage(newItems);
      set({
        items: newItems,
        lastRemoved: null,
        notification: null,
      });
    }
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ items: [], lastRemoved: null, notification: null });
  },

  setFlyoutOpen: (open: boolean) => set({ flyoutOpen: open }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price, 0);
  },

  getTax: () => {
    const subtotal = get().getSubtotal();
    return subtotal * 0.16;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },

  getItemCount: () => {
    return get().items.length;
  },

  setNotification: (msg: string | null) => set({ notification: msg }),
}));