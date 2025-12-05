import ClientesList from '@/components/ClientesList'

export default function ClientesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-6 lg:pt-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Administra y organiza toda tu información de clientes</p>
      </div>
      <ClientesList />
    </div>
  )
}


