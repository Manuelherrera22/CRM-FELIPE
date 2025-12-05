import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tareas = await prisma.tarea.findMany({
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
          },
        },
        venta: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
      orderBy: [
        { completada: 'asc' },
        { fechaVencimiento: 'asc' },
        { prioridad: 'desc' },
      ],
    })
    return NextResponse.json(tareas)
  } catch (error: any) {
    console.error('Error fetching tareas:', error)
    // Si la tabla no existe, devolver array vacío
    if (error?.code === 'P2021' || error?.message?.includes('does not exist')) {
      return NextResponse.json([])
    }
    return NextResponse.json(
      [],
      { status: 200 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clienteId, ventaId, titulo, descripcion, estado, prioridad, fechaVencimiento } = body

    const tarea = await prisma.tarea.create({
      data: {
        clienteId: clienteId || null,
        ventaId: ventaId || null,
        titulo,
        descripcion: descripcion || null,
        estado: estado || 'pendiente',
        prioridad: prioridad || 'media',
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        completada: estado === 'completada',
      },
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
          },
        },
        venta: {
          select: {
            id: true,
            titulo: true,
          },
        },
      },
    })

    return NextResponse.json(tarea, { status: 201 })
  } catch (error) {
    console.error('Error creating tarea:', error)
    return NextResponse.json(
      { error: 'Error al crear tarea' },
      { status: 500 }
    )
  }
}

