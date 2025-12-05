import InteraccionesList from '@/components/InteraccionesList'

export default function InteraccionesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-6 lg:pt-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Interacciones con Clientes</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Historial completo de todas tus interacciones</p>
      </div>
      <InteraccionesList />
    </div>
  )
}

