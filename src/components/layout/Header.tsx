'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import NavigationLink from './NavigationLink';
import CurrencySwitcher from './CurrencySwitcher';

export default function Header() {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const [plansOpen, setPlansOpen] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (plansRef.current && !plansRef.current.contains(event.target as Node)) {
        setPlansOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const planItems = [
    { key: 'industrial_sector', path: '/sector-industrial-y-de-seguridad' },
    { key: 'tech_sector', path: '/sector-tecnologia-y-datos' },
    { key: 'scientific_sector', path: '/sector-cientifico-y-de-investigacion-de-mercado' },
    { key: 'additional_services', path: '/servicios-adicionales' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavigationLink href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Datika"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </NavigationLink>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavigationLink
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
              }`}
            >
              Datika
            </NavigationLink>

            {/* Nuestros Planes Dropdown */}
            <div className="relative" ref={plansRef}>
              <button
                onClick={() => setPlansOpen(!plansOpen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  planItems.some((item) => isActive(item.path))
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                }`}
              >
                {t('header.our_plans')}
                <svg className={`w-4 h-4 transition-transform duration-200 ${plansOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {plansOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-scale-in overflow-hidden">
                  {planItems.map((item) => (
                    <NavigationLink
                      key={item.path}
                      href={item.path}
                      onClick={() => setPlansOpen(false)}
                      className={`block px-4 py-3 text-sm transition-all duration-200 hover:bg-primary-50 hover:text-primary-700 ${
                        isActive(item.path) ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {t(`header.${item.key}`)}
                    </NavigationLink>
                  ))}
                </div>
              )}
            </div>

            {/* Ubícanos */}
            <NavigationLink
              href="/contacto"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/contacto') ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
              }`}
            >
              {t('header.location')}
            </NavigationLink>

            {/* Currency Switcher */}
            <div className="px-2">
              <CurrencySwitcher />
            </div>

            {/* Cart Icon */}
            <NavigationLink
              href="/cart"
              className="relative px-3 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </NavigationLink>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}