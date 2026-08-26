'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useCurrencyStore } from '@/store/currencyStore';
import NavigationLink from '@/components/layout/NavigationLink';

export default function TechSectorPage() {
  const { t } = useTranslation('common');
  const addItem = useCartStore((state) => state.addItem);
  const setFlyoutOpen = useCartStore((state) => state.setFlyoutOpen);
  const [notification, setNotification] = useState<{ message: string; type: 'success' } | null>(null);
  const { formatPrice } = useCurrencyStore();

  const pentestProducts = [
    {
      id: 'pentest-basic',
      nameKey: 'products.pentest_basic',
      descKey: 'products.pentest_basic_desc',
      price: 35400,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop',
    },
    {
      id: 'pentest-medium',
      nameKey: 'products.pentest_medium',
      descKey: 'products.pentest_medium_desc',
      price: 61200,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop',
    },
  ];

  const dataCleanProducts = [
    {
      id: 'data-clean-basic',
      nameKey: 'products.data_clean_basic',
      descKey: 'products.data_clean_basic_desc',
      subtitleKey: 'products.data_clean_basic_subtitle',
      price: 15900,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    },
    {
      id: 'data-clean-pro',
      nameKey: 'products.data_clean_pro',
      descKey: 'products.data_clean_pro_desc',
      subtitleKey: 'products.data_clean_pro_subtitle',
      price: 36200,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
    },
  ];

  const dashboardProducts = [
    {
      id: 'dashboard-operational',
      nameKey: 'products.dashboard_operational',
      descKey: 'products.dashboard_operational_desc',
      subtitleKey: 'products.dashboard_operational_subtitle',
      price: 21320,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    },
    {
      id: 'dashboard-strategic',
      nameKey: 'products.dashboard_strategic',
      descKey: 'products.dashboard_strategic_desc',
      subtitleKey: 'products.dashboard_strategic_subtitle',
      price: 39550,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    },
  ];

  const formatMoney = (value: number): string => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleAddToCart = (product: { id: string; nameKey: string; price: number; image: string }) => {
    const cartItem: CartItem = {
      id: product.id,
      nameKey: product.nameKey,
      name: t(product.nameKey),
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    addItem(cartItem);

    setNotification({
      message: `"${t(product.nameKey)}" ${t('products.added_to_cart')}`,
      type: 'success',
    });
    setFlyoutOpen(true);

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="pt-16">
      {notification && (
        <div className="fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm animate-slide-down bg-green-600">
          {notification.message}
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
          alt="Technology Sector"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-bpmf leading-tight">
              {t('sector.tech_title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Pentesting Section */}
      <section className="py-16 bg-gray-50" id="ciberseguridad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">
              {t('sector.cyber_audit_title')}
            </h2>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pentestProducts.map((product, index) => {
              const features = t(product.descKey).split('|');
              return (
                <div key={index} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-40 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-bpmf">{t(product.nameKey)}</h3>
                    <p className="text-xs text-gray-500 mb-2">{t('products.pentest_subtitle')}</p>
                    <div className="text-2xl font-bold text-primary-700 mb-1">{formatPrice(product.price)}</div>
                    <p className="text-xs text-gray-400 mb-4">{t('products.mxn')} + {t('products.iva')}</p>
                    <ul className="space-y-1.5 mb-6 flex-1">
                      {features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-600">
                          <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleAddToCart(product)} className="btn-primary w-full text-center text-sm mt-auto">
                      {t('products.contract')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Clean Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">{t('sector.data_clean_title')}</h2>
            <p className="text-gray-500 mt-2">{t('sector.data_clean_subtitle')}</p>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {dataCleanProducts.map((product, index) => {
              const features = t(product.descKey).split('|');
              return (
                <div key={index} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-36 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-bpmf">{t(product.nameKey)}</h3>
                    <p className="text-xs text-primary-600 font-semibold mb-2">{t(product.subtitleKey)}</p>
                    <div className="text-2xl font-bold text-primary-700 mb-1">{formatPrice(product.price)}</div>
                    <p className="text-xs text-gray-400 mb-4">{t('products.mxn')} + {t('products.iva')}</p>
                    <ul className="space-y-1.5 mb-6 flex-1">
                      {features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-600">
                          <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleAddToCart(product)} className="btn-primary w-full text-center text-sm mt-auto">
                      {t('products.contract')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">
              {t('sector.dashboard_title')}
            </h2>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {dashboardProducts.map((product, index) => {
              const features = t(product.descKey).split('|');
              return (
                <div key={index} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-36 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-bpmf">{t(product.nameKey)}</h3>
                    <p className="text-xs text-gray-500 mb-2">{t(product.subtitleKey)}</p>
                    <div className="text-2xl font-bold text-primary-700 mb-1">{formatPrice(product.price)}</div>
                    <p className="text-xs text-gray-400 mb-4">{t('products.mxn')} + {t('products.iva')}</p>
                    <ul className="space-y-1.5 mb-6 flex-1">
                      {features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-600">
                          <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleAddToCart(product)} className="btn-primary w-full text-center text-sm mt-auto">
                      {t('products.contract')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-bpmf">{t('home.cta_title')}</h2>
          <p className="text-primary-100 mb-8 text-lg">{t('home.cta_desc')}</p>
          <NavigationLink href="/contacto#formulario" className="btn-primary inline-block text-sm bg-white text-primary-700 hover:bg-gray-100">
            {t('home.cta_button')}
          </NavigationLink>
        </div>
      </section>
    </div>
  );
}