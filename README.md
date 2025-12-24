# 🛍️ TiendaOnline - E-commerce con Angular 20

Aplicación de tienda en línea moderna construida con Angular 20, implementando SSR (Server-Side Rendering), NgRx para gestión de estado, Angular Material con tema personalizado en colores pastel azul y morado, y diseño responsive.

## ✨ Características

### Funcionalidades Principales
- ✅ Listado y búsqueda de productos con filtros avanzados
- ✅ Vista detallada de productos con información completa
- ✅ Carrito de compras con gestión de cantidades
- ✅ Proceso de checkout completo (simulado)
- ✅ Simulación de pago con tarjeta de crédito
- ✅ Confirmación de pedido

### Características Técnicas
- 🚀 Angular 20 con Server-Side Rendering (SSR)
- 🔄 NgRx para gestión de estado global
- 🎨 Angular Material con tema personalizado
- 📱 Diseño completamente responsive (Mobile/Tablet/Desktop)
- ♿ Accesibilidad básica implementada
- 🎯 Arquitectura modular y escalable
- 🧪 JSON Server para mock API

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Angular CLI**: v20.0.0 o superior

```bash
# Verificar versiones instaladas
node --version
npm --version
ng version
```
## Instalación
```bash
git clone https://github.com/mariobeltran06/online-store-ssr.git
cd online-store-ssr
npm install
```
## Ejecutar en Desarrollo
```bash
ng serve
```
## Build SSR + serve
```bash
npm run build:ssr
npm run serve:ssr
```
## Decisiones Técnicas

### 1. Arquitectura del Proyecto
Patrón de Diseño Modular: Se utilizó un enfoque modular en la estructura del proyecto, separando las funcionalidades en módulos (por ejemplo, módulos de productos y carrito). Esto facilita el mantenimiento y escalabilidad.

Componentes Autónomos: Se implementaron componentes autónomos, lo que permite una reutilización eficiente y una mejor organización del código.

### 2. Gestión del Estado
NgRx para la Gestión del Estado: Se eligió NgRx debido a su capacidad para manejar estados complejos de aplicaciones de manera predecible. Proporciona un flujo unidireccional de datos, lo que facilita el seguimiento de los cambios en el estado.

Efectos para Llamadas Asíncronas: Se implementaron efectos para manejar la lógica asincrónica, como la interacción con la API. Esto separa las preocupaciones y permite que los componentes se centren en la presentación.

### 3. Server-Side Rendering (SSR)
Utilización de SSR: Se implementó SSR para mejorar el rendimiento y la SEO de la aplicación. Esto permite que las páginas se rendericen en el servidor antes de enviarse al cliente, lo que mejora el tiempo de carga inicial y la indexación por parte de los motores de búsqueda.

Hydratación: Se configuró correctamente la hidratación para garantizar que la aplicación Angular funcione sin problemas después de que se haya renderizado en el servidor.

### 4. API Simulada con JSON Server
Uso de JSON Server: Se utilizó JSON Server para simular las llamadas a la API durante el desarrollo. Esto permite un desarrollo rápido y la posibilidad de realizar pruebas sin necesidad de un backend completo.
