# ListCard Component

Componente contenedor estandarizado para elementos de lista con estilo de tarjeta y comportamiento de hover.

## Características

- **Diseño Uniforme**: Estilo consistente para todas las tarjetas de lista
- **Interactividad**: Hover con elevación y sombra
- **Responsive**: Se adapta automáticamente a diferentes tamaños
- **Clickeable**: Manejo de clicks con propagation control
- **Flexible**: Acepta cualquier contenido como children

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | ✅ | Contenido de la tarjeta |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | Función a ejecutar al hacer click |
| `className` | `string` | ❌ | Clase CSS adicional |

## Uso

```tsx
import { ListCard } from '../ui/ListCard';
import { ListItemActions } from '../ui/ListItemActions';

// Tarjeta de contacto
<ListCard onClick={(e) => handleCardClick(contact, e)}>
  <div className="avatar">
    {contact.initials}
  </div>
  
  <div className="info">
    <h3>{contact.name}</h3>
    <p>{contact.email}</p>
  </div>
  
  <ListItemActions
    item={contact}
    onEdit={onEdit}
    onDelete={onDelete}
  />
</ListCard>

// Tarjeta de producto
<ListCard onClick={(e) => handleCardClick(product, e)}>
  <div className="product-icon">
    {product.code}
  </div>
  
  <div className="details">
    <h3>{product.name}</h3>
    <p>Stock: {product.stock}</p>
    <p>Precio: {formatCurrency(product.price)}</p>
  </div>
  
  <ListItemActions
    item={product}
    onEdit={onEdit}
    onDelete={onDelete}
  />
</ListCard>
```

## Estructura Típica

```tsx
<ListCard onClick={handleClick}>
  {/* Avatar/Icono - Lado izquierdo */}
  <div className="avatar">...</div>
  
  {/* Información principal - Centro */}
  <div className="info">
    <h3>Título</h3>
    <div className="details">
      <div>Detalle 1</div>
      <div>Detalle 2</div>
    </div>
  </div>
  
  {/* Acciones - Lado derecho */}
  <ListItemActions ... />
</ListCard>
```

## Control de Clicks

```tsx
const handleCardClick = (item: any, e: React.MouseEvent) => {
  // Evitar abrir modal si se hizo click en un botón de acción
  if ((e.target as HTMLElement).closest('button')) {
    return;
  }
  onView(item);
};

<ListCard onClick={(e) => handleCardClick(item, e)}>
  {/* contenido */}
</ListCard>
```

## Estilos Aplicados

```css
.card {
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## Casos de Uso

- **Listas de contactos** - Información personal con avatar
- **Catálogo de productos** - Detalles de producto con precios
- **Lista de compras** - Información de transacciones
- **Lista de tareas** - Items con estado y acciones
- **Cualquier lista** que necesite tarjetas clickeables y consistentes

## Ventajas

1. **Consistencia**: Todas las listas tienen el mismo estilo
2. **DRY**: Elimina duplicación de estilos de tarjeta
3. **Mantenibilidad**: Cambios centralizados afectan todas las listas
4. **UX**: Feedback visual uniforme (hover, transitions)
5. **Accesibilidad**: Comportamiento clickeable estándar

## Migración desde Tarjeta Manual

Antes:
```tsx
<div className="contact-card" onClick={handleClick}>
  {/* contenido */}
</div>
```

Después:
```tsx
<ListCard onClick={handleClick}>
  {/* contenido */}
</ListCard>
```

## Responsive Behavior

ListCard se adapta automáticamente:
- **Desktop**: Hover con elevación completa
- **Mobile**: Touch-friendly con feedback táctil
- **Spacing**: Gap automático entre elementos internos

## Integración con Otros Componentes

ListCard funciona perfectamente con:
- **ListItemActions**: Botones de acción siempre a la derecha
- **Avatar/Icons**: Elementos visuales a la izquierda
- **Content sections**: Información principal en el centro
- **Badges/Status**: Elementos de estado en cualquier posición
