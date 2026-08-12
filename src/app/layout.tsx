'use client';

import './globals.css';
import './i18n';
import { Manrope } from 'next/font/google';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import LanguageHandler from '@/components/layout/LanguageHandler';
import CartProvider from '@/components/providers/CartProvider';
import { CartFlyout } from '@/components/cart/CartFlyout';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={manrope.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            @font-face {
              font-family: 'Bpmf Huninn';
              src: url('https://fonts.cdnfonts.com/css/bpmf-huninn') format('woff2');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
          `}
        </style>
      </head>
      <body className="font-manrope">
        <CartProvider>
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <LanguageHandler />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <LanguageSwitcher />
            <CartFlyout />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
