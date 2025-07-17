# FormSection Component

Componente contenedor para agrupar secciones temáticas de formularios con título e icono.

## Características

- **Título con Icono**: Header seccional con icono y título personalizable
- **Variantes Temáticas**: Colores predefinidos para diferentes tipos de secciones
- **Auto-contenido**: Padding y estilos de tarjeta incluidos
- **Flexible**: Acepta cualquier contenido como children
- **Semántico**: Estructura clara y accesible

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | ✅ | Contenido de la sección |
| `title` | `string` | ✅ | Título de la sección |
| `icon` | `React.ReactNode` | ❌ | Icono para mostrar junto al título |
| `variant` | `'default' \| 'customer' \| 'items' \| 'summary'` | ❌ | Variante de color (default: 'default') |
| `className` | `string` | ❌ | Clase CSS adicional |

## Variantes

- **`default`**: Gris claro (#FAFAFA) - Para secciones generales
- **`customer`**: Azul claro (#F0F9FF) - Para información de cliente
- **`items`**: Verde claro (#F0FDF4) - Para lista de productos/items
- **`summary`**: Amarillo claro (#FEF3C7) - Para resúmenes y totales

## Uso

```tsx
import { FormSection } from '../ui/FormSection';
import { InputField } from '../ui/InputField';
import { User, ShoppingCart, Calculator } from 'lucide-react';

// Sección de cliente
<FormSection title="Cliente" icon={<User size={20} />} variant="customer">
  <InputField label="Nombre" value={formData.name} />
  <InputField label="Email" value={formData.email} />
</FormSection>

// Sección de productos
<FormSection title="Productos" icon={<ShoppingCart size={20} />} variant="items">
  {/* Lista de productos */}
</FormSection>

// Sección de resumen
<FormSection title="Resumen" icon={<Calculator size={20} />} variant="summary">
  <div>Subtotal: €100.00</div>
  <div>Total: €121.00</div>
</FormSection>

// Sección genérica
<FormSection title="Información General">
  <InputField label="Descripción" value={formData.description} />
</FormSection>
```

## Estructura CSS

```css
.section {
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  padding: 20px;
  background-color: #FAFAFA;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
```

## Casos de Uso

- **Formularios complejos** con múltiples agrupaciones temáticas
- **Wizards de múltiples pasos** donde cada paso es una sección
- **Facturas y presupuestos** con secciones de cliente, items y resumen
- **Configuraciones** agrupadas por categorías
- **Cualquier formulario** que necesite organización visual clara
