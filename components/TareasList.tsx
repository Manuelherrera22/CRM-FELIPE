'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiCheck, FiClock, FiAlertCircle, FiEdit, FiTrash2 } from 'react-icons/fi'
import TareaModal from './TareaModal'
import { format, isPast, isToday } from 'date-fns'

interface Venta {
  id: string
  titulo: string
  cliente: {
    id: string
    nombre: string
  }
}

interface Tarea {
  id: string
  titulo: string
  descripcion: string | null
  estado: string
  prioridad: string
  fechaVencimiento: string | null
  completada: boolean
  cliente: {
    id: string
    nombre: string
  } | null
  venta: Venta | null
}

export default function TareasList() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [loading, setLoading] = useState(true)
  const [filterEstado, setFilterEstado] = useState('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null)

  useEffect(() => {
    fetchTareas()
  }, [])

  const fetchTareas = async () => {
    try {
      const res = await fetch('/api/tareas')
      if (!res.ok) {
        throw new Error('Error al obtener tareas')
      }
      const data = await res.json()
      // Asegurarse de que data sea un array
      setTareas(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching tareas:', error)
      setTareas([]) // Establecer array vacío en caso de error
    } finally {
      setLoading(false)
    }
  }

  const handleToggleCompletada = async (id: string, completada: boolean) => {
    try {
      const tareasArray = Array.isArray(tareas) ? tareas : []
      const tarea = tareasArray.find(t => t.id === id)
      if (!tarea) return

      await fetch(`/api/tareas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tarea,
          completada: !completada,
          estado: !completada ? 'completada' : 'pendiente',
        }),
      })
      fetchTareas()
    } catch (error) {
      console.error('Error updating tarea:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return

    try {
      await fetch(`/api/tareas/${id}`, { method: 'DELETE' })
      fetchTareas()
    } catch (error) {
      console.error('Error deleting tarea:', error)
    }
  }

  const handleAdd = () => {
    setSelectedTarea(null)
    setIsModalOpen(true)
  }

  const handleEdit = (tarea: Tarea) => {
    setSelectedTarea(tarea)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedTarea(null)
    fetchTareas()
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200'
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'baja': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Asegurarse de que tareas sea un array
  const tareasArray = Array.isArray(tareas) ? tareas : []
  
  const filteredTareas = tareasArray.filter(tarea =>
    filterEstado === 'todos' || tarea.estado === filterEstado
  )

  const tareasVencidas = filteredTareas.filter(t =>
    t.fechaVencimiento && isPast(new Date(t.fechaVencimiento)) && !t.completada
  )
  const tareasHoy = filteredTareas.filter(t =>
    t.fechaVencimiento && isToday(new Date(t.fechaVencimiento)) && !t.completada
  )

  if (loading) {
    return <div className="text-center py-12">Cargando tareas...</div>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            <span className="font-semibold text-sm sm:text-base text-red-900">Tareas Vencidas</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">{tareasVencidas.length}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            <span className="font-semibold text-sm sm:text-base text-yellow-900">Tareas de Hoy</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">{tareasHoy.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="font-semibold text-sm sm:text-base text-green-900">Completadas</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
            {filteredTareas.filter(t => t.completada).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Header Section */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lista de Tareas</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Organiza y gestiona tus tareas</p>
            </div>
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-sm sm:text-base flex-shrink-0"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nueva Tarea</span>
            </button>
          </div>
        </div>

        {/* Filter Section - Separado para evitar que tape el header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Filtrar por:
            </label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="flex-1 sm:flex-initial sm:min-w-[200px] px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white shadow-sm appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="todos">Todas las tareas</option>
              <option value="pendiente">Pendientes</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completada">Completadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTareas.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-gray-500">
              No hay tareas registradas
            </div>
          ) : (
            filteredTareas.map((tarea) => {
              const isVencida = tarea.fechaVencimiento && isPast(new Date(tarea.fechaVencimiento)) && !tarea.completada
              const isHoy = tarea.fechaVencimiento && isToday(new Date(tarea.fechaVencimiento)) && !tarea.completada

              return (
                <div
                  key={tarea.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${tarea.completada ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <button
                      onClick={() => handleToggleCompletada(tarea.id, tarea.completada)}
                      className={`mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        tarea.completada
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {tarea.completada && <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm sm:text-base ${tarea.completada ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {tarea.titulo}
                          </h3>
                          {tarea.descripcion && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{tarea.descripcion}</p>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                            {tarea.cliente && (
                              <span>Cliente: <span className="font-medium">{tarea.cliente.nombre}</span></span>
                            )}
                            {tarea.venta && (
                              <span>Venta: <span className="font-medium">{tarea.venta.titulo}</span></span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getPrioridadColor(tarea.prioridad)}`}>
                            {tarea.prioridad}
                          </span>
                          <button
                            onClick={() => handleEdit(tarea)}
                            className="text-primary-600 hover:text-primary-900 p-1"
                          >
                            <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tarea.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                      {tarea.fechaVencimiento && (
                        <div className="mt-3 flex items-center space-x-2">
                          <FiClock className={`w-3 h-3 sm:w-4 sm:h-4 ${isVencida ? 'text-red-500' : isHoy ? 'text-yellow-500' : 'text-gray-400'}`} />
                          <span className={`text-xs sm:text-sm ${isVencida ? 'text-red-600 font-semibold' : isHoy ? 'text-yellow-600 font-semibold' : 'text-gray-500'}`}>
                            Vence: {format(new Date(tarea.fechaVencimiento), "PP")}
                            {isVencida && ' (Vencida)'}
                            {isHoy && ' (Hoy)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {isModalOpen && (
        <TareaModal
          tarea={selectedTarea}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}

