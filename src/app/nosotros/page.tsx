'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

export default function NosotrosPage() {
  const { t } = useTranslation('common');

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="About Datika"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-bpmf animate-fade-in-left">
            {t('home.who_we_are')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('home.who_we_are_desc')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t('home.who_we_are_desc2')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-bpmf">{t('home.why_us')}</h2>
            <p className="text-gray-700 mb-6">{t('home.why_us_desc')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-start gap-3 bg-primary-50 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{t(`home.reason_${num}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto#formulario" className="btn-primary inline-block text-sm">
              {t('home.cta_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}