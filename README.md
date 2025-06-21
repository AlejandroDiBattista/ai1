# Sistema ABM - Gestión Empresarial

Una aplicación moderna de gestión empresarial con ABM (Alta, Baja, Modificación) para contactos, productos y compras, desarrollada con React, TypeScript y Vite, siguiendo un sistema de diseño personalizado.

## Características

### ✨ Funcionalidades Principales
- **CRUD Completo**: Crear, editar, eliminar y ver contactos, productos y compras
- **Menú Lateral**: Navegación entre secciones de Contactos, Productos y Compras
- **Búsqueda Inteligente**: Filtrar por múltiples campos en tiempo real
- **Persistencia Local**: Los datos se guardan automáticamente en localStorage
- **Interfaz Responsiva**: Diseño adaptado para móviles y escritorio
- **Validación de Formularios**: Validación en tiempo real con mensajes de error claros

### 📱 Módulos Implementados

#### 👥 **Gestión de Contactos**
- Campos: Nombre, Apellidos, Email, Teléfono, Empresa, Notas
- Búsqueda por: nombre, apellido, email, teléfono o empresa
- Vista en tarjetas con información resumida
- Avatares generados automáticamente con iniciales

#### 📦 **Gestión de Productos**
- Campos: Código, Descripción, Marca, Precio, Costo, Stock
- Búsqueda por: código, descripción, marca o precio
- Cálculo automático de margen de ganancia
- Indicadores visuales de estado de stock
- Validación de números y formatos monetarios

#### 🛒 **Gestión de Compras**
- **Selección de Cliente**: Desde la lista de contactos existente
- **Productos Múltiples**: Agregar varios productos con cantidades específicas
- **Cálculo Automático**: Subtotal, IVA (21%) y total
- **Estados**: Pendiente, Confirmada, Cancelada
- **Validaciones**: Cliente obligatorio, al menos un producto, cantidades válidas
- **Búsqueda**: Por ID, total, estado o notas
- **Vista Detallada**: Información completa del cliente, productos y totales

### 🎨 Sistema de Diseño
- **Tokens de Diseño**: Colores, tipografía, espaciado y sombras consistentes
- **Componentes Reutilizables**: Button, InputField, Modal, Sidebar, etc.
- **CSS Modules**: Estilos modulares y mantenibles
- **Iconografía**: Usando Lucide React para iconos consistentes

### 📱 Características de UX
- **Sidebar Responsivo**: Menú lateral colapsable en móviles
- **Modal de Confirmación**: Confirmación antes de eliminar registros
- **Estados de Carga**: Feedback visual durante las operaciones
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Animaciones Suaves**: Transiciones y efectos hover

## Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilos**: CSS Modules
- **Iconos**: Lucide React
- **Persistencia**: localStorage

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd agenda-contactos
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador: `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la aplicación construida
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes de UI reutilizables
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   └── Modal.tsx
│   ├── ContactForm.tsx      # Formulario de contacto
│   ├── ContactList.tsx      # Lista de contactos
│   ├── ContactManagement.tsx # Gestión completa de contactos
│   ├── ProductForm.tsx      # Formulario de producto
│   ├── ProductList.tsx      # Lista de productos
│   ├── ProductManagement.tsx # Gestión completa de productos
│   ├── PurchaseForm.tsx     # Formulario de compra
│   ├── PurchaseList.tsx     # Lista de compras
│   ├── PurchaseManagement.tsx # Gestión completa de compras
│   ├── SearchBar.tsx        # Barra de búsqueda
│   └── Sidebar.tsx          # Menú lateral
├── hooks/               # Custom hooks
│   ├── useContacts.ts   # Hook para gestión de contactos
│   ├── useProducts.ts   # Hook para gestión de productos
│   └── usePurchases.ts  # Hook para gestión de compras
├── styles/              # Tokens de diseño
│   └── tokens.ts
├── types/               # Tipos TypeScript
│   ├── contact.ts
│   ├── product.ts
│   └── purchase.ts
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## Uso de la Aplicación

### Navegación
- Usar el **menú lateral** para cambiar entre Contactos, Productos y Compras
- En móviles, usar el **botón de hamburguesa** (☰) para abrir el menú

### Gestión de Contactos
1. **Crear**: Hacer clic en "Nuevo Contacto" o en el botón flotante (+)
2. **Ver**: Hacer clic en cualquier tarjeta de contacto
3. **Editar**: Usar el icono de lápiz en cada tarjeta
4. **Eliminar**: Usar el icono de papelera (con confirmación)
5. **Buscar**: Usar la barra de búsqueda en tiempo real

### Gestión de Productos
1. **Crear**: Hacer clic en "Nuevo Producto" o en el botón flotante (+)
2. **Ver**: Hacer clic en cualquier tarjeta de producto
3. **Editar**: Usar el icono de lápiz en cada tarjeta
4. **Eliminar**: Usar el icono de papelera (con confirmación)
5. **Buscar**: Filtrar por código, descripción, marca o precio

### Gestión de Compras
1. **Crear**: Hacer clic en "Nueva Compra"
2. **Seleccionar Cliente**: Elegir de la lista desplegable de contactos
3. **Agregar Productos**: 
   - Seleccionar producto de la lista desplegable
   - Ingresar cantidad deseada
   - Usar "+" para agregar más productos
   - Usar "×" para eliminar productos
4. **Ver Detalles**: Hacer clic en "Ver" para información completa
5. **Editar**: Usar el botón "Editar" (no disponible si está cancelada)
6. **Eliminar**: Usar el botón "Eliminar" (con confirmación)
7. **Buscar**: Filtrar por ID, total, estado o notas

### Funcionalidades Especiales de Productos

#### Cálculo de Margen
- Se calcula automáticamente: `((Precio - Costo) / Precio) * 100`
- Indicadores visuales:
  - 🟢 Verde: Margen > 20%
  - 🔵 Azul: Margen 10-20%
  - 🔴 Rojo: Margen < 10%

#### Estado de Stock
- **Stock Alto**: 15+ unidades (verde)
- **Stock Medio**: 5-14 unidades (naranja)
- **Stock Bajo**: 1-4 unidades (rojo)
- **Sin Stock**: 0 unidades (rojo intenso)

## Datos de Ejemplo

### Contactos
- Juan Pérez (Acme Corp)
- María García (Tech Solutions)

### Productos
- Laptop HP Pavilion 15" (LAP001)
- Mouse Inalámbrico Logitech MX Master 3 (MOU002)
- Teclado Mecánico RGB Corsair K70 (TEC003)

### Compras
- Compra #1: Juan Pérez - Laptop HP + 2x Mouse Logitech (€1,330.96)
- Compra #2: María García - Teclado Corsair (€193.59)

## Persistencia de Datos

Los datos se guardan automáticamente en localStorage del navegador:
- **Contactos**: Clave `contacts-agenda`
- **Productos**: Clave `products-inventory`
- **Compras**: Clave `purchases-management`

Los datos persisten entre sesiones, limitados al navegador actual.

## Validaciones Implementadas

### Contactos
- Nombre y apellidos: Obligatorios
- Email: Formato válido y obligatorio
- Teléfono: Obligatorio

### Productos
- Código: Obligatorio, se convierte automáticamente a mayúsculas
- Descripción y marca: Obligatorios
- Precio y costo: Números positivos obligatorios
- Stock: Número entero ≥ 0 obligatorio

### Compras
- Cliente: Obligatorio, debe seleccionarse de la lista de contactos
- Productos: Al menos un producto con cantidad válida
- Cantidades: Números enteros positivos obligatorios
- No duplicados: No se puede agregar el mismo producto múltiples veces
- Cálculo automático: IVA del 21% aplicado al subtotal

## Personalización

### Modificar el Sistema de Diseño
Los tokens de diseño se encuentran en `src/styles/tokens.ts`. Puedes modificar:
- Colores (primary, error, success, etc.)
- Tipografías (tamaños, pesos, familias)
- Espaciados (basados en grid de 4px)
- Radios de borde y sombras

### Agregar Nuevos Campos
1. Actualizar interfaces en `src/types/`
2. Modificar hooks en `src/hooks/`
3. Actualizar componentes de formulario
4. Actualizar componentes de lista

### Agregar Nuevos Módulos
1. Crear tipos en `src/types/`
2. Crear hook personalizado en `src/hooks/`
3. Crear componentes Form, List y Management
4. Agregar al Sidebar y App principal
