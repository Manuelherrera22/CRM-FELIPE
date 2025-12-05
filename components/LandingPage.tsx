'use client'

import Link from 'next/link'
import { FiArrowRight, FiUsers, FiDollarSign, FiLayers, FiCheckSquare, FiMessageSquare, FiTrendingUp, FiShield, FiZap, FiBarChart2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const features = [
    {
      icon: FiUsers,
      title: 'Gestión de Clientes',
      description: 'Organiza toda la información de tus clientes en un solo lugar. Nunca pierdas un contacto importante.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiLayers,
      title: 'Pipeline Visual',
      description: 'Gestiona tus ventas con un sistema Kanban intuitivo. Arrastra y suelta para actualizar estados.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiDollarSign,
      title: 'Control de Ventas',
      description: 'Sigue cada oportunidad de venta desde el inicio hasta el cierre. Nunca pierdas una venta.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiMessageSquare,
      title: 'Historial Completo',
      description: 'Registra todas tus interacciones: llamadas, emails, reuniones. Todo en un solo lugar.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiCheckSquare,
      title: 'Tareas Inteligentes',
      description: 'Nunca olvides un seguimiento. Sistema de tareas con recordatorios y alertas automáticas.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: FiBarChart2,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboard con métricas clave y gráficos interactivos para tomar decisiones informadas.',
      color: 'from-teal-500 to-cyan-500'
    },
  ]

  const stats = [
    { number: '100%', label: 'Aumento en Organización' },
    { number: '50%', label: 'Más Ventas Cerradas' },
    { number: '80%', label: 'Tiempo Ahorrado' },
    { number: '24/7', label: 'Disponible' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                ✨ Sistema CRM Profesional
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Gestiona tus{' '}
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Clientes y Ventas
              </span>
              <br />
              como un Pro
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              La herramienta que necesitas para llevar tu negocio al siguiente nivel. 
              Organiza, gestiona y cierra más ventas con nuestro CRM inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link
                href="/dashboard"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Empezar Ahora</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-primary-300 transform hover:scale-105 transition-all duration-300">
                Ver Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            Todo lo que necesitas en{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              un solo lugar
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Funcionalidades diseñadas para hacer crecer tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                <div className={`relative inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Únete a cientos de empresas que ya están usando CRM Felipe para gestionar sus clientes y aumentar sus ventas.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Empezar Gratis</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">CRM Felipe</h3>
            <p className="text-gray-400 mb-4">Gestión Inteligente de Clientes y Ventas</p>
            <div className="flex justify-center space-x-6">
              <Link href="/landing" className="hover:text-white transition-colors">Inicio</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/landing" className="hover:text-white transition-colors">Características</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
              © 2024 CRM Felipe. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

