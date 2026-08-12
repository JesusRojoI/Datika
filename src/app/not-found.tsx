import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-700 font-bpmf">404</h1>
        <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
        <Link href="/" className="btn-primary inline-block mt-8">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}