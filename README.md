# CRM Felipe - Sistema de Gestión de Clientes y Ventas

Sistema avanzado de CRM (Customer Relationship Management) diseñado para ayudar a agencias, empresas y emprendedores a gestionar eficientemente sus clientes y ventas, con un enfoque especial en atención al cliente.

## 🚀 Características

- **Dashboard Interactivo**: Vista general con métricas clave y gráficos de rendimiento
- **Gestión de Clientes**: CRUD completo para administrar información de clientes
- **Gestión de Ventas**: Seguimiento de oportunidades y ventas con estados y prioridades
- **Interfaz Moderna**: Diseño limpio y profesional con Tailwind CSS
- **Base de Datos**: SQLite con Prisma ORM para fácil gestión de datos

## 🛠️ Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Estilos modernos y responsivos
- **Prisma**: ORM para gestión de base de datos
- **SQLite**: Base de datos ligera y fácil de configurar
- **Recharts**: Gráficos y visualizaciones

## 📦 Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar la base de datos**:
```bash
npx prisma generate
npx prisma db push
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

4. **Abrir en el navegador**:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
CRM-FELIPE/
├── app/
│   ├── api/              # API Routes
│   │   ├── clientes/     # Endpoints de clientes
│   │   ├── ventas/       # Endpoints de ventas
│   │   └── stats/        # Estadísticas del dashboard
│   ├── clientes/         # Página de gestión de clientes
│   ├── ventas/           # Página de gestión de ventas
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Dashboard
├── components/            # Componentes React
│   ├── Dashboard.tsx
│   ├── ClientesList.tsx
│   ├── VentasList.tsx
│   └── ...
├── lib/                  # Utilidades
│   └── prisma.ts         # Cliente de Prisma
└── prisma/
    └── schema.prisma     # Esquema de base de datos
```

## 🎯 Funcionalidades Principales

### Dashboard
- Métricas en tiempo real (clientes, ventas, ingresos)
- Gráficos de ventas por estado
- Tendencia de ventas mensuales

### Gestión de Clientes
- Crear, editar y eliminar clientes
- Búsqueda y filtrado
- Estados: Activo, Potencial, Inactivo
- Información completa: contacto, empresa, dirección, notas

### Gestión de Ventas
- Crear y gestionar oportunidades de venta
- Estados: Pendiente, En Proceso, Completada, Cancelada
- Prioridades: Baja, Media, Alta
- Asociación con clientes
- Montos y fechas de cierre

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:push` - Sincroniza el esquema con la base de datos
- `npm run db:studio` - Abre Prisma Studio para gestionar la base de datos

## 📝 Modelo de Datos

### Cliente
- Información personal y de contacto
- Estado (activo, potencial, inactivo)
- Relación con ventas e interacciones

### Venta
- Título y descripción
- Monto y estado
- Prioridad y fecha de cierre
- Relación con cliente

### Interaccion
- Tipo de interacción (llamada, email, reunión, etc.)
- Descripción y fecha
- Relación con cliente y venta

## 🎨 Personalización

El sistema está diseñado para ser fácilmente personalizable:
- Colores principales en `tailwind.config.ts`
- Componentes modulares en `components/`
- Estilos globales en `app/globals.css`

## 📄 Licencia

Este proyecto es de uso privado.

## 👥 Mercado Objetivo

- Agencias de marketing y publicidad
- Empresas de servicios
- Emprendedores y freelancers
- Cualquier negocio que necesite gestionar relaciones con clientes

---

**Desarrollado con enfoque en atención al cliente y experiencia de usuario**


