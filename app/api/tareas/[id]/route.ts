import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { clienteId, ventaId, titulo, descripcion, estado, prioridad, fechaVencimiento, completada } = body

    const tarea = await prisma.tarea.update({
      where: { id: params.id },
      data: {
        clienteId: clienteId || null,
        ventaId: ventaId || null,
        titulo,
        descripcion: descripcion || null,
        estado: estado || 'pendiente',
        prioridad: prioridad || 'media',
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        completada: completada !== undefined ? completada : (estado === 'completada'),
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

    return NextResponse.json(tarea)
  } catch (error) {
    console.error('Error updating tarea:', error)
    return NextResponse.json(
      { error: 'Error al actualizar tarea' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tarea.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Tarea eliminada' })
  } catch (error) {
    console.error('Error deleting tarea:', error)
    return NextResponse.json(
      { error: 'Error al eliminar tarea' },
      { status: 500 }
    )
  }
}

