import TareasList from '@/components/TareasList'

export default function TareasPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tareas y Recordatorios</h1>
        <p className="text-gray-600 mt-2">Organiza tus tareas y nunca olvides un seguimiento</p>
      </div>
      <TareasList />
    </div>
  )
}

