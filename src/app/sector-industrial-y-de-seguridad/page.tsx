'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useCurrencyStore } from '@/store/currencyStore';
import NavigationLink from '@/components/layout/NavigationLink';

export default function IndustrialSectorPage() {
  const { t } = useTranslation('common');
  const addItem = useCartStore((state) => state.addItem);
  const setFlyoutOpen = useCartStore((state) => state.setFlyoutOpen);
  const [notification, setNotification] = useState<{ message: string; type: 'success' } | null>(null);
  const { formatPrice } = useCurrencyStore();

  const industrialProducts = [
    {
      id: 'audit-50',
      nameKey: 'products.audit_50',
      descKey: 'products.audit_50_desc',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=200&fit=crop',
      warehouses: 'products.1_warehouse',
      productsLabel: 'products.50_products',
    },
    {
      id: 'audit-100',
      nameKey: 'products.audit_100',
      descKey: 'products.audit_100_desc',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=200&fit=crop',
      warehouses: 'products.2_warehouses',
      productsLabel: 'products.100_products',
      isHighlighted: true,
    },
    {
      id: 'audit-300',
      nameKey: 'products.audit_300',
      descKey: 'products.audit_300_desc',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200&h=200&fit=crop',
      warehouses: 'products.5_warehouses',
      productsLabel: 'products.300_products',
    },
  ];

  const otherProducts = [
    {
      id: 'bcp',
      nameKey: 'products.bcp',
      descKey: 'products.bcp_desc',
      price: 51000,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop',
    },
    {
      id: 'risk-mapping',
      nameKey: 'products.risk_mapping',
      descKey: 'products.risk_mapping_desc',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=200&h=200&fit=crop',
    },
  ];

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
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Industrial Sector"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-bpmf leading-tight">
              {t('sector.industrial_title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Products - Auditorías */}
      <section className="py-16 bg-gray-50" id="auditoriasinventario">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">
              {t('sector.inventory_audit_title')}
            </h2>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industrialProducts.map((product, index) => {
              const features = t(product.descKey).split('|');
              return (
                <div
                  key={index}
                  className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col ${
                    product.isHighlighted ? 'ring-2 ring-primary-400 shadow-lg' : ''
                  }`}
                >
                  <div className="h-40 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                    {product.isHighlighted && (
                      <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-bpmf">{t(product.nameKey)}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {t(product.productsLabel)} · {t(product.warehouses)}
                    </p>
                    <div className="text-2xl font-bold text-primary-700 mb-1">
                      {formatPrice(product.price)}
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {t('products.mxn')} + {t('products.iva')}
                    </p>

                    {product.isHighlighted && (
                      <p className="text-xs font-semibold text-primary-600 mb-2">
                        📌 {t('products.deliverables')}
                      </p>
                    )}

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

      {/* Other Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">{t('products.other_services')}</h2>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherProducts.map((product, index) => (
              <div key={index} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="h-36 overflow-hidden relative">
                  <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-bpmf">{t(product.nameKey)}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t(product.descKey)}</p>
                  <div className="text-2xl font-bold text-primary-700 mb-1">{formatPrice(product.price)}</div>
                  <p className="text-xs text-gray-400 mb-4">{t('products.mxn')} + {t('products.iva')}</p>
                  <button onClick={() => handleAddToCart(product)} className="btn-primary w-full text-center text-sm mt-auto">
                    {t('products.contract')}
                  </button>
                </div>
              </div>
            ))}
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