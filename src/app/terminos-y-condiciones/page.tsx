import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-bpmf">Términos y Condiciones</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">Última actualización: 2026</p>
          <p className="text-gray-700 leading-relaxed">
            Al utilizar el sitio web datika.com.mx y contratar nuestros servicios, usted acepta los siguientes términos y condiciones.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Servicios</h2>
          <p className="text-gray-700 leading-relaxed">
            Datika ofrece servicios de consultoría técnica, auditoría de procesos, ciberseguridad, análisis de datos
            y estudios de mercado. Todos los servicios se rigen por los términos acordados en cada propuesta específica.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Pagos</h2>
          <p className="text-gray-700 leading-relaxed">
            Los pagos se procesan a través de Etomin. Al realizar una compra, usted acepta que sus datos de pago sean
            procesados de forma segura conforme a los estándares de la industria.
          </p>
          <p className="text-gray-700 leading-relaxed mt-6">
            Para cualquier duda, contáctenos en{' '}
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