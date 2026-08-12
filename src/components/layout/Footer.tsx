'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import NavigationLink from './NavigationLink';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-300">{t('footer.address')}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:hola@datika.com.mx" className="text-sm text-gray-300 hover:text-white transition-colors">
                hola@datika.com.mx
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+5215518577687" className="text-sm text-gray-300 hover:text-white transition-colors">
                +52 1 55 1857 7687
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <NavigationLink href="/aviso-de-privacidad" className="block text-sm text-gray-300 hover:text-white transition-colors">
              {t('footer.privacy_notice')}
            </NavigationLink>
            <NavigationLink href="/terminos-y-condiciones" className="block text-sm text-gray-300 hover:text-white transition-colors">
              {t('footer.terms_conditions')}
            </NavigationLink>
            <NavigationLink href="/politica-de-reembolsos" className="block text-sm text-gray-300 hover:text-white transition-colors">
              {t('footer.refund_policy')}
            </NavigationLink>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-400">{t('footer.copyright')}</p>
            <div className="flex items-center gap-3">
              <Image src="/visa.svg" alt="Visa" width={40} height={25} className="h-6 w-auto" />
              <Image src="/mastercard.svg" alt="Mastercard" width={40} height={25} className="h-6 w-auto" />

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
