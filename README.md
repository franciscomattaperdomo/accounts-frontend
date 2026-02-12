# Apertura de Cuentas para clientes nuevos (Frontend) 

Una aplicación web moderna de gestión de cuentas y clientes desarrollada con **Angular 16** y **Angular Material**. Este frontend se integra con servicios backend REST para la administración completa de cuentas y clientes.

## 📋 Descripción General

**Accounts Frontend** es una aplicación de una sola página (SPA) que proporciona una interfaz intuitiva para:
- Gestionar clientes (crear, editar, eliminar, listar)
- Gestionar cuentas bancarias (crear, editar, eliminar, listar)
- Visualizar la relación entre clientes y sus cuentas

La aplicación está construida con una arquitectura modular y escalable, siguiendo las mejores prácticas de Angular.

## 🎯 Características Principales

- **Gestión de Clientes**: CRUD completo (Create, Read, Update, Delete)
- **Gestión de Cuentas**: CRUD completo asociado a clientes
- **Interfaz Responsiva**: Diseño adaptable a diferentes dispositivos
- **Angular Material**: Componentes UI profesionales y accesibles
- **Reactive Forms**: Validación robusta de formularios
- **Arquitectura Modular**: Separación clara de responsabilidades

## 🛠️ Stack Tecnológico

### Dependencias Principales
- **Angular 16.2.0**: Framework principal
- **Angular Material 16.2.14**: Componentes UI
- **Angular CDK 16.2.14**: Utilidades de Angular
- **RxJS 7.8.0**: Programación reactiva
- **TypeScript 5.1.3**: Lenguaje tipado

### Dependencias de Desarrollo
- **Angular CLI 16.2.16**: Herramienta de línea de comandos
- **Angular Compiler CLI 16.2.0**: Compilador de Angular
- **Karma 6.4.0**: Test runner
- **Jasmine 4.6.0**: Framework de testing
- **TypeScript 5.1.3**: Compilador y herramientas

## 📁 Estructura del Proyecto

```
accounts-frontend/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── account/                    # Módulo de Cuentas
│   │   │   │   ├── components/
│   │   │   │   │   ├── account/           # Componente principal de cuentas
│   │   │   │   │   └── new-account/       # Componente para crear cuentas
│   │   │   │   └── account.module.ts
│   │   │   │
│   │   │   ├── customer/                  # Módulo de Clientes
│   │   │   │   ├── components/
│   │   │   │   │   ├── customer/          # Componente principal de clientes
│   │   │   │   │   └── new-customer/      # Componente para crear clientes
│   │   │   │   └── customer.module.ts
│   │   │   │
│   │   │   ├── dashboard/                 # Módulo de Dashboard
│   │   │   │   ├── components/
│   │   │   │   │   └── home/              # Componente home
│   │   │   │   ├── pages/
│   │   │   │   │   └── dashboard.component.ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   ├── dashboard-routing.module.ts
│   │   │   │   └── router-child.module.ts
│   │   │   │
│   │   │   └── shared/                    # Módulo Compartido
│   │   │       ├── components/
│   │   │       │   ├── sidenav/           # Navegación lateral
│   │   │       │   └── confirm/           # Diálogo de confirmación
│   │   │       ├── services/
│   │   │       │   ├── account.service.ts # Servicio de cuentas
│   │   │       │   └── customer.service.ts# Servicio de clientes
│   │   │       ├── material.module.ts     # Módulo de Angular Material
│   │   │       └── shared.module.ts
│   │   │
│   │   ├── app-routing.module.ts          # Rutas principales
│   │   ├── app.module.ts                  # Módulo raíz
│   │   ├── app.component.ts               # Componente raíz
│   │   └── app.component.html
│   │
│   ├── assets/
│   │   └── silent-check-sso.html          # SSO redirect silent
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css                         # Estilos globales
│
├── angular.json                           # Configuración de Angular
├── tsconfig.json                          # Configuración de TypeScript
├── tsconfig.app.json                      # Configuración de TS para aplicación
├── tsconfig.spec.json                     # Configuración de TS para tests
├── package.json                           # Dependencias del proyecto
└── README.md                              # Este archivo
```

## 🚀 Comenzar

### Requisitos Previos
- **Node.js 18+**: Runtime de JavaScript
- **npm 9+**: Gestor de paquetes
- **Angular CLI 16**: Herramienta de desarrollo

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd accounts-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

### Servidor de Desarrollo

Ejecuta el servidor de desarrollo:
```bash
npm start
```

