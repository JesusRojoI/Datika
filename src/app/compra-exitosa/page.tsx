'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import NavigationLink from '@/components/layout/NavigationLink';

interface OrderItem {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface LastOrder {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency?: string;
  montoFinal?: number;
}

export default function OrderSuccessPage() {
  const { t, i18n } = useTranslation('common');
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem('lastOrder');
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrder(parsed);
        window.localStorage.removeItem('lastOrder');
      }
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatMoney = (value: number, currency?: string): string => {
    const formatted = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const currencyLabel = currency || 'MXN';
    return `$${formatted} ${currencyLabel}`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const locale = i18n.language?.startsWith('en') ? 'en-US' : 'es-MX';
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currency = order?.currency || 'MXN';
  const montoFinal = order?.montoFinal || order?.total || 0;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-bpmf">
            {t('order_success.title')}
          </h1>
          <p className="text-gray-500 mt-2">{t('order_success.subtitle')}</p>
        </div>

        {order ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500">{t('order_success.order_id')}</p>
                <p className="text-lg font-bold text-primary-700">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('order_success.order_date')}</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(order.date)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-bpmf">
                {t('order_success.order_summary')}
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                          <p className="text-xs text-gray-500">
                            {t('products.quantity')}: {item.cantidad}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatMoney(item.precio * item.cantidad, currency)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                      {t('common.no_items')}
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.subtotal')}</span>
                    <span className="text-gray-900">{formatMoney(order.subtotal || 0, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.iva')}</span>
                    <span className="text-gray-900">{formatMoney(order.tax || 0, currency)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                    <span>{t('products.total')}</span>
                    <span className="text-primary-700">
                      {formatMoney(montoFinal, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">{t('order_success.thank_you')}</p>
              <NavigationLink href="/" className="btn-primary inline-block text-sm">
                {t('common.back_home')}
              </NavigationLink>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">{t('common.no_order_found')}</p>
            <NavigationLink href="/" className="btn-primary inline-block text-sm">
              {t('common.back_home')}
            </NavigationLink>
          </div>
        )}
      </div>
    </div>
  );
}