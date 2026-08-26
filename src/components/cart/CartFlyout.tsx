'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useCurrencyStore } from '@/store/currencyStore';
import { usePathname } from 'next/navigation';
import NavigationLink from '@/components/layout/NavigationLink';

export function CartFlyout() {
  const { t } = useTranslation('common');
  const { items, flyoutOpen, setFlyoutOpen, removeItem, getSubtotal } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const flyoutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  if (pathname === '/cart' || pathname === '/checkout') return null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        setFlyoutOpen(false);
      }
    }
    if (flyoutOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [flyoutOpen, setFlyoutOpen]);

  useEffect(() => {
    setFlyoutOpen(false);
  }, [pathname, setFlyoutOpen]);

  if (!flyoutOpen || items.length === 0) return null;

  const getItemName = (item: { nameKey: string; name: string }): string => {
    const translated = t(item.nameKey);
    return translated !== item.nameKey ? translated : item.name;
  };

  return (
    <div ref={flyoutRef} className="fixed top-20 right-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 animate-scale-in overflow-hidden" onMouseLeave={() => setFlyoutOpen(false)}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{t('header.cart')}</h3>
      </div>

      <div className="max-h-64 overflow-y-auto p-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Image src={item.image} alt={getItemName(item)} width={48} height={48} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{getItemName(item)}</p>
              <p className="text-xs text-gray-500">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">{t('products.subtotal')}:</span>
          <span className="text-sm font-bold text-primary-700">{formatPrice(getSubtotal())}</span>
        </div>
        <div className="space-y-2">
          <NavigationLink href="/cart" onClick={() => setFlyoutOpen(false)} className="block w-full text-center py-2 px-4 border border-primary-600 text-primary-600 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-all">
            {t('header.view_cart')}
          </NavigationLink>
          <NavigationLink href="/checkout" onClick={() => setFlyoutOpen(false)} className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all">
            {t('header.checkout')}
          </NavigationLink>
        </div>
      </div>
    </div>
  );
}
