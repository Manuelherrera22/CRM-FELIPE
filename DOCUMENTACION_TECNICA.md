# 📘 Documentación Técnica - CRM Felipe

## 🎯 Índice

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Modelo de Datos](#modelo-de-datos)
6. [APIs y Endpoints](#apis-y-endpoints)
7. [Componentes Principales](#componentes-principales)
8. [Flujos de Trabajo](#flujos-de-trabajo)
9. [Instalación y Configuración](#instalación-y-configuración)
10. [Guía de Desarrollo](#guía-de-desarrollo)
11. [Despliegue](#despliegue)

---

## 📖 Introducción

**CRM Felipe** es una aplicación web moderna diseñada para la gestión integral de relaciones con clientes (CRM). El sistema permite a agencias, empresas y emprendedores gestionar eficientemente sus clientes, ventas, interacciones y tareas, con un enfoque especial en la atención al cliente.

### Características Principales

- ✅ Gestión completa de clientes (CRUD)
- ✅ Pipeline de ventas con vista Kanban
- ✅ Sistema de interacciones (llamadas, emails, reuniones)
- ✅ Gestión de tareas y recordatorios
- ✅ Dashboard con métricas y KPIs en tiempo real
- ✅ Interfaz moderna y responsive

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────┐
│           Frontend (Next.js 14)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Pages    │  │Components│  │  Hooks   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                    ↕ HTTP/REST
┌─────────────────────────────────────────────────┐
│        API Routes (Next.js API)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ /api/   │  │ /api/    │  │ /api/   │      │
│  │clientes │  │ ventas   │  │ tareas  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                    ↕ Prisma ORM
┌─────────────────────────────────────────────────┐
│        Base de Datos (SQLite)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Clientes │  │  Ventas  │  │ Tareas  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

### Patrón de Arquitectura

- **Frontend**: Server-Side Rendering (SSR) con Next.js App Router
- **Backend**: API Routes de Next.js (Serverless Functions)
- **Base de Datos**: SQLite con Prisma ORM
- **Estado**: React Hooks (useState, useEffect)
- **Estilos**: Tailwind CSS (Utility-First)

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 14.0.4 | Framework React con SSR |
| **React** | 18.2.0 | Biblioteca UI |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.3.0 | Framework CSS |
| **React Icons** | 4.12.0 | Iconografía |
| **Recharts** | 2.10.3 | Gráficos y visualizaciones |
| **date-fns** | 3.0.6 | Manipulación de fechas |
| **@dnd-kit** | 6.1.0 | Drag & Drop para Kanban |

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js API Routes** | 14.0.4 | Endpoints REST |
| **Prisma** | 5.7.1 | ORM para base de datos |
| **SQLite** | - | Base de datos relacional |

### Herramientas de Desarrollo

- **ESLint**: Linting de código
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad de CSS

---

## 📁 Estructura del Proyecto

```
CRM-FELIPE/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── clientes/            # Endpoints de clientes
│   │   │   ├── route.ts         # GET, POST /api/clientes
│   │   │   └── [id]/route.ts    # GET, PUT, DELETE /api/clientes/:id
│   │   ├── ventas/              # Endpoints de ventas
│   │   ├── tareas/               # Endpoints de tareas
│   │   ├── interacciones/       # Endpoints de interacciones
│   │   └── stats/               # Endpoint de estadísticas
│   ├── clientes/                # Página de gestión de clientes
│   │   └── page.tsx
│   ├── ventas/                  # Página de gestión de ventas
│   ├── pipeline/                # Página de pipeline Kanban
│   ├── interacciones/           # Página de interacciones
│   ├── tareas/                  # Página de tareas
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                # Dashboard (página principal)
│   └── globals.css             # Estilos globales
│
├── components/                   # Componentes React
│   ├── Sidebar.tsx              # Barra lateral de navegación
│   ├── Dashboard.tsx            # Componente del dashboard
│   ├── ClientesList.tsx         # Lista de clientes
│   ├── ClienteModal.tsx         # Modal para crear/editar cliente
│   ├── VentasList.tsx          # Lista de ventas
│   ├── VentaModal.tsx          # Modal para crear/editar venta
│   ├── PipelineKanban.tsx      # Vista Kanban del pipeline
│   ├── InteraccionesList.tsx   # Lista de interacciones
│   ├── InteraccionModal.tsx    # Modal de interacciones
│   ├── TareasList.tsx          # Lista de tareas
│   └── TareaModal.tsx          # Modal de tareas
│
├── lib/                         # Utilidades
│   └── prisma.ts               # Cliente de Prisma (singleton)
│
├── prisma/                      # Configuración de Prisma
│   ├── schema.prisma           # Esquema de base de datos
│   └── dev.db                  # Base de datos SQLite (generada)
│
├── public/                     # Archivos estáticos
│
├── .gitignore                  # Archivos ignorados por Git
├── next.config.js              # Configuración de Next.js
├── package.json                # Dependencias del proyecto
├── tailwind.config.ts          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación general
```

---

## 🗄️ Modelo de Datos

### Diagrama ER

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Cliente   │◄───────┐│    Venta    │         │  Tarea     │
├─────────────┤        │├─────────────┤         ├─────────────┤
│ id          │        ││ id          │         │ id          │
│ nombre      │        ││ clienteId   │         │ titulo      │
│ email       │        ││ titulo      │         │ clienteId?  │
│ telefono    │        ││ monto       │         │ ventaId?    │
│ empresa     │        ││ estado      │         │ estado      │
│ direccion   │        ││ prioridad   │         │ prioridad   │
│ estado      │        ││ fechaCierre │         │ fechaVencim │
│ notas       │        │└─────────────┘         │ completada  │
└─────────────┘        │      ▲                  └─────────────┘
       │               │      │                         │
       │               │      │                         │
       │               │      │                         │
       ▼               │      │                         ▼
┌─────────────┐        │      │                  ┌─────────────┐
│Interaccion │────────┘      │                  │  Usuario    │
├─────────────┤               │                  ├─────────────┤
│ id          │               │                  │ id          │
│ clienteId   │               │                  │ nombre      │
│ ventaId?    │               │                  │ email       │
│ tipo        │               │                  │ password    │
│ descripcion │               │                  │ rol         │
│ duracion    │               │                  └─────────────┘
│ resultado   │               │
│ fecha       │               │
└─────────────┘               │
                              │
                              │
```

### Modelos de Datos

#### Cliente

```typescript
{
  id: string (cuid)
  nombre: string
  email: string?
  telefono: string?
  empresa: string?
  direccion: string?
  notas: string?
  estado: "activo" | "inactivo" | "potencial"
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relaciones
  ventas: Venta[]
  interacciones: Interaccion[]
  tareas: Tarea[]
}
```

#### Venta

```typescript
{
  id: string (cuid)
  clienteId: string
  titulo: string
  descripcion: string?
  monto: number
  estado: "pendiente" | "en_proceso" | "completada" | "cancelada"
  fechaCierre: DateTime?
  prioridad: "baja" | "media" | "alta"
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relaciones
  cliente: Cliente
  interacciones: Interaccion[]
  tareas: Tarea[]
}
```

#### Interaccion

```typescript
{
  id: string (cuid)
  clienteId: string
  ventaId: string?
  tipo: "llamada" | "email" | "reunion" | "nota" | "seguimiento"
  descripcion: string
  duracion: number? (minutos)
  resultado: "exitosa" | "no_contesto" | "reprogramar" | "rechazada" | "interesado"
  fecha: DateTime
  createdAt: DateTime
  
  // Relaciones
  cliente: Cliente
  venta: Venta?
}
```

#### Tarea

```typescript
{
  id: string (cuid)
  titulo: string
  descripcion: string?
  clienteId: string?
  ventaId: string?
  estado: "pendiente" | "en_proceso" | "completada" | "cancelada"
  prioridad: "baja" | "media" | "alta"
  fechaVencimiento: DateTime?
  completada: boolean
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relaciones
  cliente: Cliente?
  venta: Venta?
}
```

#### Usuario (Preparado para autenticación)

```typescript
{
  id: string (cuid)
  nombre: string
  email: string (unique)
  password: string (hasheado)
  rol: "admin" | "usuario"
  activo: boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 🔌 APIs y Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints de Clientes

#### GET /api/clientes
Obtiene todos los clientes.

**Respuesta:**
```json
[
  {
    "id": "clxxx...",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+1234567890",
    "empresa": "Empresa S.A.",
    "estado": "activo",
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

#### POST /api/clientes
Crea un nuevo cliente.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1234567890",
  "empresa": "Empresa S.A.",
  "direccion": "Calle 123",
  "notas": "Cliente importante",
  "estado": "activo"
}
```

#### GET /api/clientes/:id
Obtiene un cliente específico con sus relaciones.

#### PUT /api/clientes/:id
Actualiza un cliente existente.

#### DELETE /api/clientes/:id
Elimina un cliente (cascada con ventas e interacciones).

### Endpoints de Ventas

#### GET /api/ventas
Obtiene todas las ventas con información del cliente.

**Respuesta:**
```json
[
  {
    "id": "vxxx...",
    "titulo": "Venta de Producto X",
    "monto": 5000.00,
    "estado": "pendiente",
    "prioridad": "alta",
    "cliente": {
      "id": "clxxx...",
      "nombre": "Juan Pérez"
    }
  }
]
```

#### POST /api/ventas
Crea una nueva venta.

**Body:**
```json
{
  "clienteId": "clxxx...",
  "titulo": "Venta de Producto X",
  "descripcion": "Descripción de la venta",
  "monto": 5000.00,
  "estado": "pendiente",
  "prioridad": "alta",
  "fechaCierre": "2024-02-01"
}
```

### Endpoints de Tareas

#### GET /api/tareas
Obtiene todas las tareas ordenadas por completadas, fecha y prioridad.

#### POST /api/tareas
Crea una nueva tarea.

**Body:**
```json
{
  "titulo": "Seguimiento con cliente",
  "descripcion": "Llamar para seguimiento",
  "clienteId": "clxxx...",
  "ventaId": "vxxx...",
  "estado": "pendiente",
  "prioridad": "media",
  "fechaVencimiento": "2024-01-20"
}
```

### Endpoints de Interacciones

#### GET /api/interacciones
Obtiene todas las interacciones ordenadas por fecha descendente.

#### POST /api/interacciones
Crea una nueva interacción.

**Body:**
```json
{
  "clienteId": "clxxx...",
  "ventaId": "vxxx...",
  "tipo": "llamada",
  "descripcion": "Llamada de seguimiento",
  "duracion": 15,
  "resultado": "exitosa"
}
```

### Endpoint de Estadísticas

#### GET /api/stats
Obtiene métricas agregadas del sistema.

**Respuesta:**
```json
{
  "totalClientes": 50,
  "totalVentas": 120,
  "ventasCompletadas": 45,
  "ventasPendientes": 30,
  "montoTotal": 500000.00,
  "montoCompletado": 200000.00,
  "totalTareas": 25,
  "tareasCompletadas": 15,
  "tareasPendientes": 10,
  "tareasVencidas": 2,
  "totalInteracciones": 200,
  "interaccionesEsteMes": 45,
  "tasaConversion": "37.5"
}
```

---

## 🧩 Componentes Principales

### Sidebar
**Ubicación:** `components/Sidebar.tsx`

Barra lateral de navegación con enlaces a todas las secciones.

**Props:** Ninguna (usa `usePathname` para detectar ruta activa)

**Características:**
- Navegación entre secciones
- Indicador de página activa
- Diseño responsive

### Dashboard
**Ubicación:** `components/Dashboard.tsx`

Vista principal con métricas y gráficos.

**Estado:**
- `stats`: Objeto con todas las métricas
- `loading`: Estado de carga

**Características:**
- 6 tarjetas de métricas clicables
- Gráfico de pie para distribución de ventas
- Gráfico de barras para ventas por estado
- Gráfico de líneas para tendencia

### PipelineKanban
**Ubicación:** `components/PipelineKanban.tsx`

Vista Kanban para gestionar el pipeline de ventas.

**Tecnología:** @dnd-kit para drag & drop

**Características:**
- 4 columnas: Pendiente, En Proceso, Completada, Cancelada
- Arrastrar y soltar ventas entre estados
- Actualización automática al mover

### ClientesList
**Ubicación:** `components/ClientesList.tsx`

Lista de clientes con búsqueda y acciones CRUD.

**Características:**
- Búsqueda en tiempo real
- Tabla responsive
- Modales para crear/editar
- Eliminación con confirmación

### VentasList
**Ubicación:** `components/VentasList.tsx`

Lista de ventas con filtros por estado.

**Características:**
- Filtro por estado
- Búsqueda por título o cliente
- Indicadores de prioridad
- Formato de moneda

### TareasList
**Ubicación:** `components/TareasList.tsx`

Gestión de tareas con alertas de vencimiento.

**Características:**
- Dashboard de métricas (vencidas, hoy, completadas)
- Filtro por estado
- Marcado rápido de completadas
- Alertas visuales para tareas vencidas

### InteraccionesList
**Ubicación:** `components/InteraccionesList.tsx`

Historial completo de interacciones.

**Características:**
- Filtro por tipo de interacción
- Iconos por tipo
- Información de duración y resultados
- Ordenamiento por fecha

---

## 🔄 Flujos de Trabajo

### Flujo: Crear un Cliente

```
1. Usuario hace clic en "Nuevo Cliente"
   ↓
2. Se abre ClienteModal
   ↓
3. Usuario completa el formulario
   ↓
4. POST /api/clientes
   ↓
5. Cliente creado en BD
   ↓
6. Modal se cierra
   ↓
7. ClientesList se actualiza
```

### Flujo: Mover Venta en Pipeline

```
1. Usuario arrastra venta en Kanban
   ↓
2. @dnd-kit detecta el cambio
   ↓
3. PUT /api/ventas/:id con nuevo estado
   ↓
4. Venta actualizada en BD
   ↓
5. PipelineKanban se actualiza
```

### Flujo: Registrar Interacción

```
1. Usuario hace clic en "Nueva Interacción"
   ↓
2. Se abre InteraccionModal
   ↓
3. Usuario selecciona cliente y tipo
   ↓
4. Usuario completa descripción y resultado
   ↓
5. POST /api/interacciones
   ↓
6. Interacción guardada
   ↓
7. Historial se actualiza
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js**: 18.x o superior
- **npm**: 9.x o superior
- **Git**: Para clonar el repositorio

### Pasos de Instalación

#### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd CRM-FELIPE
```

#### 2. Instalar Dependencias
```bash
npm install
```

#### 3. Configurar Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Crear y sincronizar base de datos
npx prisma db push
```

#### 4. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

#### 5. Abrir en el Navegador
```
http://localhost:3000
```

### Variables de Entorno

Actualmente no se requieren variables de entorno. La base de datos SQLite se crea automáticamente en `prisma/dev.db`.

Para producción con PostgreSQL, crear `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/crm_felipe?schema=public"
```

---

## 💻 Guía de Desarrollo

### Agregar un Nuevo Endpoint

1. Crear archivo en `app/api/[nombre]/route.ts`
2. Exportar funciones `GET`, `POST`, `PUT`, `DELETE`
3. Usar Prisma para operaciones de BD
4. Retornar `NextResponse.json()`

**Ejemplo:**
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.modelo.findMany()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    )
  }
}
```

### Agregar un Nuevo Componente

1. Crear archivo en `components/[Nombre].tsx`
2. Usar `'use client'` si necesita interactividad
3. Definir interfaces TypeScript para props
4. Usar Tailwind CSS para estilos

**Ejemplo:**
```typescript
'use client'

import { useState } from 'react'

interface Props {
  title: string
}

export default function MiComponente({ title }: Props) {
  const [state, setState] = useState('')
  
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}
```

### Agregar un Nuevo Modelo a la BD

1. Editar `prisma/schema.prisma`
2. Agregar modelo:
```prisma
model MiModelo {
  id        String   @id @default(cuid())
  campo     String
  createdAt DateTime @default(now())
  
  @@map("mi_modelo")
}
```
3. Ejecutar:
```bash
npx prisma db push
npx prisma generate
```

### Estructura de un Componente Completo

```typescript
'use client'

import { useState, useEffect } from 'react'
import { FiIcon } from 'react-icons/fi'

interface Data {
  id: string
  name: string
}

export default function MiComponente() {
  // Estados
  const [data, setData] = useState<Data[]>([])
  const [loading, setLoading] = useState(true)
  
  // Efectos
  useEffect(() => {
    fetchData()
  }, [])
  
  // Funciones
  const fetchData = async () => {
    try {
      const res = await fetch('/api/endpoint')
      const json = await res.json()
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  // Render
  if (loading) return <div>Cargando...</div>
  
  return (
    <div className="container">
      {/* Contenido */}
    </div>
  )
}
```

---

## 📊 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:3000` |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |
| `npm run db:generate` | Genera cliente de Prisma |
| `npm run db:push` | Sincroniza esquema con BD |
| `npm run db:studio` | Abre Prisma Studio (GUI para BD) |

---

## 🚢 Despliegue

### Opción 1: Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno (si es necesario)
3. Vercel detecta Next.js automáticamente
4. Despliegue automático en cada push

### Opción 2: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./prisma:/app/prisma
```

### Opción 3: Servidor Propio

1. Construir la aplicación:
```bash
npm run build
```

2. Iniciar servidor:
```bash
npm start
```

3. Configurar reverse proxy (Nginx) si es necesario

---

## 🔒 Seguridad

### Consideraciones Actuales

- ✅ Validación de tipos con TypeScript
- ✅ Sanitización de inputs en formularios
- ✅ Manejo de errores en APIs
- ⚠️ Autenticación: Pendiente de implementar
- ⚠️ Autorización: Pendiente de implementar
- ⚠️ Rate Limiting: Pendiente de implementar

### Mejoras Recomendadas

1. **Autenticación**: Implementar NextAuth.js
2. **Autorización**: Middleware de roles
3. **Validación**: Zod o Yup para schemas
4. **Rate Limiting**: next-rate-limit
5. **CORS**: Configurar para producción
6. **HTTPS**: Obligatorio en producción

---

## 🐛 Troubleshooting

### Error: "Cannot read properties of undefined"

**Causa:** Datos no inicializados correctamente.

**Solución:** Agregar validaciones:
```typescript
const value = data?.property || defaultValue
```

### Error: "Table does not exist"

**Causa:** Base de datos no sincronizada.

**Solución:**
```bash
npx prisma db push
npx prisma generate
```

### Error: "EPERM: operation not permitted"

**Causa:** Prisma no puede actualizar archivos en Windows.

**Solución:** Cerrar procesos que usen la BD y reintentar.

### Puerto 3000 en uso

**Solución:** Usar otro puerto:
```bash
PORT=3001 npm run dev
```

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de React](https://react.dev)

---

## 📝 Notas de Desarrollo

### Convenciones de Código

- **Componentes**: PascalCase (`MiComponente.tsx`)
- **Funciones**: camelCase (`miFuncion`)
- **Constantes**: UPPER_SNAKE_CASE (`MI_CONSTANTE`)
- **Interfaces**: PascalCase (`IMiInterface`)

### Mejores Prácticas

1. ✅ Usar TypeScript para tipado
2. ✅ Validar datos antes de guardar
3. ✅ Manejar errores apropiadamente
4. ✅ Usar componentes reutilizables
5. ✅ Mantener componentes pequeños
6. ✅ Documentar funciones complejas

---

## 👥 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto es de uso privado.

---

**Última actualización:** Enero 2024  
**Versión:** 1.0.0  
**Mantenido por:** Equipo CRM Felipe

