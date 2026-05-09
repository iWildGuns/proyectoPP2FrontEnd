# 🍽️ RestoApp - Guía de Desarrollo

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js v20+ (se recomienda versión LTS)
- Angular CLI instalado: `npm install -g @angular/cli`
- npm o pnpm

### Instalación
```bash
# Instalar dependencias
npm install

# O con pnpm
pnpm install
```

### Ejecutar la aplicación
```bash
# Opción 1: Comando directo
ng serve --open

# Opción 2: Script PowerShell
.\start-dev.ps1

# Opción 3: En puerto específico
ng serve --port 4201 --open
```

La aplicación se abrirá automáticamente en `http://localhost:4200`

## 📁 Estructura de Carpetas

### `/src/app/`
```
app/
├── layout/              # Componentes de layout
├── components/          # Componentes reutilizables
├── modules/             # Módulos funcionales (futuros)
├── models/              # Interfaces TypeScript
├── services/            # Servicios de datos
└── app.ts              # Componente raíz
```

## 🧩 Componentes Principales

### MainLayout
- Layout base de 3 columnas
- Header con título "RestoApp"
- Estructura: Left Sidebar (25%) | Center Panel (50%) | Right Sidebar (25%)

### SalonListComponent
- Lista interactiva de salones
- Selección mediante click
- Muestra capacidad y estado

### MainPanelComponent
- Panel dinámico central
- Muestra detalles del salón seleccionado
- Grid de información y listado de mesas

### ConfigMenuComponent
- Menú de usuario a la derecha
- Opciones de configuración
- Botón de logout

## 🔧 Servicios Disponibles

### SalonService
```typescript
// Obtener lista de salones
salonService.getSalones()

// Seleccionar un salón
salonService.selectSalon(salon)

// Obtener salón seleccionado
salonService.getSelectedSalon()

// CRUD
salonService.addSalon(salon)
salonService.updateSalon(salon)
salonService.deleteSalon(id)
```

### AuthService
```typescript
// Usuario actual
authService.getUsuarioActual()

// Verificar rol
authService.isAdmin()
authService.isGerente()

// Logout
authService.logout()
```

## 🎨 Colores del Sistema

```
Primario:    #667eea (Azul)
Secundario:  #764ba2 (Púrpura)
Éxito:       #d4edda (Verde)
Error:       #f8d7da (Rojo)
Gris:        #f5f5f5 - #999
```

## 📝 Próximas Tareas

1. **Implementar servicios adicionales**
   - MesaService
   - PlatilloService
   - ConsumoService
   - UsuarioService

2. **Crear componentes de módulos**
   - Dashboard
   - Gestión de Salones
   - Gestión de Mesas
   - Gestión de Platillos
   - Control de Consumo
   - Reportes

3. **Implementar CRUD**
   - Formularios para crear/editar
   - Validaciones
   - Modales de confirmación

4. **Agregar rutas**
   - Enrutamiento entre módulos
   - Lazy loading
   - Protección de rutas

5. **Conectar API**
   - HttpClient
   - Interceptores
   - Manejo de errores

## 🐛 Debugging

### Chrome DevTools
1. F12 para abrir las herramientas de desarrollo
2. Pestaña Angular para ver el árbol de componentes
3. Consola para ver logs y errores

### Console Logs
```typescript
// En componentes
console.log('Salones:', this.salones$);

// En servicios
console.log('Salon seleccionado:', this.selectedSalonSubject.value);
```

## 📚 Recursos Útiles

- [Angular Documentation](https://angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Bootstrap 5 (si se usa)](https://getbootstrap.com/)

## ✅ Checklist Antes de Commit

- [ ] Sin errores de compilación
- [ ] Funcionamiento en navegador
- [ ] Estilos aplicados correctamente
- [ ] Datos fluyen correctamente entre componentes
- [ ] Console sin errores
