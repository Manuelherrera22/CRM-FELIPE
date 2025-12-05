import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM Felipe - Gestiona tus Clientes y Ventas como un Pro',
  description: 'Sistema CRM profesional para gestionar clientes, ventas y relaciones comerciales. Aumenta tus ventas y organiza tu negocio.',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

