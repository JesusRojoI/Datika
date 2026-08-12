'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, CartItem } from '@/store/cartStore';

export default function ScientificSectorPage() {
  const { t } = useTranslation('common');
  const addItem = useCartStore((state) => state.addItem);
  const setFlyoutOpen = useCartStore((state) => state.setFlyoutOpen);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const products = [
    {
      id: 'feasibility-study',
      nameKey: 'products.feasibility_study',
      descKey: 'products.feasibility_study_desc',
      subtitleKey: 'products.feasibility_study_subtitle',
      deliveryKey: null,
      price: 28000,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    },
    {
      id: 'express-diagnosis',
      nameKey: 'products.express_diagnosis',
      descKey: 'products.express_diagnosis_desc',
      subtitleKey: 'products.express_diagnosis_subtitle',
      deliveryKey: null,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 'basic-market',
      nameKey: 'products.basic_market',
      descKey: 'products.basic_market_desc',
      subtitleKey: null,
      deliveryKey: 'products.basic_market_delivery',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
    },
    {
      id: 'comparative-study',
      nameKey: 'products.comparative_study',
      descKey: 'products.comparative_study_desc',
      subtitleKey: null,
      deliveryKey: 'products.comparative_study_delivery',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop',
    },
    {
      id: 'intermediate-study',
      nameKey: 'products.intermediate_study',
      descKey: 'products.intermediate_study_desc',
      subtitleKey: null,
      deliveryKey: 'products.intermediate_study_delivery',
      price: 7800,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
    },
    {
      id: 'mini-feasibility',
      nameKey: 'products.mini_feasibility',
      descKey: 'products.mini_feasibility_desc',
      subtitleKey: null,
      deliveryKey: 'products.mini_feasibility_delivery',
      price: 9800,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop',
    },
  ];

  const handleAddToCart = (product: { id: string; nameKey: string; price: number; image: string }) => {
    const cartItem: CartItem = {
      id: product.id,
      nameKey: product.nameKey,
      name: t(product.nameKey),
      price: product.price,
      image: product.image,
    };
    const success = addItem(cartItem);
    if (success) {
      setNotification({
        message: `"${t(product.nameKey)}" ${t('products.added_to_cart')}`,
        type: 'success',
      });
      setFlyoutOpen(true);
    } else {
      setNotification({
        message: `${t('products.cannot_add_more')} "${t(product.nameKey)}" ${t('products.to_cart')}`,
        type: 'error',
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="pt-16">
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm animate-slide-down ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&q=80"
          alt="Scientific Research"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-in-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-bpmf leading-tight">
              {t('sector.scientific_title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50" id="investigaciondemercado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bpmf">
              {t('sector.scientific_market_title')}
            </h2>
            <div className="section-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const features = t(product.descKey).split('|');
              return (
                <div key={product.id} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-36 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-bpmf">{t(product.nameKey)}</h3>
                    {product.subtitleKey && (
                      <p className="text-xs text-primary-600 font-semibold mb-2">{t(product.subtitleKey)}</p>
                    )}
                    <div className="text-2xl font-bold text-primary-700 mb-1">${product.price.toLocaleString()}</div>
                    <p className="text-xs text-gray-400 mb-4">{t('products.mxn')} + {t('products.iva')}</p>
                    <ul className="space-y-1.5 mb-4 flex-1">
                      {features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-600">
                          <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {product.deliveryKey && (
                      <p className="text-xs font-semibold text-primary-600 mb-4">{t(product.deliveryKey)}</p>
                    )}
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
          <Link href="/contacto#formulario" className="btn-primary inline-block text-sm bg-white text-primary-700 hover:bg-gray-100">
            {t('home.cta_button')}
          </Link>
        </div>
      </section>
    </div>
  );
}