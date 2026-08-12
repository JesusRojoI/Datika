import Link from 'next/link';

export default function PrivacyNoticePage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-bpmf">Aviso de Privacidad</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">Última actualización: 2026</p>
          <p className="text-gray-700 leading-relaxed">
            En Datika, con domicilio en Av. Homero 203, Polanco, Polanco V Secc, Miguel Hidalgo, 11570 Ciudad de México, CDMX,
            nos comprometemos a proteger su privacidad y sus datos personales.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Este aviso de privacidad describe cómo recopilamos, usamos y protegemos la información que usted nos proporciona
            a través de nuestro sitio web datika.com.mx y nuestros servicios.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Información que recopilamos</h2>
          <p className="text-gray-700 leading-relaxed">
            Recopilamos información personal como nombre, correo electrónico, teléfono, dirección y datos de facturación
            cuando usted utiliza nuestros servicios de contacto o realiza una compra.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Uso de la información</h2>
          <p className="text-gray-700 leading-relaxed">
            Utilizamos su información para procesar pedidos, enviar comunicaciones sobre nuestros servicios y mejorar
            su experiencia en nuestro sitio web.
          </p>
          <p className="text-gray-700 leading-relaxed mt-6">
            Para cualquier duda sobre este aviso, contáctenos en{' '}
            <a href="mailto:hola@datika.com.mx" className="text-primary-600 hover:text-primary-700">
              hola@datika.com.mx
            </a>
            .
          </p>
        </div>
        <div className="text-center mt-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}