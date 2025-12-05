import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const interacciones = await prisma.interaccion.findMany({
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
      orderBy: { fecha: 'desc' },
    })
    return NextResponse.json(interacciones)
  } catch (error: any) {
    console.error('Error fetching interacciones:', error)
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
    const { clienteId, ventaId, tipo, descripcion, duracion, resultado } = body

    const interaccion = await prisma.interaccion.create({
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

    return NextResponse.json(interaccion, { status: 201 })
  } catch (error) {
    console.error('Error creating interaccion:', error)
    return NextResponse.json(
      { error: 'Error al crear interacción' },
      { status: 500 }
    )
  }
}

