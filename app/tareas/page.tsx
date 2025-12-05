import TareasList from '@/components/TareasList'

export default function TareasPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tareas y Recordatorios</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Organiza tus tareas y nunca olvides un seguimiento</p>
      </div>
      <TareasList />
    </div>
  )
}