O alternativamente:
```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Compilación

Genera los artefactos de producción:
```bash
npm run build
```

O usando Angular CLI:
```bash
ng build
```

Los artefactos se guardarán en el directorio `dist/accounts-frontend`.

## 🧪 Testing

### Ejecutar Tests Unitarios

Ejecuta los tests unitarios mediante Karma:
```bash
npm test
```

O usando Angular CLI:
```bash
ng test
```

Los tests se ejecutarán en modo watch y mostrarán un reporte de cobertura en `coverage/`.

### Ejecutar Build en Watch Mode

Para desarrollo con recarga automática:
```bash
npm run watch
```

## 📦 Módulos y Componentes

### Account Module
**Ubicación**: `src/app/modules/account/`

Gestiona la funcionalidad de cuentas bancarias:
- **AccountComponent**: Lista y visualiza todas las cuentas
- **NewAccountComponent**: Formulario para crear nuevas cuentas
- **AccountService**: Servicio REST que se comunica con el backend

**Endpoints del Backend**:
- `GET /api/accounts/all` - Obtener todas las cuentas
- `POST /api/accounts` - Crear cuenta
- `PUT /api/accounts/:id` - Actualizar cuenta
- `DELETE /api/accounts/:id` - Eliminar cuenta
- `GET /api/accounts/customerId/:customerId` - Obtener cuentas de un cliente

### Customer Module
**Ubicación**: `src/app/modules/customer/`

Gestiona la funcionalidad de clientes:
- **CustomerComponent**: Lista y visualiza todos los clientes
- **NewCustomerComponent**: Formulario para crear nuevos clientes
- **CustomerService**: Servicio REST que se comunica con el backend

**Endpoints del Backend**:
- `GET /api/customers` - Obtener todos los clientes
- `POST /api/customers` - Crear cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente
- `GET /api/customers/:id` - Obtener cliente por ID

### Dashboard Module
**Ubicación**: `src/app/modules/dashboard/`

Proporciona la página principal y el layout:
- **DashboardComponent**: Contenedor principal con sidenav
- **HomeComponent**: Página de inicio
- Integra los módulos de Account y Customer

### Shared Module
**Ubicación**: `src/app/modules/shared/`

Componentes y servicios compartidos:
- **SidenavComponent**: Navegación principal de la aplicación
- **ConfirmComponent**: Diálogo de confirmación reutilizable
- **AccountService**: Servicio para operaciones CRUD de cuentas
- **CustomerService**: Servicio para operaciones CRUD de clientes
- **MaterialModule**: Centraliza las importaciones de Angular Material

## 🎨 Angular Material

El proyecto incluye la mayoría de componentes de Angular Material:
- Tables
- Forms (Input, Select, Checkbox, Radio)
- Dialogs
- Buttons
- Cards
- Menus
- Toolbars
- Sidebars
- Y muchos más...

Ver `src/app/modules/shared/material.module.ts` para la lista completa.

## 🔌 API Backend

La aplicación se conecta a un servidor backend en `http://localhost:8080/api`.

### Base URL
```
http://localhost:8080/api
```

### Endpoints Principales

**Clientes**:
- `GET /customers` - Listar clientes
- `GET /customers/:id` - Obtener cliente
- `POST /customers` - Crear cliente
- `PUT /customers/:id` - Actualizar cliente
- `DELETE /customers/:id` - Eliminar cliente

**Cuentas**:
- `GET /accounts/all` - Listar todas las cuentas
- `GET /accounts/customerId/:customerId` - Cuentas de un cliente
- `POST /accounts` - Crear cuenta
- `PUT /accounts/:id` - Actualizar cuenta
- `DELETE /accounts/:id` - Eliminar cuenta

## 📝 Scripts NPM

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo (ng serve) |
| `npm run build` | Compilar para producción (ng build) |
| `npm run watch` | Compilar con watch mode en desarrollo (ng build --watch) |
| `npm test` | Ejecutar tests unitarios (ng test) |

## 🔧 Configuración

### TypeScript Configuration
- **Target**: ES2022
- **Module**: ES2022
- **Strict Mode**: Habilitado
- **Source Maps**: Habilitado para debugging

### Angular Configuration
- **Output Path**: `dist/accounts-frontend`
- **Theme Material**: Indigo-Pink
- **Hash Routing**: Habilitado
- **Budget de Build**: 500KB (warning) / 1MB (error)

## 📚 Recursos Adicionales

- [Angular Documentation](https://angular.io)
- [Angular Material Documentation](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 🐛 Troubleshooting

### Puerto 4200 en uso
```bash
ng serve --port 4300
```

### Limpiar node_modules
```bash
rm -r node_modules
npm install
```

### Limpiar cache Angular
```bash
ng cache clean
```
## 📄 Licencia

Este proyecto es parte del sistema de microservicios de gestión de cuentas.

## 👥 Equipo de Desarrollo

Proyecto desarrollado como parte del ecosistema de microservicios para gestión de cuentas y clientes.
