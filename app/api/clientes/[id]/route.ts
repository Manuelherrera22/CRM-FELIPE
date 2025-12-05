import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id },
      include: {
        ventas: true,
        interacciones: true,
      },
    })

    if (!cliente) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(cliente)
  } catch (error) {
    console.error('Error fetching cliente:', error)
    return NextResponse.json(
      { error: 'Error al obtener cliente' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, empresa, direccion, notas, estado } = body

    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: {
        nombre,
        email: email || null,
        telefono: telefono || null,
        empresa: empresa || null,
        direccion: direccion || null,
        notas: notas || null,
        estado: estado || 'activo',
      },
    })

    return NextResponse.json(cliente)
  } catch (error) {
    console.error('Error updating cliente:', error)
    return NextResponse.json(
      { error: 'Error al actualizar cliente' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cliente.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Cliente eliminado' })
  } catch (error) {
    console.error('Error deleting cliente:', error)
    return NextResponse.json(
      { error: 'Error al eliminar cliente' },
      { status: 500 }
    )
  }
}


