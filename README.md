# 🛍️ Tienda Geek con Angular 20

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
## Ejecutar Mock API JSON Server

En otra terminal, navega a la carpeta del proyecto y ejecuta:
```bash
json-server db.json --port 3000
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

## Decisiones de UI/UX

### 1. Diseño Responsivo
Responsive Design: Se utilizó un diseño responsivo para garantizar que la aplicación funcione bien en dispositivos de diferentes tamaños (móviles, tabletas y escritorios). Esto se logró utilizando Angular Material y técnicas de diseño como Flexbox y CSS Grid.

### 2. Paleta de Colores y Tipografía
Colores Pastel: Se eligió una paleta de colores pastel para crear una experiencia visual agradable y amigable. Esto ayuda a atraer a los usuarios y hace que la interfaz sea menos intimidante.

Tipografía Clara y Legible: Se seleccionó una tipografía que sea clara y fácil de leer, mejorando la accesibilidad y la experiencia general del usuario.

### 3. Navegación Intuitiva
Menú de Navegación: Se implementó un menú de navegación claro y accesible, lo que permite a los usuarios encontrar fácilmente los productos y acceder a diferentes secciones de la tienda.
Acciones Claras: Las acciones disponibles (agregar al carrito, ver detalles del producto) están claramente indicadas, lo que mejora la usabilidad.

### 4. Interacción del Usuario
Feedback Visual: Se proporciona feedback visual inmediato al usuario cuando se realizan acciones, como agregar un producto al carrito. Esto se logra mediante notificaciones y cambios en el estado de los botones.

### 5. Trade-offs
Complejidad vs. Rendimiento: La implementación de SSR agrega complejidad al proyecto, pero el beneficio en rendimiento y SEO justifica esta decisión. Se consideró que la mejora en la experiencia del usuario al cargar más rápido era crítica.

Flexibilidad vs. Estructura: La elección de una arquitectura modular con componentes standalone y un estado predecible con NgRx proporciona flexibilidad para escalar, pero también requiere más tiempo de configuración y comprensión por parte del equipo.

## Pendientes Conocidos

- Arreglo del carrito de compras cuando se selecciona un producto nuevo se guarda el producto en el carrito pero para actualizar el carrito con el mismo producto crea otro nuevo producto, para mejorarlo seria de consumir un servicio PUT para actualizar el carrito, y si es el mismo producto solo se deberia sumar la cantidad a ese producto.

- Pantalla de Error o Fallback si falla el servicio del checkout de la compra.

Por motivos de tiempo no se puedo agregar esos cambios.

