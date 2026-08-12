'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import NavigationLink from '@/components/layout/NavigationLink';

export default function HomePage() {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      titleKey: 'home.optimization_title',
      descKey: 'home.optimization_desc',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      titleKey: 'home.security_title',
      descKey: 'home.security_desc',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      titleKey: 'home.continuity_title',
      descKey: 'home.continuity_desc',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      titleKey: 'home.intelligence_title',
      descKey: 'home.intelligence_desc',
    },
  ];

  const reasons = [
    'home.reason_1',
    'home.reason_2',
    'home.reason_3',
    'home.reason_4',
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-business-team-meeting-in-a-modern-office-4280-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1 bg-primary-500/20 rounded-full text-primary-200 text-sm font-medium mb-4 border border-primary-400/30">
              Datika
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-bpmf">
              {t('home.hero_title')}
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {t('home.hero_description')}
            </p>
            <NavigationLink href="/nosotros" className="btn-primary inline-block text-sm">
              {t('home.know_us')}
            </NavigationLink>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 relative z-10">
                    {service.icon}
                  </div>
                  <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-2 border-primary-200" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-bpmf">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-primary-900/85" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-bpmf">
            {t('home.who_we_are')}
          </h2>
          <p className="text-gray-200 mb-4 leading-relaxed max-w-3xl mx-auto">
            {t('home.who_we_are_desc')}
          </p>
          <p className="text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t('home.who_we_are_desc2')}
          </p>

          <h3 className="text-2xl font-bold text-white mb-4 font-bpmf">
            {t('home.why_us')}
          </h3>
          <p className="text-gray-300 mb-8">{t('home.why_us_desc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-200">{t(reason)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Audit Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=300&fit=crop"
                  alt="Inventory Audit"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-bpmf">
                  {t('home.audit_title')}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {t('home.audit_desc')}
                </p>
                <NavigationLink
                  href="/sector-industrial-y-de-seguridad#auditoriasinventario"
                  className="btn-outline text-sm inline-block"
                >
                  {t('home.know_plans')}
                </NavigationLink>
              </div>
            </div>

            {/* Cybersecurity Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop"
                  alt="Cybersecurity"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-bpmf">
                  {t('home.cyber_title')}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {t('home.cyber_desc')}
                </p>
                <NavigationLink
                  href="/sector-tecnologia-y-datos#ciberseguridad"
                  className="btn-outline text-sm inline-block"
                >
                  {t('home.know_plans_cyber')}
                </NavigationLink>
              </div>
            </div>

            {/* Feasibility Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop"
                  alt="Feasibility Study"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-bpmf">
                  {t('home.feasibility_title')}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {t('home.feasibility_desc')}
                </p>
                <NavigationLink
                  href="/sector-cientifico-y-de-investigacion-de-mercado#investigaciondemercado"
                  className="btn-outline text-sm inline-block"
                >
                  {t('home.know_plans')}
                </NavigationLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-bpmf">
            {t('home.cta_title')}
          </h2>
          <p className="text-primary-100 mb-8 text-lg">{t('home.cta_desc')}</p>
          <NavigationLink href="/contacto#formulario" className="btn-primary inline-block text-sm bg-white text-primary-700 hover:bg-gray-100">
            {t('home.cta_button')}
          </NavigationLink>
        </div>
      </section>
    </div>
  );
}
