'use client';

import { useTranslation } from 'react-i18next';

const flags = {
  es: '🇲🇽',
  en: '🇺🇸',
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Guardar explícitamente
    if (typeof window !== 'undefined') {
      localStorage.setItem('datika-language', lng);
    }
  };

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`w-10 h-7 rounded shadow-md transition-all duration-200 flex items-center justify-center text-lg ${
          currentLang === 'es'
            ? 'ring-2 ring-primary-500 scale-110 bg-white'
            : 'bg-white/80 hover:bg-white hover:scale-105 opacity-70 hover:opacity-100'
        }`}
        title="Español"
      >
        <span className="text-xl">{flags.es}</span>
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`w-10 h-7 rounded shadow-md transition-all duration-200 flex items-center justify-center text-lg ${
          currentLang === 'en'
            ? 'ring-2 ring-primary-500 scale-110 bg-white'
            : 'bg-white/80 hover:bg-white hover:scale-105 opacity-70 hover:opacity-100'
        }`}
        title="English"
      >
        <span className="text-xl">{flags.en}</span>
      </button>
    </div>
  );
}
