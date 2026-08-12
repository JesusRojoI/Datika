import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-bpmf">Política de Reembolsos</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">Última actualización: 2026</p>
          <p className="text-gray-700 leading-relaxed">
            En Datika nos comprometemos a brindar servicios de alta calidad. A continuación, se detalla nuestra política
            de reembolsos para los diferentes servicios que ofrecemos.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Servicios de consultoría</h2>
          <p className="text-gray-700 leading-relaxed">
            Los servicios de consultoría personalizada no son reembolsables una vez iniciado el servicio.
            Sin embargo, si no está satisfecho, puede contactarnos para discutir alternativas.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Productos digitales</h2>
          <p className="text-gray-700 leading-relaxed">
            Para productos digitales entregados (reportes, dashboards, documentación), ofrecemos un período de
            5 días hábiles para solicitar ajustes o correcciones sin costo adicional.
          </p>
          <p className="text-gray-700 leading-relaxed mt-6">
            Para solicitar un reembolso, contáctenos en{' '}
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