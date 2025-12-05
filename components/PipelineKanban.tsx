'use client'

import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiPlus, FiDollarSign, FiUser } from 'react-icons/fi'
import VentaModal from './VentaModal'

interface Venta {
  id: string
  titulo: string
  monto: number
  estado: string
  prioridad: string
  cliente: {
    id: string
    nombre: string
  }
}

const estados = [
  { id: 'pendiente', label: 'Pendiente', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'en_proceso', label: 'En Proceso', color: 'bg-blue-50 border-blue-200' },
  { id: 'completada', label: 'Completada', color: 'bg-green-50 border-green-200' },
  { id: 'cancelada', label: 'Cancelada', color: 'bg-red-50 border-red-200' },
]

function VentaCard({ venta }: { venta: Venta }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: venta.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baja': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-move hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 mb-2">{venta.titulo}</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
        <FiUser className="w-4 h-4" />
        <span>{venta.cliente.nombre}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-primary-600 font-semibold">
          <FiDollarSign className="w-4 h-4" />
          <span>${venta.monto.toLocaleString()}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPrioridadColor(venta.prioridad)}`}>
          {venta.prioridad}
        </span>
      </div>
    </div>
  )
}

export default function PipelineKanban() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    fetchVentas()
  }, [])

  const fetchVentas = async () => {
    try {
      const res = await fetch('/api/ventas')
      const data = await res.json()
      setVentas(data)
    } catch (error) {
      console.error('Error fetching ventas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const ventaId = active.id as string
    const nuevoEstado = over.id as string

    const venta = ventas.find(v => v.id === ventaId)
    if (!venta || venta.estado === nuevoEstado) return

    try {
      await fetch(`/api/ventas/${ventaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...venta,
          estado: nuevoEstado,
        }),
      })
      fetchVentas()
    } catch (error) {
      console.error('Error updating venta:', error)
    }
  }

  const ventasPorEstado = estados.map(estado => ({
    ...estado,
    ventas: ventas.filter(v => v.estado === estado.id),
  }))

  const activeVenta = activeId ? ventas.find(v => v.id === activeId) : null

  if (loading) {
    return <div className="text-center py-12">Cargando pipeline...</div>
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventasPorEstado.map((columna) => (
            <div
              key={columna.id}
              className={`rounded-lg border-2 ${columna.color} p-4 min-h-[500px]`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">{columna.label}</h2>
                <span className="bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {columna.ventas.length}
                </span>
              </div>
              <SortableContext
                items={columna.ventas.map(v => v.id)}
                strategy={verticalListSortingStrategy}
              >
                {columna.ventas.map((venta) => (
                  <VentaCard key={venta.id} venta={venta} />
                ))}
              </SortableContext>
              {columna.ventas.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No hay ventas en este estado
                </div>
              )}
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeVenta ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64">
              <h3 className="font-semibold text-gray-900 mb-2">{activeVenta.titulo}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiUser className="w-4 h-4" />
                <span>{activeVenta.cliente.nombre}</span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}

