# FormActions Component

Componente genérico reutilizable para manejar las acciones de formularios (Cancelar/Guardar) en toda la aplicación.

## Propiedades

```typescript
interface FormActionsProps {
  onCancel: () => void;           // Función a ejecutar al cancelar
  isSubmitting?: boolean;         // Estado de envío del formulario
  isReadOnly?: boolean;           // Si el formulario es solo lectura
  submitLabel?: string;           // Etiqueta personalizada para el botón de envío
  cancelLabel?: string;           // Etiqueta personalizada para el botón de cancelar
  submitDisabled?: boolean;       // Deshabilitar el botón de envío
  mode?: 'create' | 'edit' | 'view'; // Modo del formulario
  entityName?: string;            // Nombre de la entidad para generar etiquetas automáticas
  className?: string;             // Clase CSS adicional
}
```

## Uso Básico

```tsx
import { FormActions } from '../ui/FormActions';

export const MyForm = ({ onCancel, isSubmitting, mode }) => {
  return (
    <form>
      {/* ... campos del formulario ... */}
      
      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        mode={mode}
        entityName="Producto"
      />
    </form>
  );
};
```

## Ejemplos de Uso

### Formulario de Creación
```tsx
<FormActions
  onCancel={handleCancel}
  isSubmitting={false}
  mode="create"
  entityName="Contacto"
/>
// Resultado: "Crear Contacto"
```

### Formulario de Edición
```tsx
<FormActions
  onCancel={handleCancel}
  isSubmitting={false}
  mode="edit"
  entityName="Producto"
/>
// Resultado: "Guardar Cambios"
```

### Con Validación Personalizada
```tsx
<FormActions
  onCancel={handleCancel}
  isSubmitting={false}
  mode="create"
  entityName="Compra"
  submitDisabled={!hasValidItems}
/>
```

### Solo Lectura
```tsx
<FormActions
  onCancel={handleCancel}
  isReadOnly={true}
/>
// No renderiza nada
```

## Características

- **Etiquetas inteligentes**: Genera automáticamente las etiquetas según el modo y nombre de entidad
- **Estados de carga**: Maneja automáticamente el estado "Guardando..."
- **Responsive**: Se adapta a dispositivos móviles apilando los botones verticalmente
- **Consistencia**: Mantiene un diseño uniforme en todos los formularios
- **Flexibilidad**: Permite personalización completa de etiquetas y comportamiento
