'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrencyStore } from '@/store/currencyStore';

export default function CurrencySwitcher() {
  const { t } = useTranslation('common');
  const { currency, setCurrency, fetchExchangeRate, loadingRate } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selected: 'MXN' | 'USD') => {
    setCurrency(selected);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 transition-all duration-200"
      >
        <span className="font-bold">{currency}</span>
        {loadingRate ? (
          <span className="w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-scale-in overflow-hidden z-50">
          <button
            onClick={() => handleSelect('MXN')}
            className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-primary-50 flex items-center gap-3 ${
              currency === 'MXN' ? 'bg-primary-50' : ''
            }`}
          >
            <span className={`font-bold text-base ${currency === 'MXN' ? 'text-primary-700' : 'text-gray-900'}`}>
              MXN
            </span>
            <span className={currency === 'MXN' ? 'text-primary-700 font-medium' : 'text-gray-600'}>
              {t('currency.mxn_name')}
            </span>
            {currency === 'MXN' && (
              <svg className="w-4 h-4 ml-auto text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleSelect('USD')}
            className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-primary-50 flex items-center gap-3 ${
              currency === 'USD' ? 'bg-primary-50' : ''
            }`}
          >
            <span className={`font-bold text-base ${currency === 'USD' ? 'text-primary-700' : 'text-gray-900'}`}>
              USD
            </span>
            <span className={currency === 'USD' ? 'text-primary-700 font-medium' : 'text-gray-600'}>
              {t('currency.usd_name')}
            </span>
            {currency === 'USD' && (
              <svg className="w-4 h-4 ml-auto text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}