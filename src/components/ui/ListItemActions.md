# ListItemActions Component

Componente genérico reutilizable para manejar las acciones de editar y eliminar en elementos de listas.

## Propiedades

```typescript
interface ListItemActionsProps<T = any> {
  item: T;                          // El elemento sobre el cual actuar
  onEdit: (item: T) => void;        // Función para editar el elemento
  onDelete: (item: T) => void;      // Función para eliminar el elemento
  editLabel?: string;               // Etiqueta del botón de editar (default: "Editar")
  deleteLabel?: string;             // Etiqueta del botón de eliminar (default: "Eliminar")
  showConfirmation?: boolean;       // Mostrar confirmación antes de eliminar (default: true)
  confirmationMessage?: string;     // Mensaje personalizado de confirmación
  className?: string;               // Clase CSS adicional
}
```

## Uso Básico

```tsx
import { ListItemActions } from '../ui/ListItemActions';

export const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="list-item">
          {/* ... contenido del elemento ... */}
          
          <ListItemActions
            item={product}
            onEdit={onEdit}
            onDelete={onDelete}
            editLabel="Editar producto"
            deleteLabel="Eliminar producto"
            confirmationMessage={`¿Estás seguro de que quieres eliminar "${product.name}"?`}
          />
        </div>
      ))}
    </div>
  );
};
```

## Ejemplos de Uso

### Lista de Productos
```tsx
<ListItemActions
  item={product}
  onEdit={onEditProduct}
  onDelete={onDeleteProduct}
  editLabel="Editar producto"
  deleteLabel="Eliminar producto"
  confirmationMessage={`¿Estás seguro de que quieres eliminar el producto "${product.descripcion}"?`}
/>
```

### Lista de Contactos
```tsx
<ListItemActions
  item={contact}
  onEdit={onEditContact}
  onDelete={onDeleteContact}
  editLabel="Editar contacto"
  deleteLabel="Eliminar contacto"
  confirmationMessage={`¿Estás seguro de que quieres eliminar a ${contact.firstName} ${contact.lastName}?`}
/>
```

### Sin Confirmación
```tsx
<ListItemActions
  item={item}
  onEdit={handleEdit}
  onDelete={handleDelete}
  showConfirmation={false}
/>
```

### Con Etiquetas Personalizadas
```tsx
<ListItemActions
  item={document}
  onEdit={handleEdit}
  onDelete={handleDelete}
  editLabel="Modificar documento"
  deleteLabel="Eliminar documento"
  confirmationMessage="Esta acción no se puede deshacer. ¿Continuar?"
/>
```

## Características

- **Botones siempre visibles**: A diferencia del comportamiento anterior con hover, ahora los botones se muestran siempre
- **Confirmación inteligente**: Confirmación automática antes de eliminar con mensaje personalizable
- **Detención de propagación**: Evita que los clics en los botones activen eventos del contenedor
- **Tipado genérico**: Funciona con cualquier tipo de elemento que tenga un `id`
- **Diseño consistente**: Estilos uniformes en toda la aplicación
- **Responsive**: Se adapta automáticamente a dispositivos móviles
- **Accesibilidad**: Incluye labels apropiados para lectores de pantalla

## Estructura Visual

```
[✏️ Editar] [🗑️ Eliminar]
```

## Estilos CSS

- **Botón de editar**: Fondo azul claro con icono azul
- **Botón de eliminar**: Fondo rojo claro con icono rojo
- **Border-radius**: 10px para consistencia con el sistema de diseño
- **Hover effects**: Escalado sutil y cambio de color
- **Spacing**: Gap de 0.5rem entre botones

## Ventajas sobre el Diseño Anterior

1. **Siempre visible**: No requiere hover para mostrar las acciones
2. **Mejor UX en móviles**: Los botones siempre están disponibles en dispositivos táctiles
3. **Código centralizado**: Un solo componente para todas las listas
4. **Mantenimiento simplificado**: Cambios en un solo lugar
5. **Consistencia**: Mismo comportamiento y diseño en toda la app
