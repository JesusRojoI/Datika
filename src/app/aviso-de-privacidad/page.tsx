'use client';

import { useTranslation } from 'react-i18next';
import NavigationLink from '@/components/layout/NavigationLink';

export default function PrivacyNoticePage() {
  const { t } = useTranslation('common');

  const bulletIcon = (
    <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-bpmf">
          {t('privacy.title')}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* Intro */}
          <p className="text-gray-700 leading-relaxed mb-8">
            {t('privacy.intro_p1')}
          </p>

          {/* Dictamen 1 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_1_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_1_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('privacy.dictamen_1_p1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              {t('privacy.dictamen_1_domicilio')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              {t('privacy.dictamen_1_phone')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dictamen_1_email')}
            </p>
          </div>

          {/* Dictamen 2 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_2_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_2_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_2_p1')}
            </p>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('privacy.dictamen_2_form_title')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_2_form_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('privacy.dictamen_2_service_title')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_2_service_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('privacy.dictamen_2_auto_title')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                {bulletIcon}
                {t('privacy.dictamen_2_auto_1')}
              </li>
            </ul>
          </div>

          {/* Dictamen 3 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_3_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_3_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_3_p1')}
            </p>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('privacy.dictamen_3_necessary_title')}
            </h3>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_3_necessary_${num}`)}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('privacy.dictamen_3_optional_title')}
            </h3>
            <ul className="space-y-2 mb-3">
              <li className="flex items-start gap-2 text-gray-700">
                {bulletIcon}
                {t('privacy.dictamen_3_optional_1')}
              </li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed italic">
              {t('privacy.dictamen_3_optional_note')}
            </p>
          </div>

          {/* Dictamen 4 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_4_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_4_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_4_p1')}
            </p>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_4_${num}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Dictamen 5 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_5_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_5_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_5_p1')}
            </p>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_5_${num}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dictamen_5_p2')}
            </p>
          </div>

          {/* Dictamen 6 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_6_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_6_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_6_p1')}
            </p>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_6_${num}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('privacy.dictamen_6_p2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dictamen_6_p3')}
            </p>
          </div>

          {/* Dictamen 7 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_7_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_7_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy.dictamen_7_p1')}
            </p>
            <ul className="space-y-2 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <li key={num} className="flex items-start gap-2 text-gray-700">
                  {bulletIcon}
                  {t(`privacy.dictamen_7_${num}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dictamen_7_p2')}
            </p>
          </div>

          {/* Dictamen 8 */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-4">
              {t('privacy.dictamen_8_title')}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bpmf">
              {t('privacy.dictamen_8_heading')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dictamen_8_p1')}
            </p>
          </div>

          {/* Company and Version */}
          <div className="text-center border-t border-gray-200 pt-8">
            <p className="text-sm font-bold text-gray-900 mb-1">
              {t('privacy.company_name')}
            </p>
            <p className="text-sm text-gray-500">
              {t('privacy.version')}
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