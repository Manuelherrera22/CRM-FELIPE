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
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Lista de Ventas</h2>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nueva Venta</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar ventas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
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


