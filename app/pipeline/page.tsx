import PipelineKanban from '@/components/PipelineKanban'

export default function PipelinePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pipeline de Ventas</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Visualiza y gestiona tus oportunidades de venta</p>
      </div>
      <PipelineKanban />
    </div>
  )
}

