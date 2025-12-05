'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiUser, FiMail, FiPhone } from 'react-icons/fi'
import ClienteModal from './ClienteModal'

interface Cliente {
  id: string
  nombre: string
  email: string | null
  telefono: string | null
  empresa: string | null
  direccion: string | null
  notas: string | null
  estado: string
  createdAt: string
}

export default function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    try {
      const res = await fetch('/api/clientes')
      const data = await res.json()
      setClientes(data)
    } catch (error) {
      console.error('Error fetching clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return

    try {
      await fetch(`/api/clientes/${id}`, { method: 'DELETE' })
      fetchClientes()
    } catch (error) {
      console.error('Error deleting cliente:', error)
    }
  }

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedCliente(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCliente(null)
    fetchClientes()
  }

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="text-center py-12">Cargando clientes...</div>
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lista de Clientes</h2>
              <p className="text-sm text-gray-600 mt-1">Gestiona toda tu base de clientes</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nuevo Cliente</span>
            </button>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar clientes por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="p-6">
          {filteredClientes.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                <FiUser className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados'}
              </p>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cliente'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Agregar Primer Cliente</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <FiUser className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{cliente.nombre}</h3>
                        {cliente.empresa && (
                          <p className="text-sm text-gray-500">{cliente.empresa}</p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        cliente.estado === 'activo'
                          ? 'bg-green-100 text-green-700'
                          : cliente.estado === 'potencial'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cliente.estado}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {cliente.email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FiMail className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{cliente.email}</span>
                      </div>
                    )}
                    {cliente.telefono && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        <span>{cliente.telefono}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(cliente)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
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
        <ClienteModal
          cliente={selectedCliente}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}


