import ClientesList from '@/components/ClientesList'

export default function ClientesPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <p className="text-gray-600 mt-2">Administra y organiza toda tu información de clientes</p>
      </div>
      <ClientesList />
    </div>
  )
}


