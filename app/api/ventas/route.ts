import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(ventas)
  } catch (error) {
    console.error('Error fetching ventas:', error)
    return NextResponse.json(
      { error: 'Error al obtener ventas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clienteId, titulo, descripcion, monto, estado, prioridad, fechaCierre } = body

    const venta = await prisma.venta.create({
      data: {
        clienteId,
        titulo,
        descripcion: descripcion || null,
        monto: parseFloat(monto),
        estado: estado || 'pendiente',
        prioridad: prioridad || 'media',
        fechaCierre: fechaCierre ? new Date(fechaCierre) : null,
      },
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    })

    return NextResponse.json(venta, { status: 201 })
  } catch (error) {
    console.error('Error creating venta:', error)
    return NextResponse.json(
      { error: 'Error al crear venta' },
      { status: 500 }
    )
  }
}


