import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonES from '../../public/locales/es/common.json';
import commonEN from '../../public/locales/en/common.json';

const resources = {
  es: {
    common: commonES,
  },
  en: {
    common: commonEN,
  },
};

// Obtener idioma guardado antes de inicializar
const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'es';
  const saved = localStorage.getItem('datika-language');
  return saved || 'es';
};

// Verificar si i18n ya está inicializado (evita doble inicialización)
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'es',
      lng: getSavedLanguage(), // Usar idioma guardado
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'datika-language',
      },
      react: {
        useSuspense: false,
      },
    });
}

// Guardar idioma cada vez que cambia
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('datika-language', lng);
    document.documentElement.lang = lng?.startsWith('en') ? 'en' : 'es';
  }
});

export default i18n;
