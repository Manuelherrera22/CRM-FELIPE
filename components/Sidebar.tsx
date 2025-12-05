'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiBarChart2,
  FiSettings,
  FiLayers,
  FiMessageSquare,
  FiCheckSquare,
  FiMenu,
  FiX
} from 'react-icons/fi'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/clientes', label: 'Clientes', icon: FiUsers },
  { href: '/pipeline', label: 'Pipeline', icon: FiLayers },
  { href: '/ventas', label: 'Ventas', icon: FiDollarSign },
  { href: '/interacciones', label: 'Interacciones', icon: FiMessageSquare },
  { href: '/tareas', label: 'Tareas', icon: FiCheckSquare },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl flex flex-col h-screen border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-purple-600">
          <h1 className="text-2xl font-bold text-white">CRM Felipe</h1>
          <p className="text-sm text-white/80 mt-1">Gestión Inteligente</p>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 bg-white">
          <Link
            href="/landing"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 text-sm text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-purple-100 rounded-lg flex items-center justify-center">
              <FiSettings className="w-4 h-4 text-primary-600" />
            </div>
            <span className="font-medium">Configuración</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

