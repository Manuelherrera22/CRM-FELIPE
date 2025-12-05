'use client'

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
  FiCheckSquare
} from 'react-icons/fi'

const menuItems = [
  { href: '/', label: 'Dashboard', icon: FiHome },
  { href: '/clientes', label: 'Clientes', icon: FiUsers },
  { href: '/pipeline', label: 'Pipeline', icon: FiLayers },
  { href: '/ventas', label: 'Ventas', icon: FiDollarSign },
  { href: '/interacciones', label: 'Interacciones', icon: FiMessageSquare },
  { href: '/tareas', label: 'Tareas', icon: FiCheckSquare },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">CRM Felipe</h1>
        <p className="text-sm text-gray-500 mt-1">Gestión Inteligente</p>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <FiSettings className="w-4 h-4 text-primary-600" />
          </div>
          <span>Configuración</span>
        </div>
      </div>
    </aside>
  )
}

