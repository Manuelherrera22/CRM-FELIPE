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
}

interface Interaccion {
  id: string
  tipo: string
  descripcion: string
  duracion: number | null
  resultado: string | null
  cliente: Cliente
  venta: Venta | null
}

interface InteraccionModalProps {
  interaccion: Interaccion | null
  onClose: () => void
}

export default function InteraccionModal({ interaccion, onClose }: InteraccionModalProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [ventas, setVentas] = useState<Venta[]>([])
  const [formData, setFormData] = useState({
    clienteId: '',
    ventaId: '',
    tipo: 'llamada',
    descripcion: '',
    duracion: '',
    resultado: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClientes()
    fetchVentas()
  }, [])

  useEffect(() => {
    if (interaccion) {
      setFormData({
        clienteId: interaccion.cliente.id,
        ventaId: interaccion.venta?.id || '',
        tipo: interaccion.tipo,
        descripcion: interaccion.descripcion,
        duracion: interaccion.duracion?.toString() || '',
        resultado: interaccion.resultado || '',
      })
    }
  }, [interaccion])

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
      const url = interaccion ? `/api/interacciones/${interaccion.id}` : '/api/interacciones'
      const method = interaccion ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        duracion: formData.duracion ? parseInt(formData.duracion) : null,
        ventaId: formData.ventaId || null,
      }

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      onClose()
    } catch (error) {
      console.error('Error saving interaccion:', error)
      alert('Error al guardar la interacción')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {interaccion ? 'Editar Interacción' : 'Nueva Interacción'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente *
              </label>
              <select
                required
                value={formData.clienteId}
                onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Seleccionar cliente</option>
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
                <option value="">Sin venta asociada</option>
                {ventas
                  .filter(v => v.cliente.id === formData.clienteId)
                  .map((venta) => (
                    <option key={venta.id} value={venta.id}>
                      {venta.titulo}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Interacción *
            </label>
            <select
              required
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="llamada">Llamada</option>
              <option value="email">Email</option>
              <option value="reunion">Reunión</option>
              <option value="nota">Nota</option>
              <option value="seguimiento">Seguimiento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resultado
              </label>
              <select
                value={formData.resultado}
                onChange={(e) => setFormData({ ...formData, resultado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Sin resultado</option>
                <option value="exitosa">Exitosa</option>
                <option value="no_contesto">No contestó</option>
                <option value="reprogramar">Reprogramar</option>
                <option value="rechazada">Rechazada</option>
                <option value="interesado">Interesado</option>
              </select>
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
              {loading ? 'Guardando...' : interaccion ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

