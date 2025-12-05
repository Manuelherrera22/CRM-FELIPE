import { redirect } from 'next/navigation'

export default function Home() {
  // Redirigir a landing por defecto, o cambiar a /dashboard si prefieres
  redirect('/landing')
}


