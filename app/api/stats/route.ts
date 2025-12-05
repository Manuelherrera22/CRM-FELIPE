import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      totalClientes,
      totalVentas,
      ventasCompletadas,
      ventasPendientes,
      ventasData,
    ] = await Promise.all([
      prisma.cliente.count().catch(() => 0),
      prisma.venta.count().catch(() => 0),
      prisma.venta.count({ where: { estado: 'completada' } }).catch(() => 0),
      prisma.venta.count({ where: { estado: 'pendiente' } }).catch(() => 0),
      prisma.venta.findMany({
        where: { estado: 'completada' },
        select: { monto: true },
      }).catch(() => []),
    ])

    // Intentar obtener estadísticas de tareas e interacciones, pero no fallar si no existen
    let totalTareas = 0
    let tareasCompletadas = 0
    let tareasPendientes = 0
    let tareasVencidas = 0
    let totalInteracciones = 0
    let interaccionesEsteMes = 0

    try {
      const [tareasTotal, tareasCompl, tareasPend, tareasVenc, interaccionesTotal, interaccionesMes] = await Promise.all([
        prisma.tarea.count().catch(() => 0),
        prisma.tarea.count({ where: { completada: true } }).catch(() => 0),
        prisma.tarea.count({ where: { completada: false } }).catch(() => 0),
        prisma.tarea.count({
          where: {
            completada: false,
            fechaVencimiento: { lt: new Date() },
          },
        }).catch(() => 0),
        prisma.interaccion.count().catch(() => 0),
        prisma.interaccion.count({
          where: {
            fecha: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }).catch(() => 0),
      ])
      totalTareas = tareasTotal
      tareasCompletadas = tareasCompl
      tareasPendientes = tareasPend
      tareasVencidas = tareasVenc
      totalInteracciones = interaccionesTotal
      interaccionesEsteMes = interaccionesMes
    } catch (e) {
      // Si las tablas no existen aún, usar valores por defecto
      console.log('Tablas de tareas o interacciones no disponibles aún')
    }

    const montoCompletado = ventasData.reduce((sum, venta) => sum + (venta.monto || 0), 0)
    const todasLasVentas = await prisma.venta.findMany({ select: { monto: true } }).catch(() => [])
    const montoTotal = todasLasVentas.reduce((sum, venta) => sum + (venta.monto || 0), 0)

    const tasaConversion = totalVentas > 0 
      ? ((ventasCompletadas / totalVentas) * 100).toFixed(1)
      : '0'

    return NextResponse.json({
      totalClientes: totalClientes || 0,
      totalVentas: totalVentas || 0,
      ventasCompletadas: ventasCompletadas || 0,
      ventasPendientes: ventasPendientes || 0,
      montoTotal: montoTotal || 0,
      montoCompletado: montoCompletado || 0,
      totalTareas,
      tareasCompletadas,
      tareasPendientes,
      tareasVencidas,
      totalInteracciones,
      interaccionesEsteMes,
      tasaConversion,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Devolver valores por defecto en caso de error
    return NextResponse.json({
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
  }
}


