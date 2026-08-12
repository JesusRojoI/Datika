'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import NavigationLink from '@/components/layout/NavigationLink';

export default function CartPage() {
  const { t } = useTranslation('common');
  const { items, removeItem, getSubtotal, getTax, getTotal, notification, undoRemove, setNotification } = useCartStore();

  const formatMoney = (value: number): string => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Obtener el nombre traducido en tiempo real
  const getItemName = (item: { nameKey: string; name: string }): string => {
    // Si el nameKey existe, traducir; si no, usar el nombre guardado
    const translated = t(item.nameKey);
    return translated !== item.nameKey ? translated : item.name;
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <NavigationLink href="/cart" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            {t('products.cart')}
          </NavigationLink>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-400">{t('products.payment_details')}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-400">{t('products.order_completed')}</span>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-6 bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-sm animate-slide-down">
            <span>{notification.replace(' removed. Undo?', '')}</span>
            <button onClick={undoRemove} className="text-primary-300 hover:text-primary-200 font-semibold underline transition-colors">
              {t('products.undo')}
            </button>
            <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white transition-colors ml-auto">
              ✕
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-xl text-gray-500 mb-6">{t('cart.empty_cart')}</p>
            <NavigationLink href="/" className="btn-primary inline-block text-sm">
              Volver al inicio
            </NavigationLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-5">{t('products.product')}</div>
                  <div className="col-span-3 text-center">{t('products.price')}</div>
                  <div className="col-span-2 text-center">{t('products.quantity')}</div>
                  <div className="col-span-2 text-right">{t('products.subtotal')}</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors">
                      <div className="col-span-5 flex items-center gap-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                          title="Eliminar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <Image
                          src={item.image}
                          alt={getItemName(item)}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-900">{getItemName(item)}</span>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="text-sm text-gray-700">${formatMoney(item.price)}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-sm text-gray-700">1</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-sm font-semibold text-gray-900">${formatMoney(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6 font-bpmf">{t('cart.totals')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.subtotal')}</span>
                    <span className="text-gray-900 font-medium">${formatMoney(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.iva')}</span>
                    <span className="text-gray-900 font-medium">${formatMoney(getTax())}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-base font-bold text-gray-900">{t('products.total')}</span>
                    <span className="text-base font-bold text-primary-700">${formatMoney(getTotal())}</span>
                  </div>
                </div>
                <NavigationLink href="/checkout" className="btn-primary w-full text-center text-sm mt-6 block">
                  {t('cart.finalize')}
                </NavigationLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
