'use client'

import { useEffect, useState } from 'react'
import { FiUsers, FiDollarSign, FiTrendingUp, FiClock, FiCheckSquare, FiMessageSquare, FiAlertCircle, FiTarget } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import Link from 'next/link'

interface Stats {
  totalClientes: number
  totalVentas: number
  ventasCompletadas: number
  ventasPendientes: number
  montoTotal: number
  montoCompletado: number
  totalTareas: number
  tareasCompletadas: number
  tareasPendientes: number
  tareasVencidas: number
  totalInteracciones: number
  interaccionesEsteMes: number
  tasaConversion: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalClientes: 0,
    totalVentas: 0,
    ventasCompletadas: 0,
    ventasPendientes: 0,
    montoTotal: 0,
    montoCompletado: 0,
    totalTareas: 0,
    tareasCompletadas: 0,
    tareasPendientes: 0,
    tareasVencidas: 0,
    totalInteracciones: 0,
    interaccionesEsteMes: 0,
    tasaConversion: '0',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      if (!res.ok) {
        throw new Error('Error al obtener estadísticas')
      }
      const data = await res.json()
      setStats({
        totalClientes: data.totalClientes || 0,
        totalVentas: data.totalVentas || 0,
        ventasCompletadas: data.ventasCompletadas || 0,
        ventasPendientes: data.ventasPendientes || 0,
        montoTotal: data.montoTotal || 0,
        montoCompletado: data.montoCompletado || 0,
        totalTareas: data.totalTareas || 0,
        tareasCompletadas: data.tareasCompletadas || 0,
        tareasPendientes: data.tareasPendientes || 0,
        tareasVencidas: data.tareasVencidas || 0,
        totalInteracciones: data.totalInteracciones || 0,
        interaccionesEsteMes: data.interaccionesEsteMes || 0,
        tasaConversion: data.tasaConversion || '0',
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Clientes',
      value: stats.totalClientes,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+12%',
      link: '/clientes',
    },
    {
      title: 'Ventas Activas',
      value: stats.ventasPendientes,
      icon: FiClock,
      color: 'bg-yellow-500',
      change: '+5%',
      link: '/pipeline',
    },
    {
      title: 'Tasa de Conversión',
      value: `${stats.tasaConversion}%`,
      icon: FiTarget,
      color: 'bg-green-500',
      change: '+2.3%',
      link: '/ventas',
    },
    {
      title: 'Ingresos Totales',
      value: `$${(stats.montoCompletado || 0).toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-purple-500',
      change: '+15%',
      link: '/ventas',
    },
    {
      title: 'Tareas Pendientes',
      value: stats.tareasPendientes,
      icon: FiCheckSquare,
      color: 'bg-orange-500',
      change: stats.tareasVencidas > 0 ? `${stats.tareasVencidas} vencidas` : 'Al día',
      link: '/tareas',
      alert: stats.tareasVencidas > 0,
    },
    {
      title: 'Interacciones Este Mes',
      value: stats.interaccionesEsteMes,
      icon: FiMessageSquare,
      color: 'bg-indigo-500',
      change: '+18%',
      link: '/interacciones',
    },
  ]

  const ventasEnProceso = Math.max(0, stats.totalVentas - stats.ventasCompletadas - stats.ventasPendientes)
  const pieData = [
    { name: 'Completadas', value: stats.ventasCompletadas || 0, color: '#10b981' },
    { name: 'En Proceso', value: ventasEnProceso, color: '#3b82f6' },
    { name: 'Pendientes', value: stats.ventasPendientes || 0, color: '#f59e0b' },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Vista general de tu negocio en tiempo real</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const CardContent = (
            <div className={`group relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${stat.link ? 'cursor-pointer' : ''} ${stat.alert ? 'border-red-200 bg-red-50/50' : ''} overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-purple-100/50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className={`text-xs font-semibold ${stat.alert ? 'text-red-600' : 'text-green-600'}`}>
                    {stat.change} {!stat.alert && 'vs mes anterior'}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
          
          return stat.link ? (
            <Link key={index} href={stat.link}>
              {CardContent}
            </Link>
          ) : (
            <div key={index}>{CardContent}</div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2"></span>
            Distribución de Ventas
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-2"></span>
            Ventas por Estado
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Pendientes', value: stats.ventasPendientes },
              { name: 'En Proceso', value: stats.totalVentas - stats.ventasCompletadas - stats.ventasPendientes },
              { name: 'Completadas', value: stats.ventasCompletadas },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></span>
            Tendencia de Ventas
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { mes: 'Ene', ventas: 12 },
              { mes: 'Feb', ventas: 19 },
              { mes: 'Mar', ventas: 15 },
              { mes: 'Abr', ventas: 22 },
              { mes: 'May', ventas: 18 },
              { mes: 'Jun', ventas: stats.ventasCompletadas },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="url(#lineGradient)" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', r: 5 }}
                activeDot={{ r: 7 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


