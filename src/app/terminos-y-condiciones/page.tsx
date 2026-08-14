'use client';

import { useTranslation } from 'react-i18next';
import NavigationLink from '@/components/layout/NavigationLink';

export default function TermsPage() {
  const { t } = useTranslation('common');

  const bulletIcon = (
    <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const zoneBadge = (text: string) => (
    <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
      {text}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-bpmf">
          {t('terms.title')}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* Intro */}
          <p className="text-gray-700 leading-relaxed mb-10">
            {t('terms.intro')}
          </p>

          {/* ZONA A */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_a_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_a_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_a_p1')}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_a_p2')}</p>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_a_p3')}</p>
          </div>

          {/* ZONA B */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_b_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_b_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('terms.zone_b_p1')}</p>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_b_subtitle_1')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_b_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_b_subtitle_2')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_b_p2')}</p>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_b_p3')}</p>
          </div>

          {/* ZONA C */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_c_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_c_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_c_p1')}</p>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_c_p2')}</p>
          </div>

          {/* ZONA D */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_d_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_d_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('terms.zone_d_p1')}</p>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_d_subtitle_1')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_d_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_d_subtitle_2')}
            </h3>
            <ul className="space-y-2">
              {[4, 5].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_d_${num}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* ZONA E */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_e_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_e_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('terms.zone_e_p1')}</p>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_e_${num}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_e_p2')}</p>
          </div>

          {/* ZONA F */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_f_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_f_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t('terms.zone_f_p1')}</p>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_f_${num}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* ZONA G */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_g_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_g_heading')}
            </h2>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_g_subtitle_1')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`terms.zone_g_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('terms.zone_g_subtitle_2')}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_g_p1')}</p>
          </div>

          {/* ZONA H */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_h_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_h_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_h_p1')}</p>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_h_p2')}</p>
          </div>

          {/* ZONA I */}
          <div className="mb-10">
            {zoneBadge(t('terms.zone_i_title'))}
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('terms.zone_i_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_i_p1')}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{t('terms.zone_i_p2')}</p>
            <p className="text-gray-700 leading-relaxed">{t('terms.zone_i_p3')}</p>
          </div>

          {/* Company and Version */}
          <div className="text-center border-t border-gray-200 pt-8">
            <p className="text-sm font-bold text-gray-900 mb-1">
              {t('terms.company_name')}
            </p>
            <p className="text-sm text-gray-500">
              {t('terms.version')}
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