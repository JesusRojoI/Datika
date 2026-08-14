import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  nameKey: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  flyoutOpen: boolean;
  lastRemoved: CartItem | null;
  notification: string | null;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
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

  hydrate: () => {
    const items = loadCartFromStorage();
    set({ items, hydrated: true });
  },

  addItem: (item: Omit<CartItem, 'quantity'>) => {
    const { items } = get();
    const existingIndex = items.findIndex((i) => i.id === item.id);

    if (existingIndex !== -1) {
      // El producto ya existe, incrementar cantidad
      const newItems = [...items];
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + 1,
      };
      saveCartToStorage(newItems);
      set({ items: newItems, flyoutOpen: true });
    } else {
      // Nuevo producto con cantidad 1
      const newItems = [...items, { ...item, quantity: 1 }];
      saveCartToStorage(newItems);
      set({ items: newItems, flyoutOpen: true });
    }
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

  updateQuantity: (id: string, quantity: number) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const newItems = items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCartToStorage(newItems);
    set({ items: newItems });
  },

  incrementQuantity: (id: string) => {
    const { items } = get();
    const newItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCartToStorage(newItems);
    set({ items: newItems });
  },

  decrementQuantity: (id: string) => {
    const { items } = get();
    const item = items.find((i) => i.id === id);
    if (item && item.quantity <= 1) {
      get().removeItem(id);
      return;
    }
    const newItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    saveCartToStorage(newItems);
    set({ items: newItems });
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
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTax: () => {
    const subtotal = get().getSubtotal();
    return subtotal * 0.16;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  setNotification: (msg: string | null) => set({ notification: msg }),
}));
