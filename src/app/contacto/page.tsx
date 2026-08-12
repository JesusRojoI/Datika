'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ContactPage() {
  const { t, i18n } = useTranslation('common');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    industry: '',
    solution: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const solutionOptions = [
    { key: 'contact.audit_inventory', value: 'audit_inventory' },
    { key: 'contact.bcp_solution', value: 'bcp_solution' },
    { key: 'contact.risk_mapping_solution', value: 'risk_mapping_solution' },
    { key: 'contact.cyber_audit', value: 'cyber_audit' },
    { key: 'contact.data_clean_solution', value: 'data_clean_solution' },
    { key: 'contact.dashboard_config', value: 'dashboard_config' },
    { key: 'contact.market_research', value: 'market_research' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.company || !formData.industry || !formData.solution || !formData.phone || !formData.email || !formData.message) {
      setError(t('contact.form_error'));
      return;
    }

    if (formData.solution === '') {
      setError(t('contact.form_error'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          language: i18n.language?.startsWith('en') ? 'en' : 'es',
          contactData: {
            fullName: formData.fullName,
            company: formData.company,
            industry: formData.industry,
            solution: t(`contact.${formData.solution}`),
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ fullName: '', company: '', industry: '', solution: '', phone: '', email: '', message: '' });
      } else {
        setError(t('common.error'));
      }
    } catch {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Google Maps Section */}
      <section className="relative h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.472369044552!2d-99.2040466!3d19.4351564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2021d4e5a5a5b%3A0x4a1c3e5b5b5b5b5b!2sAv.%20Homero%20203%2C%20Polanco%2C%20Polanco%20V%20Secc%2C%20Miguel%20Hidalgo%2C%2011570%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1690000000000!5m2!1ses!2smx"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
        <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs z-10">
          <p className="text-sm font-semibold text-gray-900">{t('footer.address')}</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50" id="formulario">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-bpmf">{t('contact.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{t('footer.address')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hola@datika.com.mx" className="text-gray-700 hover:text-primary-600 transition-colors">
                    hola@datika.com.mx
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+5215518577687" className="text-gray-700 hover:text-primary-600 transition-colors">
                    +52 1 55 1857 7687
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-bpmf">{t('contact.write_us')}</h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-800 animate-scale-in">
                  <p className="font-semibold">{t('contact.form_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.full_name')}</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t('contact.full_name_placeholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.company_org')}</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t('contact.company_org_placeholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.industry')}</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder={t('contact.industry_placeholder')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.solution_interest')}</label>
                    <select
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm bg-white"
                    >
                      <option value="">{t('contact.select_option')}</option>
                      {solutionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {t(opt.key)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.phone_contact')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('contact.phone_placeholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.corporate_email')}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.email_placeholder')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message_label')}</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.message_placeholder')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full text-sm">
                    {loading ? t('common.loading') : t('contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}