# ManagementHeader Component

Componente genérico reutilizable para crear cabeceras consistentes en los módulos de gestión de la aplicación.

## Propiedades

```typescript
interface ManagementHeaderProps {
  title: string;                  // Título principal del módulo
  icon: LucideIcon;              // Icono de Lucide React
  itemCount: number;             // Número total de elementos para el badge
  onAddNew: () => void;          // Función para agregar nuevo elemento
  addButtonLabel: string;        // Etiqueta del botón de agregar
  searchValue: string;           // Valor actual de búsqueda
  onSearchChange: (value: string) => void; // Función de cambio de búsqueda
  searchPlaceholder: string;     // Placeholder del campo de búsqueda
  statsText: string;             // Texto de estadísticas
  className?: string;            // Clase CSS adicional
}
```

## Uso Básico

```tsx
import { ManagementHeader } from '../ui/ManagementHeader';
import { Package } from 'lucide-react';

export const ProductManagement = () => {
  return (
    <ManagementHeader
      title="Gestión de Productos"
      icon={Package}
      itemCount={products.length}
      onAddNew={handleAddProduct}
      addButtonLabel="Nuevo Producto"
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Buscar productos..."
      statsText={getProductStats()}
    />
  );
};
```

## Ejemplos de Uso

### Gestión de Contactos
```tsx
<ManagementHeader
  title="Agenda de Contactos"
  icon={Users}
  itemCount={contacts.length}
  onAddNew={openCreateModal}
  addButtonLabel="Nuevo Contacto"
  searchValue={searchTerm}
  onSearchChange={setSearchTerm}
  searchPlaceholder="Buscar por nombre, email, teléfono o empresa..."
  statsText="25 contactos"
/>
```

### Gestión de Compras
```tsx
<ManagementHeader
  title="Gestión de Compras"
  icon={ShoppingCart}
  itemCount={purchases.length}
  onAddNew={handleCreatePurchase}
  addButtonLabel="Nueva Compra"
  searchValue={searchTerm}
  onSearchChange={setSearchTerm}
  searchPlaceholder="Buscar por ID, total, estado o notas..."
  statsText="12 compras • Total: €2,450.00"
/>
```

## Características

- **Diseño consistente**: Mantiene una estructura uniforme en todos los módulos
- **Caja estilizada**: Fondo con padding de 10px y border-radius de 20px
- **Botones redondeados**: Todos los botones tienen border-radius de 10px
- **Responsive**: Se adapta automáticamente a dispositivos móviles
- **Iconos flexibles**: Acepta cualquier icono de Lucide React
- **Badge de conteo**: Muestra automáticamente el número de elementos
- **Búsqueda integrada**: Incluye campo de búsqueda con placeholder personalizable
- **Estadísticas dinámicas**: Muestra información adicional contextual
- **Tema adaptable**: Utiliza tokens de diseño del sistema
- **Sombra sutil**: Box-shadow para mejorar la profundidad visual

## Estructura Visual

```
┌─────────────────────────────────────────────────┐
│ [Icono] Título                     [Badge] [Btn]│
│ [Campo de Búsqueda]           [Estadísticas]    │
└─────────────────────────────────────────────────┘
```
*Nota: La caja tiene un padding de 10px y border-radius de 20px*
*Todos los botones tienen border-radius de 10px*

## Variables CSS Utilizadas

- `--color-surface`: Color de fondo del header
- `--color-border`: Color de los bordes
- `--color-primary`: Color del icono y badge
- `--color-text-primary`: Color del texto principal
- `--color-text-secondary`: Color del texto secundario
