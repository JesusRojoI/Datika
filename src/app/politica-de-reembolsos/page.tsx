'use client';

import { useTranslation } from 'react-i18next';
import NavigationLink from '@/components/layout/NavigationLink';

export default function RefundPolicyPage() {
  const { t } = useTranslation('common');

  const bulletIcon = (
    <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const stateBadge = (text: string) => (
    <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
      {text}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-bpmf">
          {t('refunds.title')}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* Intro */}
          <p className="text-gray-700 leading-relaxed mb-10">
            {t('refunds.intro')}
          </p>

          {/* ESTADO: BASE */}
          <div className="mb-10">
            {stateBadge(t('refunds.base_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('refunds.base_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('refunds.base_p1')}
            </p>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">{t('refunds.base_state_a')}</p>
              <p className="text-gray-700 leading-relaxed">{t('refunds.base_state_b')}</p>
              <p className="text-gray-700 leading-relaxed">{t('refunds.base_state_c')}</p>
              <p className="text-gray-700 leading-relaxed">{t('refunds.base_state_d')}</p>
            </div>
          </div>

          {/* ESTADO: CLIENTE */}
          <div className="mb-10">
            {stateBadge(t('refunds.client_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('refunds.client_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('refunds.client_p1')}
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.client_1_title')}</p>
                <p className="text-gray-700 leading-relaxed mb-2">{t('refunds.client_1_text')}</p>
                <p className="text-gray-600 text-sm leading-relaxed italic">{t('refunds.client_1_note')}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.client_2_title')}</p>
                <p className="text-gray-700 leading-relaxed">{t('refunds.client_2_text')}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.client_3_title')}</p>
                <p className="text-gray-700 leading-relaxed">{t('refunds.client_3_text')}</p>
              </div>
            </div>
          </div>

          {/* ESTADO: EMPRESA */}
          <div className="mb-10">
            {stateBadge(t('refunds.company_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('refunds.company_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('refunds.company_p1')}
            </p>
            <ul className="space-y-2 mb-6">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`refunds.company_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-3">
              {t('refunds.company_subtitle')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('refunds.company_p2')}
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.company_1_title')}</p>
                <p className="text-gray-700 leading-relaxed">{t('refunds.company_1_text')}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.company_2_title')}</p>
                <p className="text-gray-700 leading-relaxed">{t('refunds.company_2_text')}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{t('refunds.company_3_title')}</p>
                <p className="text-gray-700 leading-relaxed">{t('refunds.company_3_text')}</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {t('refunds.company_p3')}
            </p>
          </div>

          {/* ESTADO: MECANISMO */}
          <div className="mb-10">
            {stateBadge(t('refunds.mechanism_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('refunds.mechanism_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('refunds.mechanism_p1')}
            </p>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`refunds.mechanism_${num}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('refunds.mechanism_p2')}
            </p>
          </div>

          {/* ESTADO: MARCO LEGAL */}
          <div className="mb-10">
            {stateBadge(t('refunds.legal_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('refunds.legal_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('refunds.legal_p1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('refunds.legal_p2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('refunds.legal_p3')}
            </p>
          </div>

          {/* Company and Version */}
          <div className="text-center border-t border-gray-200 pt-8">
            <p className="text-sm font-bold text-gray-900 mb-1">
              {t('refunds.company_name')}
            </p>
            <p className="text-sm text-gray-500">
              {t('refunds.version')}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <NavigationLink href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← {t('common.back_home')}
          </NavigationLink>
        </div>
      </div>
    </div>
  );
}