import VentasList from '@/components/VentasList'

export default function VentasPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-6 lg:pt-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Ventas</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Seguimiento de oportunidades y ventas</p>
      </div>
      <VentasList />
    </div>
  )
}


