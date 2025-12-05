'use client'

import { useEffect, useState } from 'react'
import { FiUsers, FiDollarSign, FiClock, FiCheckSquare, FiMessageSquare, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'
import Link from 'next/link'

// Hook para detectar tamaño de pantalla
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

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
  const windowSize = useWindowSize()
  const isMobile = windowSize.width < 640
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024
  
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
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="animate-pulse space-y-6">
          <div className="space-y-2">
            <div className="h-8 sm:h-10 bg-gray-200 rounded-lg w-48 sm:w-64"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-64 sm:w-80"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 sm:h-36 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 sm:h-80 bg-gray-200 rounded-2xl"></div>
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
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      change: '+12%',
      link: '/clientes',
    },
    {
      title: 'Ventas Activas',
      value: stats.ventasPendientes,
      icon: FiClock,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      change: '+5%',
      link: '/pipeline',
    },
    {
      title: 'Tasa de Conversión',
      value: `${stats.tasaConversion}%`,
      icon: FiTarget,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      change: '+2.3%',
      link: '/ventas',
    },
    {
      title: 'Ingresos Totales',
      value: `$${(stats.montoCompletado || 0).toLocaleString()}`,
      icon: FiDollarSign,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      change: '+15%',
      link: '/ventas',
    },
    {
      title: 'Tareas Pendientes',
      value: stats.tareasPendientes,
      icon: FiCheckSquare,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      change: stats.tareasVencidas > 0 ? `${stats.tareasVencidas} vencidas` : 'Al día',
      link: '/tareas',
      alert: stats.tareasVencidas > 0,
    },
    {
      title: 'Interacciones Este Mes',
      value: stats.interaccionesEsteMes,
      icon: FiMessageSquare,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
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

  const barData = [
    { name: 'Pendientes', value: stats.ventasPendientes },
    { name: 'En Proceso', value: ventasEnProceso },
    { name: 'Completadas', value: stats.ventasCompletadas },
  ]

  const lineData = [
    { mes: 'Ene', ventas: 12 },
    { mes: 'Feb', ventas: 19 },
    { mes: 'Mar', ventas: 15 },
    { mes: 'Abr', ventas: 22 },
    { mes: 'May', ventas: 18 },
    { mes: 'Jun', ventas: stats.ventasCompletadas },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Vista general de tu negocio en tiempo real
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            const CardContent = (
              <div className={`
                group relative bg-white rounded-2xl shadow-md hover:shadow-xl 
                border border-gray-100 transition-all duration-300 
                ${stat.link ? 'cursor-pointer' : ''} 
                ${stat.alert ? 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50' : ''}
                overflow-hidden
              `}>
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                        {stat.title}
                      </p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 break-words">
                        {stat.value}
                      </p>
                      <p className={`text-xs sm:text-sm font-semibold ${stat.alert ? 'text-red-600' : 'text-green-600'}`}>
                        {stat.change}
                        {!stat.alert && !isMobile && (
                          <span className="ml-1 text-gray-500 font-normal">vs mes anterior</span>
                        )}
                      </p>
                    </div>
                    <div className={`
                      flex-shrink-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl 
                      bg-gradient-to-br ${stat.gradient} shadow-lg
                      transform group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
            
            return stat.link ? (
              <Link key={index} href={stat.link} className="block">
                {CardContent}
              </Link>
            ) : (
              <div key={index}>{CardContent}</div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 flex-shrink-0"></span>
                Distribución de Ventas
              </h2>
            </div>
            <div className="w-full" style={{ height: isMobile ? '240px' : isTablet ? '280px' : '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => {
                      if (isMobile) {
                        return `${(percent * 100).toFixed(0)}%`
                      }
                      return `${name}: ${(percent * 100).toFixed(0)}%`
                    }}
                    outerRadius={isMobile ? 70 : isTablet ? 85 : 100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '13px',
                      padding: '8px 12px'
                    }} 
                  />
                  {!isMobile && (
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-2 flex-shrink-0"></span>
                Ventas por Estado
              </h2>
            </div>
            <div className="w-full" style={{ height: isMobile ? '240px' : isTablet ? '280px' : '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 5, left: 0, bottom: isMobile ? 40 : 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280" 
                    tick={{ fontSize: isMobile ? 11 : 12 }}
                    angle={isMobile ? -35 : 0}
                    textAnchor={isMobile ? 'end' : 'middle'}
                    height={isMobile ? 50 : 30}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fontSize: isMobile ? 11 : 12 }}
                    width={isMobile ? 45 : 55}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '13px',
                      padding: '8px 12px'
                    }} 
                  />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-300 lg:col-span-1">
            <div className="mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2 flex-shrink-0"></span>
                Tendencia de Ventas
              </h2>
            </div>
            <div className="w-full" style={{ height: isMobile ? '240px' : isTablet ? '280px' : '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="#6b7280" 
                    tick={{ fontSize: isMobile ? 11 : 12 }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fontSize: isMobile ? 11 : 12 }}
                    width={isMobile ? 45 : 55}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '13px',
                      padding: '8px 12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="url(#lineGradient)" 
                    strokeWidth={isMobile ? 2.5 : 3}
                    dot={{ fill: '#0ea5e9', r: isMobile ? 4 : 5, strokeWidth: 2 }}
                    activeDot={{ r: isMobile ? 6 : 7 }}
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
      </div>
    </div>
  )
}
