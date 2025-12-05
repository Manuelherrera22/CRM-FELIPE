import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM Felipe - Gestión de Clientes y Ventas',
  description: 'Sistema avanzado de CRM para gestionar clientes y ventas con enfoque en atención al cliente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto lg:ml-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}


