'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore, CartItem } from '@/store/cartStore';
import NavigationLink from '@/components/layout/NavigationLink';

export default function CheckoutPage() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [translatedItems, setTranslatedItems] = useState<CartItem[]>(items);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    empresa: '',
    pais: 'México',
    direccion: '',
    apartamento: '',
    poblacion: '',
    region: 'Ciudad de México',
    codigoPostal: '',
    telefono: '',
    email: '',
    notas: '',
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaTarjeta: '',
    cvv: '',
  });

  useEffect(() => {
    const updated = items.map((item) => ({
      ...item,
      name: t(item.nameKey),
    }));
    setTranslatedItems(updated);
  }, [i18n.language, items, t]);

  const estadosMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
    'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
    'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
  ];

  const paises = ['México', 'Estados Unidos', 'Canadá', 'España', 'Colombia', 'Argentina', 'Chile', 'Perú'];

  const formatMoney = (value: number): string => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.apellidos || !formData.direccion || !formData.poblacion || !formData.codigoPostal || !formData.telefono || !formData.email) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!formData.nombreTarjeta || !formData.numeroTarjeta || !formData.fechaTarjeta || !formData.cvv) {
      setError('Por favor, completa los datos de la tarjeta.');
      return;
    }

    setLoading(true);

    try {
      const paymentResponse = await fetch('/api/procesar-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreTarjeta: formData.nombreTarjeta,
          numeroTarjeta: formData.numeroTarjeta,
          fechaTarjeta: formData.fechaTarjeta,
          cvv: formData.cvv,
          monto: getTotal(),
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          direccion: formData.direccion,
          poblacion: formData.poblacion,
          region: formData.region,
          codigoPostal: formData.codigoPostal,
          telefono: formData.telefono,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentData.success) {
        setError(paymentData.message || 'Error al procesar el pago.');
        setLoading(false);
        return;
      }

      const orderData = {
        nombre: `${formData.nombre} ${formData.apellidos}`,
        productos: translatedItems.map((item) => ({
          nombre: item.name,
          cantidad: 1,
          precio: item.price,
        })),
        subtotal: getSubtotal(),
        descuento: 0,
        impuesto: getTax(),
        total: getTotal(),
        transactionId: paymentData.transactionId,
      };

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'purchase',
          to: formData.email,
          language: i18n.language?.startsWith('en') ? 'en' : 'es',
          orderData,
        }),
      });

      localStorage.setItem(
        'lastOrder',
        JSON.stringify({
          orderId: paymentData.transactionId,
          date: new Date().toISOString(),
          items: translatedItems.map((item) => ({
            nombre: item.name,
            cantidad: 1,
            precio: item.price,
          })),
          subtotal: getSubtotal(),
          tax: getTax(),
          total: getTotal(),
        })
      );

      clearCart();
      window.location.href = '/compra-exitosa';
    } catch {
      setError('Error al procesar la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Tu carrito está vacío</p>
          <NavigationLink href="/" className="btn-primary inline-block text-sm">
            Volver al inicio
          </NavigationLink>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <NavigationLink href="/cart" className="text-gray-500 hover:text-primary-600 transition-colors">
            {t('products.cart')}
          </NavigationLink>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-primary-600 font-semibold">{t('products.payment_details')}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-400">{t('products.order_completed')}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Billing Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-bpmf">{t('checkout.billing_details')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.name')}</label>
                    <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.lastname')}</label>
                    <input type="text" value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.company')}</label>
                  <input type="text" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.country')}</label>
                  <select value={formData.pais} onChange={(e) => setFormData({ ...formData, pais: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm bg-white">
                    {paises.map((pais) => (
                      <option key={pais} value={pais}>{pais}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.address')}</label>
                  <input type="text" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} placeholder={t('checkout.address_placeholder')} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.apartment')}</label>
                  <input type="text" value={formData.apartamento} onChange={(e) => setFormData({ ...formData, apartamento: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.city')}</label>
                    <input type="text" value={formData.poblacion} onChange={(e) => setFormData({ ...formData, poblacion: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.state')}</label>
                    <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm bg-white">
                      {estadosMexico.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.zip')}</label>
                    <input type="text" value={formData.codigoPostal} onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.phone')}</label>
                    <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.email')}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 font-bpmf">{t('checkout.additional_info')}</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkout.order_notes')}</label>
                  <textarea rows={3} value={formData.notas} onChange={(e) => setFormData({ ...formData, notas: e.target.value })} placeholder={t('checkout.order_notes_placeholder')} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm resize-none" />
                </div>
              </div>
            </div>

            {/* Right - Order Summary & Payment */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 font-bpmf">{t('checkout.your_order')}</h2>
                <div className="space-y-3 mb-4">
                  {translatedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} <span className="text-gray-400">× 1</span>
                      </span>
                      <span className="text-gray-900 font-medium">${formatMoney(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.subtotal')}</span>
                    <span className="text-gray-900">${formatMoney(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('products.iva')}</span>
                    <span className="text-gray-900">${formatMoney(getTax())}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                    <span>{t('products.total')}</span>
                    <span className="text-primary-700">${formatMoney(getTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 font-bpmf">{t('checkout.credit_card')}</h2>
                  <Image src="/etomin.svg" alt="Etomin" width={50} height={25} className="h-6 w-auto" />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('checkout.card_name')}</label>
                    <input type="text" value={formData.nombreTarjeta} onChange={(e) => setFormData({ ...formData, nombreTarjeta: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('checkout.card_number')}</label>
                    <input type="text" value={formData.numeroTarjeta} onChange={(e) => setFormData({ ...formData, numeroTarjeta: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('checkout.expiry')}</label>
                      <input type="text" value={formData.fechaTarjeta} onChange={(e) => setFormData({ ...formData, fechaTarjeta: e.target.value })} placeholder="MM/AA" maxLength={5} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('checkout.cvc')}</label>
                      <input type="password" value={formData.cvv} onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} placeholder="•••" maxLength={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm" required />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <Image src="/secure.svg" alt="Secure" width={120} height={40} className="h-10 w-auto opacity-80" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full text-sm">
                {loading ? t('common.loading') : t('checkout.place_order')}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                {t('checkout.privacy_text')}{' '}
                <NavigationLink href="/aviso-de-privacidad" className="text-primary-600 hover:text-primary-700 underline">
                  {t('checkout.privacy_policy')}
                </NavigationLink>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
