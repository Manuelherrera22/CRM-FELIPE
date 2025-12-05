'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi'
import VentaModal from './VentaModal'

interface Venta {
  id: string
  titulo: string
  descripcion: string | null
  monto: number
  estado: string
  prioridad: string
  fechaCierre: string | null
  cliente: {
    id: string
    nombre: string
  }
  createdAt: string
}

export default function VentasList() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null)

  useEffect(() => {
    fetchVentas()
  }, [])

  const fetchVentas = async () => {
    try {
      const res = await fetch('/api/ventas')
      if (!res.ok) {
        throw new Error('Error al obtener ventas')
      }
      const data = await res.json()
      // Asegurarse de que data sea un array
      setVentas(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching ventas:', error)
      setVentas([]) // Establecer array vacío en caso de error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta venta?')) return

    try {
      await fetch(`/api/ventas/${id}`, { method: 'DELETE' })
      fetchVentas()
    } catch (error) {
      console.error('Error deleting venta:', error)
    }
  }

  const handleEdit = (venta: Venta) => {
    setSelectedVenta(venta)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedVenta(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedVenta(null)
    fetchVentas()
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'bg-green-100 text-green-800'
      case 'en_proceso':
        return 'bg-blue-100 text-blue-800'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800'
      case 'media':
        return 'bg-yellow-100 text-yellow-800'
      case 'baja':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Asegurarse de que ventas sea un array
  const ventasArray = Array.isArray(ventas) ? ventas : []
  
  const filteredVentas = ventasArray.filter(venta => {
    const matchesSearch = 
      venta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === 'todos' || venta.estado === filterEstado
    return matchesSearch && matchesEstado
  })

  if (loading) {
    return <div className="text-center py-12">Cargando ventas...</div>
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-b border-gray-200 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lista de Ventas</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Gestiona todas tus oportunidades</p>
            </div>
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-sm sm:text-base"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nueva Venta</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar ventas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white shadow-sm"
              />
            </div>
            <div className="relative z-50">
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white shadow-sm appearance-none cursor-pointer relative z-50"
                style={{ zIndex: 50 }}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vista de tabla para desktop, cards para móvil */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVentas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm || filterEstado !== 'todos' 
                      ? 'No se encontraron ventas' 
                      : 'No hay ventas registradas'}
                  </td>
                </tr>
              ) : (
                filteredVentas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{venta.titulo}</div>
                      {venta.descripcion && (
                        <div className="text-sm text-gray-500 mt-1">{venta.descripcion.substring(0, 50)}...</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {venta.cliente.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FiDollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          ${venta.monto.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(venta.estado)}`}>
                        {venta.estado.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPrioridadColor(venta.prioridad)}`}>
                        {venta.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(venta)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(venta.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Vista de cards para móvil */}
        <div className="md:hidden p-4 sm:p-6">
          {filteredVentas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm || filterEstado !== 'todos' 
                  ? 'No se encontraron ventas' 
                  : 'No hay ventas registradas'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredVentas.map((venta) => (
                <div
                  key={venta.id}
                  className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{venta.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-2">Cliente: {venta.cliente.nombre}</p>
                      {venta.descripcion && (
                        <p className="text-sm text-gray-500 line-clamp-2">{venta.descripcion}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-primary-600 font-bold">
                      <FiDollarSign className="w-4 h-4" />
                      <span>${venta.monto.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(venta.estado)}`}>
                        {venta.estado.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadColor(venta.prioridad)}`}>
                        {venta.prioridad}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(venta)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(venta.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <VentaModal
          venta={selectedVenta}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}


