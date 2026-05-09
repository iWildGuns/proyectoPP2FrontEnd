# Sistema de Login - Guía de Uso

## Descripción General

Se ha implementado un sistema completo de autenticación para tu aplicación Angular que protege el acceso al layout principal.

## Flujo de Autenticación

```
Usuario no logueado → Login Page (login/) 
                  ↓
            Ingresa credenciales
                  ↓
          AuthService.login() valida
                  ↓
        ✓ Credenciales correctas → Main Layout (main/)
        ✗ Credenciales incorrectas → Mostrar error
```

## Archivos Creados/Modificados

### 1. **Componente Login** (`src/app/layout/login/`)
- `login.ts`: Componente standalone con validación reactiva
- `login.html`: Formulario con validación en tiempo real
- `login.css`: Estilos modernos con gradientes y animaciones

#### Características del Login:
- ✓ Validación de email y contraseña
- ✓ Mensajes de error contextuales
- ✓ Indicador de carga durante autenticación
- ✓ Botón "Cargar datos de prueba" para testing
- ✓ Diseño responsive

### 2. **AuthService Mejorado** (`src/app/services/auth.service.ts`)
Nuevos métodos:
- `login(credentials: LoginRequest)`: Autentica al usuario
- `isLoggedIn()`: Verifica si hay usuario logueado
- `logout()`: Cierra la sesión
- Persistencia con localStorage

### 3. **Guards** (`src/app/guards/auth.guard.ts`)
- `authGuard`: Protege rutas que requieren autenticación
- `noAuthGuard`: Previene que usuarios logueados vuelvan al login

### 4. **Rutas Actualizadas** (`src/app/app.routes.ts`)
```
/ → redirige a /main
/login → Login (solo si NO está logueado)
/main → MainLayout (solo si ESTÁ logueado)
```

### 5. **Componente Principal** (`src/app/app.ts` y `app.html`)
- Ahora usa RouterOutlet para renderizar rutas

## Credenciales de Prueba

```
Email: juan@restaurant.com
Contraseña: password123
Rol: ADMIN

Email: maria@restaurant.com
Contraseña: password123
Rol: GERENTE
```

## Cómo Funcionan los Guards

### authGuard (Para rutas protegidas como /main)
```typescript
Si usuario está logueado → Permite acceso
Si NO está logueado → Redirige a /login
```

### noAuthGuard (Para login)
```typescript
Si usuario está logueado → Redirige a /main
Si NO está logueado → Permite acceso al login
```

## Persistencia de Sesión

El usuario se guarda en `localStorage` al iniciar sesión, permitiendo que:
- La sesión persista al recargar la página
- La sesión se cierre al hacer logout
- El usuario sea validado al cargar la aplicación

## Próximos Pasos Opcionales

1. **Integrar con backend real**: Reemplaza la lógica de login en AuthService con llamadas HTTP
2. **Recuperación de contraseña**: Agregar formulario de reset
3. **Registro de usuarios**: Crear página de registro
4. **2FA**: Implementar autenticación de dos factores
5. **Refresh tokens**: Manejar expiración de sesiones

## Testing

Para probar el login:
1. La aplicación abrirá el login por defecto
2. Usa los datos de prueba o crea nuevos usuarios en `AuthService`
3. Al hacer logout desde el main-layout, volverá al login automáticamente
