import InteraccionesList from '@/components/InteraccionesList'

export default function InteraccionesPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Interacciones con Clientes</h1>
        <p className="text-gray-600 mt-2">Historial completo de todas tus interacciones</p>
      </div>
      <InteraccionesList />
    </div>
  )
}

