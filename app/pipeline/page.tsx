import PipelineKanban from '@/components/PipelineKanban'

export default function PipelinePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pipeline de Ventas</h1>
        <p className="text-gray-600 mt-2">Visualiza y gestiona tus oportunidades de venta</p>
      </div>
      <PipelineKanban />
    </div>
  )
}

