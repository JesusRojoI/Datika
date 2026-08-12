'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, CartItem } from '@/store/cartStore';

export default function AdditionalServicesPage() {
  const { t } = useTranslation('common');
  const addItem = useCartStore((state) => state.addItem);
  const setFlyoutOpen = useCartStore((state) => state.setFlyoutOpen);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const products = [
    {
      id: 'orientation',
      nameKey: 'products.orientation',
      descKey: 'products.orientation_desc',
      price: 184,
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=200&h=200&fit=crop',
    },
    {
      id: 'advisory',
      nameKey: 'products.advisory',
      descKey: 'products.advisory_desc',
      price: 580,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop',
    },
    {
      id: 'strategic-session',
      nameKey: 'products.strategic_session',
      descKey: 'products.strategic_session_desc',
      price: 810,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop',
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
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Additional Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-in-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-bpmf leading-tight">
              {t('sector.additional_title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => {
              const features = t(product.descKey).split('|');
              return (
                <div key={product.id} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-36 overflow-hidden relative">
                    <Image src={product.image} alt={t(product.nameKey)} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-bpmf">{t(product.nameKey)}</h3>
                    <div className="text-2xl font-bold text-primary-700 mb-1">${product.price.toLocaleString()}</div>
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
          <Link href="/contacto#formulario" className="btn-primary inline-block text-sm bg-white text-primary-700 hover:bg-gray-100">
            {t('home.cta_button')}
          </Link>
        </div>
      </section>
    </div>
  );
}