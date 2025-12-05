import VentasList from '@/components/VentasList'

export default function VentasPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Ventas</h1>
        <p className="text-gray-600 mt-2">Seguimiento de oportunidades y ventas</p>
      </div>
      <VentasList />
    </div>
  )
}


