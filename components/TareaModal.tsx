'use client'

import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'

interface Cliente {
  id: string
  nombre: string
}

interface Venta {
  id: string
  titulo: string
  cliente: Cliente
}

interface Tarea {
  id: string
  titulo: string
  descripcion: string | null
  estado: string
  prioridad: string
  fechaVencimiento: string | null
  cliente: Cliente | null
  venta: Venta | null
}

interface TareaModalProps {
  tarea: Tarea | null
  onClose: () => void
}

export default function TareaModal({ tarea, onClose }: TareaModalProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [ventas, setVentas] = useState<Venta[]>([])
  const [formData, setFormData] = useState({
    clienteId: '',
    ventaId: '',
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    prioridad: 'media',
    fechaVencimiento: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClientes()
    fetchVentas()
  }, [])

  useEffect(() => {
    if (tarea) {
      setFormData({
        clienteId: tarea.cliente?.id || '',
        ventaId: tarea.venta?.id || '',
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || '',
        estado: tarea.estado,
        prioridad: tarea.prioridad,
        fechaVencimiento: tarea.fechaVencimiento ? tarea.fechaVencimiento.split('T')[0] : '',
      })
    }
  }, [tarea])

  const fetchClientes = async () => {
    try {
      const res = await fetch('/api/clientes')
      const data = await res.json()
      setClientes(data)
    } catch (error) {
      console.error('Error fetching clientes:', error)
    }
  }

  const fetchVentas = async () => {
    try {
      const res = await fetch('/api/ventas')
      const data = await res.json()
      setVentas(data)
    } catch (error) {
      console.error('Error fetching ventas:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = tarea ? `/api/tareas/${tarea.id}` : '/api/tareas'
      const method = tarea ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        clienteId: formData.clienteId || null,
        ventaId: formData.ventaId || null,
        fechaVencimiento: formData.fechaVencimiento || null,
      }

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      onClose()
    } catch (error) {
      console.error('Error saving tarea:', error)
      alert('Error al guardar la tarea')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {tarea ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente (opcional)
              </label>
              <select
                value={formData.clienteId}
                onChange={(e) => {
                  setFormData({ ...formData, clienteId: e.target.value, ventaId: '' })
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Sin cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venta (opcional)
              </label>
              <select
                value={formData.ventaId}
                onChange={(e) => setFormData({ ...formData, ventaId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Sin venta</option>
                {ventas
                  .filter(v => !formData.clienteId || v.cliente.id === formData.clienteId)
                  .map((venta) => (
                    <option key={venta.id} value={venta.id}>
                      {venta.titulo}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad
              </label>
              <select
                value={formData.prioridad}
                onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Vencimiento
              </label>
              <input
                type="date"
                value={formData.fechaVencimiento}
                onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : tarea ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

