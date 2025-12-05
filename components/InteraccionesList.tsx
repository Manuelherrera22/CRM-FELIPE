'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiPhone, FiMail, FiCalendar, FiFileText, FiClock } from 'react-icons/fi'
import InteraccionModal from './InteraccionModal'
import { format } from 'date-fns'

interface Venta {
  id: string
  titulo: string
  cliente: {
    id: string
    nombre: string
  }
}

interface Interaccion {
  id: string
  tipo: string
  descripcion: string
  duracion: number | null
  resultado: string | null
  fecha: string
  cliente: {
    id: string
    nombre: string
  }
  venta: Venta | null
}

const tipoIcons = {
  llamada: FiPhone,
  email: FiMail,
  reunion: FiCalendar,
  nota: FiFileText,
  seguimiento: FiClock,
}

const tipoColors = {
  llamada: 'bg-blue-100 text-blue-800',
  email: 'bg-purple-100 text-purple-800',
  reunion: 'bg-green-100 text-green-800',
  nota: 'bg-yellow-100 text-yellow-800',
  seguimiento: 'bg-gray-100 text-gray-800',
}

export default function InteraccionesList() {
  const [interacciones, setInteracciones] = useState<Interaccion[]>([])
  const [loading, setLoading] = useState(true)
  const [filterTipo, setFilterTipo] = useState('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInteraccion, setSelectedInteraccion] = useState<Interaccion | null>(null)

  useEffect(() => {
    fetchInteracciones()
  }, [])

  const fetchInteracciones = async () => {
    try {
      const res = await fetch('/api/interacciones')
      if (!res.ok) {
        throw new Error('Error al obtener interacciones')
      }
      const data = await res.json()
      // Asegurarse de que data sea un array
      setInteracciones(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching interacciones:', error)
      setInteracciones([]) // Establecer array vacío en caso de error
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setSelectedInteraccion(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedInteraccion(null)
    fetchInteracciones()
  }

  // Asegurarse de que interacciones sea un array
  const interaccionesArray = Array.isArray(interacciones) ? interacciones : []
  
  const filteredInteracciones = interaccionesArray.filter(interaccion =>
    filterTipo === 'todos' || interaccion.tipo === filterTipo
  )

  if (loading) {
    return <div className="text-center py-12">Cargando interacciones...</div>
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-b border-gray-200 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Historial de Interacciones</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Registro completo de todas tus interacciones</p>
            </div>
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-sm sm:text-base"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nueva Interacción</span>
            </button>
          </div>
          <div className="relative z-50">
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white shadow-sm appearance-none cursor-pointer relative z-50"
              style={{ zIndex: 50 }}
            >
              <option value="todos">Todos los tipos</option>
              <option value="llamada">Llamadas</option>
              <option value="email">Emails</option>
              <option value="reunion">Reuniones</option>
              <option value="nota">Notas</option>
              <option value="seguimiento">Seguimientos</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredInteracciones.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-gray-500">
              No hay interacciones registradas
            </div>
          ) : (
            filteredInteracciones.map((interaccion) => {
              const Icon = tipoIcons[interaccion.tipo as keyof typeof tipoIcons] || FiFileText
              const colorClass = tipoColors[interaccion.tipo as keyof typeof tipoColors] || 'bg-gray-100 text-gray-800'
              
              return (
                <div key={interaccion.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-lg ${colorClass} flex-shrink-0`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 capitalize">{interaccion.tipo}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Cliente: <span className="font-medium">{interaccion.cliente.nombre}</span>
                            {interaccion.venta && (
                              <> • Venta: <span className="font-medium">{interaccion.venta.titulo}</span></>
                            )}
                          </p>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <p className="text-xs sm:text-sm text-gray-500">
                            {format(new Date(interaccion.fecha), "PPp")}
                          </p>
                          {interaccion.duracion && (
                            <p className="text-xs text-gray-400 mt-1">
                              Duración: {interaccion.duracion} min
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">{interaccion.descripcion}</p>
                      {interaccion.resultado && (
                        <div className="mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            Resultado: {interaccion.resultado}
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
        <InteraccionModal
          interaccion={selectedInteraccion}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}

