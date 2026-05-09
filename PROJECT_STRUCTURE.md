# RestoApp - Estructura del Proyecto

## 📁 Estructura General

```
src/app/
├── layout/                    # Layouts principales
│   └── main-layout/          # Layout principal (3 columnas)
├── components/               # Componentes reutilizables
│   ├── salon-list/          # Lista de salones (columna izquierda)
│   ├── main-panel/          # Panel principal (columna central)
│   └── config-menu/         # Menú de configuración (columna derecha)
├── modules/                  # Módulos funcionales (futuros)
│   ├── dashboard/
│   ├── salones/
│   ├── mesas/
│   ├── platillos/
│   ├── consumos/
│   └── reportes/
├── models/                   # Interfaces y tipos TypeScript
│   ├── salon.model.ts
│   ├── mesa.model.ts
│   ├── platillo.model.ts
│   ├── consumo.model.ts
│   ├── usuario.model.ts
│   ├── reporte.model.ts
│   └── index.ts
├── services/                 # Servicios de datos y lógica
│   ├── salon.service.ts
│   ├── auth.service.ts
│   └── index.ts
├── app.ts                    # Componente raíz
├── app.html                  # Template de la app
├── app.css                   # Estilos de la app
├── app.routes.ts             # Rutas
└── app.config.ts             # Configuración
```

## 🎯 Componentes Actuales

### MainLayout
- **Ubicación**: `layout/main-layout`
- **Descripción**: Layout principal de 3 columnas con header
- **Estructura**:
  - Header: Título "RestoApp" y subtítulo
  - Left Sidebar (25%): Lista de salones
  - Main Content (50%): Panel dinámico
  - Right Sidebar (25%): Menú de usuario y configuración

### SalonListComponent
- **Ubicación**: `components/salon-list`
- **Descripción**: Listado interactivo de salones
- **Features**:
  - Selección de salones
  - Muestra capacidad, número de mesas
  - Indicador de estado (habilitado/deshabilitado)

### MainPanelComponent
- **Ubicación**: `components/main-panel`
- **Descripción**: Panel central dinámico
- **Features**:
  - Muestra información del salón seleccionado
  - Grid de información (capacidad, mesas, fechas)
  - Listado de mesas del salón

### ConfigMenuComponent
- **Ubicación**: `components/config-menu`
- **Descripción**: Menú lateral derecho
- **Features**:
  - Información del usuario actual
  - Menú de opciones (Configuración, Reportes, Usuarios, Auditoría, Ayuda)
  - Botón de logout

## 🔧 Servicios

### SalonService
- **Métodos principales**:
  - `getSalones()`: Obtiene la lista de salones
  - `selectSalon(salon)`: Selecciona un salón
  - `addSalon(salon)`: Añade nuevo salón
  - `updateSalon(salon)`: Actualiza salón
  - `deleteSalon(id)`: Elimina salón

### AuthService
- **Métodos principales**:
  - `getUsuarioActual()`: Obtiene usuario actual
  - `logout()`: Cierra sesión
  - `isAdmin()`: Verifica si es admin
  - `isGerente()`: Verifica si es gerente

## 📊 Modelos de Datos

### Salon
- id, nombre, descripcion, capacidad, habilitado, mesas, fechaCreacion, fechaModificacion

### Mesa
- id, numero, capacidad, salonId, estado, clientesActuales, meseroAsignado, etc.

### Platillo
- id, nombre, descripcion, categoria, precio, disponible, tiempoPreparacion, etc.

### Usuario
- id, nombre, apellido, email, telefono, rol, activo, salonAsignado, etc.

### Consumo/Orden
- Gestión de pedidos y pagos

### Reporte
- Ocupación, ingresos, desempeño de meseros

## 🎨 Estilos

- **Header**: Gradiente azul/púrpura (#667eea - #764ba2)
- **Colores principales**: 
  - Primario: #667eea
  - Secundario: #764ba2
  - Éxito: #d4edda (verde)
  - Error: #f8d7da (rojo)

## 📝 Próximos Pasos

1. Crear servicios para mesas, platillos y consumos
2. Implementar componentes dentro de cada módulo
3. Añadir formularios para CRUD
4. Implementar rutas y navegación
5. Conectar con backend API
