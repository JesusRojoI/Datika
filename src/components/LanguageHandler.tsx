'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageHandler() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  }, [i18n.language]);

  return null;
}