import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(clientes)
  } catch (error: any) {
    console.error('Error fetching clientes:', error)
    // Si la tabla no existe, devolver array vacío
    if (error?.code === 'P2021' || error?.message?.includes('does not exist')) {
      return NextResponse.json([])
    }
    // En caso de otro error, devolver array vacío para evitar errores en el frontend
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, empresa, direccion, notas, estado } = body

    const cliente = await prisma.cliente.create({
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

    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    console.error('Error creating cliente:', error)
    return NextResponse.json(
      { error: 'Error al crear cliente' },
      { status: 500 }
    )
  }
}


