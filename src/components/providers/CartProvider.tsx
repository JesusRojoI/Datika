'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrate = useCartStore((state) => state.hydrate);
  const hydrated = useCartStore((state) => state.hydrated);
  const setNotification = useCartStore((state) => state.setNotification);
  const notification = useCartStore((state) => state.notification);
  const undoRemove = useCartStore((state) => state.undoRemove);

  // Hidratar el carrito al montar
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <>
      {children}
      {notification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-sm">
            <span>{notification.replace(' removed. Undo?', '')}</span>
            <button
              onClick={undoRemove}
              className="text-primary-300 hover:text-primary-200 font-semibold underline transition-colors"
            >
              Undo
            </button>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-white transition-colors ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}