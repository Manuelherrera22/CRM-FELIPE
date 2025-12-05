import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { clienteId, ventaId, tipo, descripcion, duracion, resultado } = body

    const interaccion = await prisma.interaccion.update({
      where: { id: params.id },
      data: {
        clienteId,
        ventaId: ventaId || null,
        tipo,
        descripcion,
        duracion: duracion ? parseInt(duracion) : null,
        resultado: resultado || null,
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

    return NextResponse.json(interaccion)
  } catch (error) {
    console.error('Error updating interaccion:', error)
    return NextResponse.json(
      { error: 'Error al actualizar interacción' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.interaccion.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Interacción eliminada' })
  } catch (error) {
    console.error('Error deleting interaccion:', error)
    return NextResponse.json(
      { error: 'Error al eliminar interacción' },
      { status: 500 }
    )
  }
}

